import {
  adminAuthLogin,
  adminCreateCourse,
  adminCreateCourseRelation,
  adminCreateGroupCourse,
  adminCreateGroupCourseRelation,
  adminCreateMajor,
  adminCreateSchool,
  adminDeleteCourse,
  adminDeleteCourseRelation,
  adminDeleteGroupCourse,
  adminDeleteMajor,
  adminDeleteSchool,
  adminUpdateCourse,
  adminUpdateCourseRelation,
  adminUpdateGroupCourse,
  adminUpdateMajor,
  adminUpdateSchool,
  requestWithRefreshTokens,
} from "./admin/admin";
import {
  authForgotPassword,
  authGoogle,
  authRefreshTokens,
  authResetPassword,
  authSignIn,
  authSignUp,
  authVerifySignUp,
} from "./auth";
import { getMajorDetails, getMajors } from "./major";
import { getSchool } from "./school";

export const REQUEST = {
  AUTH_SIGN_IN: authSignIn,
  AUTH_SIGN_UP: authSignUp,
  AUTH_GOOGLE: authGoogle,
  AUTH_VERIFY_SIGNUP: authVerifySignUp,
  AUTH_FORGOT_PASSWORD: authForgotPassword,
  AUTH_RESET_PASSWORD: authResetPassword,
  AUTH_REFRESH_TOKEN: authRefreshTokens,
  GET_SCHOOL: getSchool,
  GET_MAJORS: getMajors,
  GET_MAJOR_DETAILS: getMajorDetails,
  ADMIN_AUTH_LOGIN: adminAuthLogin,
  ADMIN_CREATE_SCHOOL: (data: any) =>
    requestWithRefreshTokens(() => adminCreateSchool(data)),
  ADMIN_UPDATE_SCHOOL: (data: any) =>
    requestWithRefreshTokens(() => adminUpdateSchool(data)),
  ADMIN_DELETE_SCHOOL: (data: any) =>
    requestWithRefreshTokens(() => adminDeleteSchool(data)),
  ADMIN_CREATE_MAJOR: (data: any) =>
    requestWithRefreshTokens(() => adminCreateMajor(data)),
  ADMIN_UPDATE_MAJOR: (data: any) =>
    requestWithRefreshTokens(() => adminUpdateMajor(data)),
  ADMIN_DELETE_MAJOR: (data: any) =>
    requestWithRefreshTokens(() => adminDeleteMajor(data)),
  ADMIN_CREATE_GROUP_COURSE: (data: any) =>
    requestWithRefreshTokens(() => adminCreateGroupCourse(data)),
  ADMIN_CREATE_GROUP_COURSE_RELATION: (data: any) =>
    requestWithRefreshTokens(() => adminCreateGroupCourseRelation(data)),
  ADMIN_UPDATE_GROUP_COURSE: (data: any) =>
    requestWithRefreshTokens(() => adminUpdateGroupCourse(data)),
  ADMIN_DELETE_GROUP_COURSE: (data: any) =>
    requestWithRefreshTokens(() => adminDeleteGroupCourse(data)),
  ADMIN_CREATE_COURSE: (data: any) =>
    requestWithRefreshTokens(() => adminCreateCourse(data)),
  ADMIN_CREATE_COURSE_RELATION: (data: any) =>
    requestWithRefreshTokens(() => adminCreateCourseRelation(data)),
  ADMIN_UPDATE_COURSE: (data: any) =>
    requestWithRefreshTokens(() => adminUpdateCourse(data)),
  ADMIN_DELETE_COURSE: (data: any) =>
    requestWithRefreshTokens(() => adminDeleteCourse(data)),
  ADMIN_UPDATE_COURSE_RELATION: (data: any) =>
    requestWithRefreshTokens(() => adminUpdateCourseRelation(data)),
  ADMIN_DELETE_COURSE_RELATION: (data: any) =>
    requestWithRefreshTokens(() => adminDeleteCourseRelation(data)),
};
