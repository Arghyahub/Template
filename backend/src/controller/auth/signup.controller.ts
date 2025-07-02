import { Request, Response } from "express";
import Util from "../../util/utils";

async function signUpController(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, user_type = "owner" } = req.body;
    const nullValues = Util.nullValues({ name, email, password });
    if (nullValues.length > 0) {
      res.status(400).json({
        success: false,
        message: `Missing required field ${nullValues.join(", ")}`,
      });
      return;
    }
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default signUpController;
