import { Router } from "express";
import AuthController from "../../controller/auth/auth.controller";
import Api from "../../util/api";
import Cryptr from "../../util/cryptr";
import Util from "../../util/utils";
import prisma from "../../db/prisma";

// login/signup routes defined in public
const authRouter = Router();

authRouter.use("/signup", AuthController.signUp);
authRouter.use("/login", AuthController.login);

authRouter.get("/refresh{/:fullData}", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const isFullData = req.params.fullData === "full-data";
    if (!refreshToken) {
      return Api.response({
        res,
        status: 401,
        message: "Unauthorized",
        error: "No refresh token provided",
      });
    }

    const verifyToken = Cryptr.verifyToken(refreshToken, "refresh");

    if (!verifyToken || !Util.isNotNull(verifyToken.userId)) {
      return Api.response({
        res,
        status: 401,
        message: "Unauthorized",
        error: "Token verification failed",
      });
    }

    const userId = verifyToken.userId;
    const accessToken = Cryptr.generateAccessToken(userId);
    if (isFullData) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
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

    return Api.response({
      res,
      status: 200,
      message: "Token refreshed successfully",
      payload: {
        accessToken,
      },
    });
  } catch (error) {
    return Api.response({
      res,
      status: 500,
      message: "Failed to refresh token",
      error: error.message || "Internal Server Error",
    });
  }
});

export default authRouter;
