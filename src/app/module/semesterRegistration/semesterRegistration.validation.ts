import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


const createSemesterRgisterationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...SemesterRegistrationStatus] as [string,...string[]]) ,
        startDate:z.string().datetime(),
        endDate:z.string().datetime(),
        minCredite:z.number(),
        maxCredite:z.number()
     
    }),
})

const updateSemesterRgisterationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum([...SemesterRegistrationStatus] as [string,...string[]]).optional() ,
        startDate:z.string().datetime().optional(),
        endDate:z.string().datetime().optional(),
        minCredite:z.number().optional(),
        maxCredite:z.number().optional()
     
    }),
})


export const  SemesterRegistrationValidations = {
    createSemesterRgisterationValidationSchema,
    updateSemesterRgisterationValidationSchema,
}