import { Request, Response } from "express";
import Util from "../../util/utils";
import Api from "../../util/api";
import prisma from "../../db/prisma";
import Cryptr from "../../util/cryptr";

async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body || {};
  const nullKeys = Util.nullValues({ name, email, password });

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

    if (user) {
      return Api.response({
        res,
        status: 400,
        message: "User already exists, please try logging in or reset password",
      });
    }

    const hashedPasswd = await Cryptr.hashPassword(password);

    const ownerAccessRole = await prisma.accessRole.findFirst({
      where: {
        for_type: "owner",
        is_master: true,
      },
      orderBy: {
        created_at: "asc",
      },
      select: {
        id: true,
      },
    });

    if (!ownerAccessRole) {
      return Api.response({
        res,
        status: 400,
        message: "Access Role not initialized, please select a different role",
        error: "This access role is not initialized in the DB",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPasswd,
        user_type: "employee",
        access_role_id: ownerAccessRole.id,
      },
    });

    const accessToken = Cryptr.generateAccessToken(newUser.id);
    const refreshToken = Cryptr.generateRefreshToken(newUser.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !Util.isDevEnv(),
      sameSite: "lax",
      path: "/api/auth",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return Api.response({
      res,
      status: 200,
      message: "Signed up successfully",
      payload: {
        accessToken,
      },
    });
  } catch (error) {
    return Api.response({
      res,
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
}

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
    return Api.response({
      res,
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
}

async function refresh(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return Api.response({
      res,
      status: 401,
      message: "Unauthorized, please log in again",
    });
  }
  try {
    const userId = Cryptr.verifyToken(refreshToken, "refresh")?.userId;
    if (!userId) {
      return Api.response({
        res,
        status: 401,
        message: "Invalid refresh token, please log in again",
      });
    }

    const accessToken = Cryptr.generateAccessToken(userId);
    // const newRefreshToken = Cryptr.generateRefreshToken(userId);

    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: !Util.isDevEnv(),
    //   sameSite: "lax",
    //   path: "/api/auth",
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // });

    return Api.response({
      res,
      status: 200,
      message: "Authenticated successfully",
      payload: {
        accessToken,
      },
    });
  } catch (error) {
    return Api.response({
      res,
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
}

const AuthController = {
  signUp,
  login,
  refresh,
};
export default AuthController;
