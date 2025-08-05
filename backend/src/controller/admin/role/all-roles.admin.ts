import { Request, Response } from "express";
import prisma from "../../../db/prisma";
import Api from "../../../util/api";

async function getAllRoles(req: Request, res: Response) {
  try {
    const id = req.query.id as string;
    let take = req.query.take ? parseInt(req.query.take as string) : 50;
    let skip = req.query.skip ? parseInt(req.query.skip as string) : 0;

    if (id) {
      take = 1;
      skip = 0;
    }

    const roles = await prisma.accessRole.findMany({
      ...(id ? { where: { id: parseInt(id) } } : {}),
      orderBy: {
        updated_at: "desc",
      },
      take,
      skip,
    });

    return Api.response({
      res,
      status: 200,
      message: "Roles fetched successfully",
      payload: roles,
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return Api.response({
      res,
      status: 500,
      message: "Internal Server Error",
      error: error.message || "An unexpected error occurred",
    });
  }
}

export default getAllRoles;
