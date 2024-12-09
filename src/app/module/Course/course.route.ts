import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';


const router = express.Router();

router.post(
  '/create-course',
  validateRequest(
   CourseValidation.createSousresValidationSchema
  ),
  CourseControllers.createCourse,
);
router.patch(
  '/:courseId',
  validateRequest(
   CourseValidation.updateCourseValiationSchema
  ),
  CourseControllers.updateCourse,
);
router.put('/:courseId/assign-faculties',validateRequest(CourseValidation.assignFacultiwithcouresValidationsSchema),CourseControllers.AssignFaculties)
router.delete('/:courseId/remove-faculties',validateRequest(CourseValidation.assignFacultiwithcouresValidationsSchema),CourseControllers.removeFaculties)
router.get('/:courseId',CourseControllers.getSingleCourse);
router.get('/',CourseControllers.getAllCourses);
router.delete('/:courseId',CourseControllers.deleteSingleCourse);

export const CoruseRoutes = router;