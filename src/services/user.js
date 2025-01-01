import { raw } from "express";
import db from "../models";

export const getMyProfile = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      // Muốn lấy data của khoá ngoại thì ko để raw true
      const response = await db.User.findByPk(id, {
        raw: true,
        nest: true,
        attributes: {
          exclude: ["password", "role_code"],
        },
        // Lấy data của bảng có khoá ngoại
        include: [
          {
            model: db.Role,
            // Lưu ý đúng alias của khoá ngoại
            as: "roleData",
            attributes: ["id", "code", "value"],
          },
        ],
      });
      resolve(response);
    } catch (error) {
      reject({
        err: -1,
        mess: "Get current user failed",
      });
    }
  });

export const getAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        raw: true,
        nest: true,
        attributes: {
          exclude: ["password", "role_code"],
        },
        include: [
          {
            model: db.Role,
            as: "roleData",
            attributes: ["id", "code", "value"],
          },
        ],
      });
      resolve(response);
    } catch (error) {
      reject({
        err: -1,
        mess: "Get all user failed",
      });
    }
  });
