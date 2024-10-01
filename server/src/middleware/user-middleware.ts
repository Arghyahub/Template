import { jwt } from "jsonwebtoken";
import { Request, Router } from "express";
import { userModel } from "../schema";
const SECRET = process.env.SECRET;

interface UserType {
  name: string;
  email: string;
  _id: string;
}
export interface AuthRequest extends Request {
  user: UserType;
}

// @ts-ignore
const router = async (req: AuthRequest, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    const user = (await userModel.findById(payload.id, {
      name: true,
      email: true,
      _id: true,
    })) as UserType;

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default router;
