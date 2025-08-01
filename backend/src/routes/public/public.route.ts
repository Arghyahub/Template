import { Router } from "express";
import AuthController from "../../controller/auth/auth.controller";

const publicRouter = Router();

//  Public Auth Routes
publicRouter.use("/auth/signup", AuthController.signUp);
publicRouter.use("/auth/login", AuthController.login);

export default publicRouter;
