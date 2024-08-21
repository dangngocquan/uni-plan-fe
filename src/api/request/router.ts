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
  authMe: `${apiConfig.ROOT_API}/api/auth/me`,

  getSchool: `${apiConfig.ROOT_API}/api/school`,
  getMajors: `${apiConfig.ROOT_API}/api/major`,
  getMajorDetails: (majorId: string) =>
    `${apiConfig.ROOT_API}/api/major/detail/${majorId}`,
  getGroupCourses: `${apiConfig.ROOT_API}/api/group-course`,
  getCourses: `${apiConfig.ROOT_API}/api/course`,

  getPlans: `${apiConfig.ROOT_API}/api/plan`,
  getPlanDetail: (id: string) =>
    `${apiConfig.ROOT_API}/api/plan/detail?id=${id}`,
  createPlan: `${apiConfig.ROOT_API}/api/plan`,
  updatePlan: (planId: string) => `${apiConfig.ROOT_API}/api/plan/${planId}`,
  deletePlan: (planId: string) => `${apiConfig.ROOT_API}/api/plan/${planId}`,

  getPlanCourses: `${apiConfig.ROOT_API}/api/plan-course`,
  createPlanCourse: (planId: string) =>
    `${apiConfig.ROOT_API}/api/plan-course/${planId}`,
  updatePlanCourse: (planCourseId: string) =>
    `${apiConfig.ROOT_API}/api/plan-course/${planCourseId}`,
  deletePlanCourse: (planCourseId: string) =>
    `${apiConfig.ROOT_API}/api/plan-course/${planCourseId}`,

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
  adminCreateGroupCourseRelation: `${apiConfig.ROOT_API}/api/admin/group-course/relation`,

  adminCreateCourse: `${apiConfig.ROOT_API}/api/admin/course/create`,
  adminUpdateCourse: (courseId: string) =>
    `${apiConfig.ROOT_API}/api/admin/course/${courseId}`,
  adminDeleteCourse: (courseId: string) =>
    `${apiConfig.ROOT_API}/api/admin/course/${courseId}`,
  adminCreateCourseRelation: (courseId: string) =>
    `${apiConfig.ROOT_API}/api/admin/course/${courseId}/relation`,
  adminUpdateCourseRelation: (courseRelationId: string) =>
    `${apiConfig.ROOT_API}/api/admin/courseRelation/${courseRelationId}`,
  adminDeleteCourseRelation: (courseRelationId: string) =>
    `${apiConfig.ROOT_API}/api/admin/courseRelation/${courseRelationId}`,

  adminCreateGradeConversionTable: `${apiConfig.ROOT_API}/api/admin/grade-conversion-table`,
  adminUpdateGradeConversionTable: (id: string) =>
    `${apiConfig.ROOT_API}/api/admin/grade-conversion-table/${id}`,
  adminDeleteGradeCOnversionTable: (id: string) =>
    `${apiConfig.ROOT_API}/api/admin/grade-conversion-table/${id}`,
};

export default API_ROUTES;
