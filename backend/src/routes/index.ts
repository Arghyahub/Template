import { Router } from "express";
import publicRouter from "./public/public-route";

const apiRouter = Router();

apiRouter.use("/public", publicRouter);

export default apiRouter;
