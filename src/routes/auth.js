import express from "express";
import * as controller from "../controllers";

const route = express.Router();
route.post("/register", controller.authController.register);
route.post("/login", controller.authController.login);
route.post("/refresh-token", controller.authController.refreshToken);

module.exports = route;
