import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegisterationcontroller } from "./semesterRegistration.controller";

const router = express.Router();

router.get('/:id',SemesterRegisterationcontroller.getAllteSemesterRegistration);
router.post('/create-semester-registration', validateRequest(SemesterRegistrationValidations.createSemesterRgisterationValidationSchema),SemesterRegisterationcontroller.createSemesterRegistration);
router.get('/',SemesterRegisterationcontroller.getAllteSemesterRegistration);

router.patch('/:id',validateRequest(SemesterRegistrationValidations.updateSemesterRgisterationValidationSchema),SemesterRegisterationcontroller.updateSemesterRegistration);

export const SemesterRegistrationRoutes = router;