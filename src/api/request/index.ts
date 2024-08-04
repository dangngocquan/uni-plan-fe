import {
  adminAuthLogin,
  adminCreateMajor,
  adminCreateSchool,
  adminDeleteMajor,
  adminDeleteSchool,
  adminUpdateMajor,
  adminUpdateSchool,
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
import { getMajors } from "./major";
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
  ADMIN_AUTH_LOGIN: adminAuthLogin,
  ADMIN_CREATE_SCHOOL: adminCreateSchool,
  ADMIN_UPDATE_SCHOOL: adminUpdateSchool,
  ADMIN_DELETE_SCHOOL: adminDeleteSchool,
  ADMIN_CREATE_MAJOR: adminCreateMajor,
  ADMIN_UPDATE_MAJOR: adminUpdateMajor,
  ADMIN_DELETE_MAJOR: adminDeleteMajor,
};
