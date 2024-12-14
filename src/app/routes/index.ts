import { Router } from 'express';
import { UserRoutes } from '../module/user/user.route';
import { StudentRoutes } from '../module/student/student.route';
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../module/academicfaculty/academicfaculty.route';
import { AcademicDepartmentRoutes } from '../module/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../module/Faculty/faculty.route';
import { AdminRoutes } from '../module/Admin/admin.route';
import { CoruseRoutes } from '../module/Course/course.route';
import { SemesterRegistrationRoutes } from '../module/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../module/OfferedCourse/OfferedCourse.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CoruseRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offeredCourseRoutes',
    route: offeredCourseRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;