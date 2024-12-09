
import { z } from "zod";

const preRequisteCoursesValidtionSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
})

const createSousresValidationSchema = z.object({
    body: z.object({
      title:z.string(),
      prefix:z.string(),
      code: z.number(),
      credits: z.number(),
      isDeleted: z.boolean().optional(),
      preRequisteCourses: z.array(preRequisteCoursesValidtionSchema).optional(),
    })
})

const updateCourseValiationSchema = z.object({
    body: z.object({
      title:z.string().optional(),
      prefix:z.string().optional(),
      code: z.number().optional(),
      credits: z.number().optional(),
      isDeleted: z.boolean().optional(),
      preRequisteCourses: z.array(preRequisteCoursesValidtionSchema).optional(),
    })
})


const assignFacultiwithcouresValidationsSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  })
})



export  const  CourseValidation = {
    createSousresValidationSchema,
    updateCourseValiationSchema,
    assignFacultiwithcouresValidationsSchema
}

