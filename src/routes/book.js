import express from "express";
import * as controller from "../controllers";
import { verifyAccessToken } from "../middlewares/verifyAccessToken";
import { verifyModeratorAndAdmin } from "../middlewares/verifyRole";
import uploadCloud from "../middlewares/uploader";

const route = express.Router();

route.get("/", controller.bookController.getBooks);

route.use(verifyAccessToken);
route.use(verifyModeratorAndAdmin);
// cài middleware uploadCloud.single("image") vì server sẽ upload ảnh trước khi tạo sản phẩm
// single là up đơn ảnh với key ảnh sẽ là image
route.use(
  "/create",
  uploadCloud.single("image"),
  controller.bookController.createBook
);

module.exports = route;
