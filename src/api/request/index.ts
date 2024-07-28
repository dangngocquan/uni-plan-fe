import { adminAuthLogin } from "./admin";
import {
  authForgotPassword,
  authGoogle,
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
  GET_SCHOOL: getSchool,
  GET_MAJORS: getMajors,
  ADMIN_AUTH_LOGIN: adminAuthLogin,
};
