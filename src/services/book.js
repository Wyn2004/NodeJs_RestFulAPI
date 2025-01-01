import uuid4 from "uuid4";
import db from "../models";
import { Op, where } from "sequelize";

export const getBooks = ({ page, limit, order, name, available, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = {
        raw: true,
        nest: true,
        attribute: {
          exclude: ["category_code"],
        },
        include: [
          {
            model: db.Category,
            as: "categoryData",
            attributes: ["id", "code", "value"],
          },
        ],
      };
      const offset = !page | (page <= 1) ? 0 : page - 1;
      const limitQuery = +limit || +process.env.LIMIT;
      queries.limit = limitQuery;
      queries.offset = offset;
      if (order) queries.order = [order];
      if (name) query.title = { [Op.substring]: name };
      if (available) query.available = { [Op.between]: available };
      const response = await db.Book.findAndCountAll({
        where: query,
        ...queries,
      });
      resolve({
        err: response ? 0 : -1,
        mess: response ? "Get books success" : "Not Found",
        bookData: response,
      });
    } catch (error) {
      reject({
        err: -1,
        mess: "Get books failed",
      });
    }
  });

export const createBook = (data) =>
  new Promise(async (resolve, reject) => {
    const queries = { raw: true, nest: true };
    const id = uuid4();
    data.id = id;
    console.log(data);
    try {
      const response = await db.Book.findOrCreate({
        where: {
          title: data.title,
        },
        ...queries,
        defaults: data,
      });
      resolve({
        err: response[1] ? 0 : -1,
        mess: response[1]
          ? "Create book success"
          : "Create book failed, maybe title existed!!!",
      });
    } catch (error) {
      reject({
        err: -1,
        mess: "Create book failed",
      });
    }
  });
