import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' All Course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result =
    await CourseServices.getSingleSourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single course is retrieved succesfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateSingleSourseIntoDB(
    courseId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is upate successfully is updated succesfully',
    data: result,
  });
});


const deleteSingleCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const result =
      await CourseServices.DeleteSingleSourseIntoDB(courseId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Single course is deleted succesfully',
      data: result,
    });
  });
  
const AssignFaculties = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body;
    const result =
      await CourseServices.assignFacultiesIntoDB(courseId,faculties);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Single course is deleted succesfully',
      data: result,
    });
  });
const removeFaculties = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body;
    const result =
      await CourseServices.removeFacultiesIntoDB(courseId,faculties);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Single course is deleted succesfully',
      data: result,
    });
  });
  
export const CourseControllers = {
  deleteSingleCourse,
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  AssignFaculties,
  removeFaculties,
};