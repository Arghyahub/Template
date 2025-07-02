import { Router } from "express";
import signUpController from "../../../controller/auth/signup.controller";

const publicAuthRouter = Router();

publicAuthRouter.post("/signup", signUpController);

export default publicAuthRouter;
