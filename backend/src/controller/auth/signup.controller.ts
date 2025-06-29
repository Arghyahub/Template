import { Request, Response } from "express";
import Util from "../../util/utils";

async function signUpController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const nullValues = Util.nullValues({ name, email, password });
    if (nullValues.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field ${nullValues.join()}`,
      });
    }
  } catch (error) {}
}

export default signUpController;
