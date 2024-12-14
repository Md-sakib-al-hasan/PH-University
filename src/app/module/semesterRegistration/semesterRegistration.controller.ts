import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req:Request,res:Response) => {
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:'Semester Registraion is updated successfully',
        data:result,
    })

});
const getAllteSemesterRegistration = catchAsync(async (req:Request,res:Response) => {

    const result = await SemesterRegistrationService.getAllSemesterRegistrationIntoDB(req.query)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:'Semester Registraion is retrieved successfully',
        data:result,
    })

});
const getSingleSemesterRegistration = catchAsync(async (req:Request,res:Response) => {


    const {id} = req.params;
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationIntoDB(id)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:'Semester Registraion is retrivecd successfully',
        data:result,
    })

});
const updateSemesterRegistration = catchAsync(async (req:Request,res:Response) => {

    const {id} = req.params;
    const result = await  SemesterRegistrationService.updatedSemesterRegistrationIntoDB(id,req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message:'Semester Registraion is updated successfully',
        data:result,
    })

});

export const SemesterRegisterationcontroller = {
    updateSemesterRegistration,
    getAllteSemesterRegistration,
    getSingleSemesterRegistration,
    createSemesterRegistration,
}

