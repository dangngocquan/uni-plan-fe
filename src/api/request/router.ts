import { apiConfig } from "../../config";

const API_ROUTES = {
  health: `${apiConfig.ROOT_API}`,
  authGoogle: `${apiConfig.ROOT_API}/api/auth/google`,
  authSignUp: `${apiConfig.ROOT_API}/api/auth/signup`,
  authSignIn: `${apiConfig.ROOT_API}/api/auth/login`,
  authVerifySignUp: `${apiConfig.ROOT_API}/api/auth/verify-signup`,
  authForgotPassword: `${apiConfig.ROOT_API}/api/auth/forgot-password`,
  authResetPassword: `${apiConfig.ROOT_API}/api/auth/reset-password`,
  getSchool: `${apiConfig.ROOT_API}/api/school`,
  getMajors: `${apiConfig.ROOT_API}/api/major`,
};

export default API_ROUTES;
