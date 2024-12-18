import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query:Record<string,unknown>) => {
//   const queryObje = {...query}
//   const studentSearchableFields = ['email','name.firstName','presentAddress'];
//   let searchTerm = '';
//   if(query?.searchTerm){
//      searchTerm = query?.searchTerm as string;
//   }

//  const searchQuery = Student.find({
//   $or:studentSearchableFields.map((file) => ({
//      [file]:{$regex:searchTerm, $options:'i'},
//   }) )
// });


// const exculdeFields = ['searchTerm','sort','limit','page','fields']

// exculdeFields.forEach( el => delete queryObje[el]);

//   const filterQuery =  searchQuery
//      .find(queryObje)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//     let sort: Record<string, number> | string = '-createdAt';

//     if (query.sort) {
//       // Parse sort query if provided
//       sort = query.sort as string;
//     }
  
//     // Apply sorting correctly
//     const sortQuery =  filterQuery.sort(sort);
//     let page = 1;
//     let limit = 1;
//     let skip = 0;
//     if(query?.limit) {
//         limit = Number(query.limit) ;
//     }
//     if(query?.page){
//        page =Number( query.page);
//        skip = (page-1)*limit 
//     }
    
//     const paginateQuery = sortQuery.skip(skip);

//     let fields = '-__v';

//     if(query?.fields){
//       fields = (query.fields as string).split(',').join(' ');
//       console.log(fields)
//       console.log("---------qury--------")
//       console.log(query)
//       console.log("-------------queryobj---------")
//       console.log(queryObje)
//     }

//     const limitQuery =  paginateQuery.limit(limit);


//     const fieldQuery = await limitQuery.select(fields);

 const StudentQuery = new QueryBuilder(Student.find(),query).search(studentSearchableFields).filter().sort().paginate().fields();
 const reuslt  = await StudentQuery.modelQuery;
   return reuslt;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById( id )
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

    

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate( id , modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findByIdAndUpdate(
       id ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};