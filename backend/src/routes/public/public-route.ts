import { Router } from "express";
import publicAuthRouter from "./auth/public-auth";

const publicRouter = Router();

publicRouter.use("/auth", publicAuthRouter);

export default publicRouter;
