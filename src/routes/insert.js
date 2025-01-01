import express from "express";
import { verifyAccessToken } from "../middlewares/verifyAccessToken";
import { insertController } from "../controllers";
import { verifyModeratorAndAdmin } from "../middlewares/verifyRole";
const route = express.Router();

// PRIVATE ROUTE HERE
route.use(verifyAccessToken);
route.use(verifyModeratorAndAdmin);
route.post("/", insertController.insertController);

module.exports = route;
