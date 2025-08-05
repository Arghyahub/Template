import { Router } from "express";
import adminController from "../../controller/admin/admin.controller";

const adminRouter = Router();

adminRouter.get("/role", adminController.getAllRoles);

export default adminRouter;
