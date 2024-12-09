import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { Tcourse, Tcoursefaculty } from "./course.interfac";
import Course, { CourseFacuities } from "./course.model"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload:Tcourse) => {
     const result = (await Course.create(payload)).populate('preRequisteCourses.course');
     console.log(payload)
     return result;
}

const getAllCoursesFromDB = async (query:Record<string,unknown>) => {
    const courseQuery = new QueryBuilder( Course.find().populate('preRequisteCourses.course'),query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = courseQuery.modelQuery;
    return result;
}

const getSingleSourseFromDB = async (id:string) => {
    const result = await Course.findById(id);
    return result;
}
const DeleteSingleSourseIntoDB = async (id:string) => {
    const result = await Course.findByIdAndUpdate(id,
        {isDeleted:true},
        {new:true}
    )
    return result;
}
const updateSingleSourseIntoDB = async (id:string,payload:Partial<Tcourse>) => {
   const {preRequisteCourses , ...courseRemaingData} = payload;


   const session = await mongoose.startSession();

   try{
      session.startTransaction()
    const updateprequetories = await Course.findByIdAndUpdate(id,courseRemaingData,
        {
            new:true,
             session,
            runValidators:true,
        },
       )
      if(!updateprequetories){
         throw new AppError(httpStatus.BAD_REQUEST,"faild to update course")
      }
     
       if(preRequisteCourses && preRequisteCourses.length>0){
         const deltedPreRequisites =  preRequisteCourses.filter( el => el.course && el.isDeleted=== true).map(el => el.course)
         const deletedPreRequistes =  await  Course.findByIdAndUpdate(id,
            {$pull:{preRequisteCourses:{course:{$in: deltedPreRequisites}}}},
            {session}
         )
         if(!deletedPreRequistes){
            throw new AppError(httpStatus.BAD_REQUEST,"faild to update course")
         }
         const newPreRequisites = preRequisteCourses.filter(el => el.course && el.isDeleted === false)
         const addpreRequeites =  await Course.findByIdAndUpdate(id,
            {$addToSet:{preRequisteCourses:{$each:newPreRequisites}}},
            {
                session,
            }
         )
         if(!addpreRequeites){
            throw new AppError(httpStatus.BAD_REQUEST,"faild to update course")
         }
         
       }
       const result = await Course.findById(id).populate('preRequisteCourses.course')
      session.commitTransaction()
      session.endSession()
      return result;

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   }catch(err:any) {
      session.abortTransaction()
      session.endSession()
      throw new  AppError(500, !err?.message?"server problems":err?.message )
   }


   
}

const assignFacultiesIntoDB = async(id:string,payload:Partial<Tcoursefaculty>) => {
         const result = await CourseFacuities.findByIdAndUpdate(id,{
            course:id,
            $addToSet:{faculties:{$each:payload}}
         },{
            upsert:true,
            new:true,
         })
         return result;
}

const removeFacultiesIntoDB = async(id:string,payload:Partial<Tcoursefaculty>) => {
         const result = await CourseFacuities.findByIdAndUpdate(id,{
            $pull:{faculties:{$in:payload}}
         },{
            new:true,
         })
         return result;
}



export const CourseServices = {
     createCourseIntoDB,
     getAllCoursesFromDB,
     getSingleSourseFromDB,
     DeleteSingleSourseIntoDB,
     updateSingleSourseIntoDB,
     assignFacultiesIntoDB,
     removeFacultiesIntoDB,


}