import login from "./login.auth";
import refresh from "./refresh.auth";
import signUp from "./signup.auth";

const AuthController = {
  signUp: signUp,
  login: login,
  refresh: refresh,
};
export default AuthController;
