import { apiConfig } from "../../config";

const API_ROUTES = {
  health: `${apiConfig.ROOT_API}`,
  authGoogle: `${apiConfig.ROOT_API}/api/auth/google`,
  authSignUp: `${apiConfig.ROOT_API}/api/auth/signup`,
  authSignIn: `${apiConfig.ROOT_API}/api/auth/login`,
  authVerifySignUp: `${apiConfig.ROOT_API}/api/auth/verify-signup`,
  getSchool: `${apiConfig.ROOT_API}/api/school`,
};

export default API_ROUTES;
