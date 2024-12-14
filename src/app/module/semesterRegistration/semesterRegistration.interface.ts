import { Types } from "mongoose";

export type TsemesterRegistration = {
    academicSemester: Types.ObjectId,
    status: 'UPCOMING' | 'ONGOING' | 'ENDED',
    startDate:Date,
    endDate:Date,
    minCredite:number,
    maxCredite:number,

};