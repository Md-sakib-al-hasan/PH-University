import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TsemesterRegistration } from "./semesterRegistration.interface";
import httpStatus from "http-status";
import { SemesterRegisteration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (payload: TsemesterRegistration) => {

        const academicSemester = payload?.academicSemester;
         
         const isThereAnyUpcomingOrongoingSemester = await SemesterRegisteration.findOne({
            $or:[
                {status:RegistrationStatus.UpCOMING},
                {status:RegistrationStatus.ONGOING},
            ]
         })
         if(isThereAnyUpcomingOrongoingSemester){
            throw new AppError(httpStatus.NOT_FOUND,    `There is already a ${isThereAnyUpcomingOrongoingSemester.status} registered semester`)
         }
         const isAcadmeicSemsterExists =  await AcademicSemester.findById(academicSemester)
     
         if(!isAcadmeicSemsterExists){
            throw new AppError(httpStatus.NOT_FOUND,'This is Academic semseter not found');
         }
         const isSemesterRegistrationExit = await SemesterRegisteration.findOne({academicSemester})

         if(isSemesterRegistrationExit) {
             throw new AppError(httpStatus.NOT_FOUND,'This semester is  allready register');
         }


         const result =  await SemesterRegisteration.create(payload)
         return result;
    

};
const getAllSemesterRegistrationIntoDB = async (payload:Record<string,unknown>) => {
    
    const semesterRegistraitonQuery = new QueryBuilder( SemesterRegisteration.find().populate('academicSemester'),payload)
    .filter().sort().paginate().fields();

    const result  =  await semesterRegistraitonQuery.modelQuery;
    
    return result;
    
};

const getSingleSemesterRegistrationIntoDB = async (id:string) => {

    const result = await SemesterRegisteration.findById(id);
    return result;

};
const updatedSemesterRegistrationIntoDB = async (id:string, payload:Partial<TsemesterRegistration>) => {
    const isSemesterRegistrationExits = await SemesterRegisteration.findById(id);
    const requestedStatus = payload?.status;
    if(!isSemesterRegistrationExits){
         throw new AppError(httpStatus.NOT_FOUND,'this Semester is not found')
    }
    const currentSemster = isSemesterRegistrationExits.status;
        if(currentSemster === RegistrationStatus.ENDED){
            throw new AppError(httpStatus.BAD_REQUEST,`This semester is already ${currentSemster}`)
        }
    if(currentSemster === RegistrationStatus.UpCOMING && requestedStatus === RegistrationStatus.ENDED){
        throw new AppError(httpStatus.NOT_FOUND,'You can not direclty change status from upcing to Ended')
    }
    if(currentSemster === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UpCOMING){
        throw new AppError(httpStatus.NOT_FOUND,'You can not direclty change status from upcing to Ended')
    }

   
    const result = await SemesterRegisteration.findByIdAndUpdate(id,payload,{new:true,runValidators:true})
    return result;
};

export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationIntoDB,
    getSingleSemesterRegistrationIntoDB,
    updatedSemesterRegistrationIntoDB,
}