import { Request, Response } from "express";
import Util from "../../util/utils";
import Api from "../../util/api";
import prisma from "../../db/prisma";
import Cryptr from "../../util/cryptr";

async function login(req: Request, res: Response) {
  const { email, password } = req.body || {};
  const nullKeys = Util.nullValues({ email, password });

  if (nullKeys.length > 0) {
    return Api.response({
      res,
      status: 400,
      message: `Missing required fields: ${Util.formatKeys(nullKeys)}`,
      error: `Missing fields: ${nullKeys.join(", ")}`,
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email?.trim(),
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return Api.response({
        res,
        status: 400,
        message: "User not found, please sign up",
      });
    }

    const isPasswordValid = await Cryptr.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return Api.response({
        res,
        status: 400,
        message: "Invalid credentials",
      });
    }

    const accessToken = Cryptr.generateAccessToken(user.id);
    const refreshToken = Cryptr.generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !Util.isDevEnv(),
      sameSite: "lax",
    });

    return Api.response({
      res,
      status: 200,
      message: "Logged in successfully",
      payload: {
        accessToken,
      },
    });
  } catch (error) {
    console.log("Error during login:", error);
    return Api.response({
      res,
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
}

export default login;
