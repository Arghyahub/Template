import { Request, Response } from "express";
import Util from "../../../util/utils";
import Api from "../../../util/api";
import prisma from "../../../db/prisma";

async function rolesAddUpdate(req: Request, res: Response) {
  try {
    const { id, name, is_master, for_type, role } = req.body || {};
    const userId = req?.user?.id;

    const nullKeys = Util.nullValues({ name, is_master, for_type });

    if (nullKeys.length > 0) {
      return Api.response({
        res,
        status: 400,
        message: `Missing required fields: ${Util.formatKeys(nullKeys)}`,
        error: `Missing fields: ${nullKeys.join(", ")}`,
      });
    }

    let message = "Role added successfully";

    if (id) {
      await prisma.accessRole.update({
        where: { id: id },
        data: {
          name: name.trim(),
          is_master: is_master,
          for_type: for_type,
          role: role,
          updated_by_id: userId,
        },
      });
      message = "Role updated successfully";
    } else {
      await prisma.accessRole.create({
        data: {
          name: name.trim(),
          is_master: is_master,
          for_type: for_type,
          role: role,
          created_at: new Date(),
          updated_by_id: userId,
        },
      });
    }

    return Api.response({
      res,
      status: 200,
      message: message,
    });
  } catch (error) {
    return Api.response({
      res,
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
}

export default rolesAddUpdate;
