import { apiConfig } from "../../config";

const API_ROUTES = {
  health: `${apiConfig.ROOT_API}`,
  authGoogle: `${apiConfig.ROOT_API}/api/auth/google`,
  authSignUp: `${apiConfig.ROOT_API}/api/auth/signup`,
  authSignIn: `${apiConfig.ROOT_API}/api/auth/login`,
  authVerifySignUp: `${apiConfig.ROOT_API}/api/auth/verify-signup`,
  authForgotPassword: `${apiConfig.ROOT_API}/api/auth/forgot-password`,
  authResetPassword: `${apiConfig.ROOT_API}/api/auth/reset-password`,
  authRefreshToken: `${apiConfig.ROOT_API}/api/auth/refresh-token`,
  getSchool: `${apiConfig.ROOT_API}/api/school`,
  getMajors: `${apiConfig.ROOT_API}/api/major`,
  adminAuthLogin: `${apiConfig.ROOT_API}/api/admin/auth/login`,
  adminCreateSchool: `${apiConfig.ROOT_API}/api/admin/school`,
  adminUpdateSchool: (schoolId: string) =>
    `${apiConfig.ROOT_API}/api/admin/school/${schoolId}`,
  adminDeleteSchool: (schoolId: string) =>
    `${apiConfig.ROOT_API}/api/admin/school/${schoolId}`,

  adminCreateMajor: `${apiConfig.ROOT_API}/api/admin/major`,
  adminUpdateMajor: (majorId: string) =>
    `${apiConfig.ROOT_API}/api/admin/major/${majorId}`,
  adminDeleteMajor: (majorId: string) =>
    `${apiConfig.ROOT_API}/api/admin/major/${majorId}`,

  adminCreateGroupCourse: `${apiConfig.ROOT_API}/api/admin/group-course/create`,
  adminUpdateGroupCourse: (groupId: string) =>
    `${apiConfig.ROOT_API}/api/admin/group-course/${groupId}`,
  adminDeleteGroupCourse: (groupId: string) =>
    `${apiConfig.ROOT_API}/api/admin/group-course/${groupId}`,
  adminCreateGroupCourseRelation: (groupId: string) =>
    `${apiConfig.ROOT_API}/api/admin/group-course/${groupId}/relation`,

  adminCreateCourse: `${apiConfig.ROOT_API}/api/admin/course/create`,
  adminUpdateCourse: (courseId: string) =>
    `${apiConfig.ROOT_API}/api/admin/course/${courseId}`,
  adminDeleteCourse: (courseId: string) =>
    `${apiConfig.ROOT_API}/api/admin/course/${courseId}`,
  adminCreateCourseRelation: (courseId: string) =>
    `${apiConfig.ROOT_API}/api/admin/course/${courseId}/relation`,
};

export default API_ROUTES;
