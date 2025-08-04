import { Router } from "express";
import publicRouter from "./public/public.route";
import authRouter from "./auth/auth.route";
import authMiddleware from "../middleware/auth-middleware";

const apiRouter = Router();

apiRouter.use("/public", publicRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
