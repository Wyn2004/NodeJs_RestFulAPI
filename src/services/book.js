import uuid4 from "uuid4";
import db from "../models";
import { Op } from "sequelize";
import { getFileName, removeImage } from "../helpers/removeImage";

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
    console.log(data);

    const queries = { raw: true, nest: true };
    const id = uuid4();
    data.id = id;
    try {
      const response = await db.Book.findOrCreate({
        where: {
          title: data.title,
        },
        ...queries,
        defaults: data,
      });
      console.log(response);

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

export const updateBook = (bid, data) =>
  new Promise(async (resolve, reject) => {
    // Phương thức update của sequelize truyền vào 2 object, đầu tiên là những trường data muốn đổi,
    // thứ 2 là check điều kiện của những row data muốn đổi
    // nếu có data thay đổi thì response sẽ là tổng số cột thay đổi
    // Còn ko thì là 0
    try {
      const oldBook = await db.Book.findOne({
        where: { id: bid },
        raw: true,
        nest: true,
      });
      const response = await db.Book.update(data, {
        where: { id: bid },
      });
      response[0] > 0 && removeImage(getFileName(oldBook.image));
      resolve({
        err: response[0] > 0 ? 0 : -1,
        mess:
          response[0] > 0
            ? "Update book success"
            : "Update book failed, not found",
      });
    } catch (error) {
      reject({
        err: -1,
        mess: "Update book failed",
      });
    }
  });

export const deleteBook = (bid) =>
  new Promise(async (resolve, reject) => {
    try {
      const book = await db.Book.findOne({
        where: { id: bid },
        raw: true,
        nest: true,
      });
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      const response = await db.Book.destroy({
        where: { id: bid },
      });
      response > 0 && removeImage(getFileName(book.image));
      resolve({
        err: response > 0 ? 0 : -1,
        mess:
          response > 0
            ? "Delete book success"
            : "Delete book failed, maybe does not exist!!!",
      });
    } catch (error) {
      reject({
        err: -1,
        mess: "Delete book failed",
      });
    }
  });
