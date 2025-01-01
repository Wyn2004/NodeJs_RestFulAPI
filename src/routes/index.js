import { notFoundError } from "../middlewares/handleError";
const user = require("./user");
const auth = require("./auth");
const insert = require("./insert");
const book = require("./book");

const initRoute = (app) => {
  // Khởi tạo 1 route user và import dùng từ route user
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/insert", insert);
  app.use("/api/v1/book", book);
  
  // Test trả về khi server on
  app.use(notFoundError);
};

module.exports = initRoute;
