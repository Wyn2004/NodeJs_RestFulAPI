import express from "express";
import * as controller from "../controllers";
import { verifyAccessToken } from "../middlewares/verifyAccessToken";
import {
  verifyAdmin,
  verifyModeratorAndAdmin,
} from "../middlewares/verifyRole";

const route = express.Router();
// PUBLIC ROUTE HERE

// PRIVATE ROUTE HERE
route.use(verifyAccessToken);
route.get("/", controller.userController.getMyProfile);

// MODERATOR ROUTE HERE
route.use(verifyModeratorAndAdmin);
route.get("/all", controller.userController.getAllUser);
// ADMIN ROUTE HERE

module.exports = route;
