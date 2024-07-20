import { authGoogle, authSignIn, authSignUp, authVerifySignUp } from "./auth";
import { getSchool } from "./school";

export const REQUEST = {
    AUTH_SIGN_IN: authSignIn,
    AUTH_SIGN_UP: authSignUp,
    AUTH_GOOGLE: authGoogle,
    AUTH_VERIFY_SIGNUP: authVerifySignUp,
    GET_SCHOOL: getSchool,
  };