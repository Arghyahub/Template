import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import Env from "../config/env";

class Cryptr {
  static async hashPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hashSync(password, salt);
    } catch (error) {
      throw new Error(
        JSON.stringify({ message: "Error hashing password", error })
      );
    }
  }

  static comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  static generateAccessToken(
    userId: number,
    expiresIn: SignOptions["expiresIn"] = "30m"
  ) {
    return jwt.sign({ userId }, Env.ACCESS_SECRET, { expiresIn });
  }

  static generateRefreshToken(
    userId: number,
    expiresIn: SignOptions["expiresIn"] = "30d"
  ) {
    return jwt.sign({ userId }, Env.REFRESH_SECRET, { expiresIn });
  }
}

export default Cryptr;
