import db from "../models";
import data from "../data/data.json";
import { generateCode } from "../helpers/generateCode";
import uuid4 from "uuid4";

export const insert = () =>
  new Promise(async (resolve, reject) => {
    try {
      const categories = Object.keys(data);
      categories.forEach(async (cate) => {
        const code = generateCode(cate);
        await db.Category.findOrCreate({
          where: { code },
          defaults: {
            code,
            value: cate,
          },
        });
      });
      const dataArr = Object.entries(data);
      dataArr.forEach((item) => {
        item[1]?.forEach(async (book) => {
          const category_code = generateCode(item[0]);
          await db.Book.create({
            id: uuid4(),
            title: book.bookTitle,
            price: book.bookPrice,
            available: book.available,
            image: book.imageUrl,
            description: book.bookDescription,
            category_code,
          });
        });
      });
      resolve("ok");
    } catch (error) {
      reject({
        err: -1,
        mess: "Insert data failed",
      });
    }
  });
