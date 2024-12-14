import  { model, Schema } from "mongoose";
import { TsemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


const semesterRgigisterationSchema = new Schema<TsemesterRegistration>({

    academicSemester:{
        type: Schema.Types.ObjectId,
        ref:'AcademicSemester',
        unique:true,
        required:true,
    
    },

    status:{type:String,
         enum:SemesterRegistrationStatus,
         default : 'UPCOMING'
        },

    startDate:{
        type:Date,
        required:true,

    },
    endDate:{
        type:Date,
        required:true,
    },
    minCredite:{
        type:Number,
        default:3,
    },
    maxCredite:{
        type:Number,
        default:15,
    }

},{
    timestamps:true,
})


export const SemesterRegisteration =  model<TsemesterRegistration>('semesterRegistration',semesterRgigisterationSchema)

