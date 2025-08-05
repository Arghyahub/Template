import { Request, Response } from "express";
import Util from "../../util/utils";
import Api from "../../util/api";
import prisma from "../../db/prisma";
import Cryptr from "../../util/cryptr";

async function refresh(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  const isFullData = req.params.fullData === "full-data";
  if (!refreshToken) {
    return Api.response({
      res,
      status: 401,
      message: "Unauthorized, please log in again",
      error: "No refresh token provided",
    });
  }

  let userId: number | undefined;
  try {
    userId = Cryptr.verifyToken(refreshToken, "refresh")?.userId;
    if (!Util.isNotNull(userId)) {
      throw new Error("Invalid token");
    }
  } catch (error) {
    return Api.response({
      res,
      status: 401,
      message: "Invalid refresh token, please log in again",
    });
  }

  try {
    const accessToken = Cryptr.generateAccessToken(userId);

    if (isFullData) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          access_role: true,
        },
      });
      user.password = undefined;
      if (!user) {
        return Api.response({
          res,
          status: 404,
          message: "User not found",
          error: "No user found with the provided ID",
        });
      }
      return Api.response({
        res,
        status: 200,
        message: "Token refreshed successfully",
        payload: {
          accessToken,
          user,
        },
      });
    }

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

export default refresh;
