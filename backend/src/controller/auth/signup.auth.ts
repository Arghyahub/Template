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

export default signUp;
