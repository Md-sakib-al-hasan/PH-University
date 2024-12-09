import { Types } from "mongoose";

export type TPreRequisteCourses = {
    course:Types.ObjectId;
    isDeleted:boolean;
}


export type Tcourse = {
    title:string;
    prefix:string;
    code:number;
    credits:number;
    preRequisteCourses:[TPreRequisteCourses],
    isDeleted?:boolean,

}

export type Tcoursefaculty = {
    course:Types.ObjectId,
    faculties:[Types.ObjectId],
}