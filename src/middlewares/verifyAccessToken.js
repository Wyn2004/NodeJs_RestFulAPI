import jwt from "jsonwebtoken";
import { unAuthorizedError } from "./handleError";
require("dotenv").config();

export const verifyAccessToken = (req, res, next) => {
  // Lấy header bearer token
  const reqHeader = req.headers.authorization;
  if (!reqHeader) return unAuthorizedError("Require authorization", res);

  // Split là lấy access token
  const accessToken = reqHeader.trim().split(" ")[1];
  if (!accessToken) return unAuthorizedError("Access token not found", res);

  //  Check access token
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // kiểm tra xem token hết hạn hay chưa
      const isChecked = err instanceof jwt.TokenExpiredError;
      // chưa hết hạn thì lỗi tức token invalid
      if (!isChecked)
        return unAuthorizedError("Invalid access token", res, isChecked);
      // nếu hết hạn
      if (isChecked)
        return unAuthorizedError("Access Token Expired", res, isChecked);
    }
    // Nếu dúng thì gán user cho req.user
    req.user = user;

    // tiếp tục vào route kế
    next();
  });
};
