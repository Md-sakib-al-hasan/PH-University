import { model, Schema} from "mongoose";
import { Tcourse, Tcoursefaculty, TPreRequisteCourses } from "./course.interfac";



const preRequisteCoursesSchema = new Schema<TPreRequisteCourses>({
    course:{
        type: Schema.Types.ObjectId,
        ref:'course',
    },
    isDeleted:{
        type:Boolean,
        default: false,
    }
})

const courseSchema = new Schema<Tcourse>({
    title:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    prefix:{
        type:String,
        trim:true,
        required:true,
    },
    code:{
        type:Number,
        trim:true,
        required:true,
    },
    credits:{
        type:Number,
        trim:true,
        required:true,
    },
    preRequisteCourses: [preRequisteCoursesSchema],
    isDeleted:{
        type:Boolean,
        default:false,
    }
})

const Course =   model<Tcourse>('course',courseSchema);

export default Course;

const courseFacultiesSchema = new Schema<Tcoursefaculty>({
    course: {type: Schema.Types.ObjectId,
        ref:'Course',
        unique:true,
    },
    faculties:[{type:Schema.Types.ObjectId ,ref:'Faculty'}]
})

export const CourseFacuities = model<Tcoursefaculty>('courseFacuities',courseFacultiesSchema)




