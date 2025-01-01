import jwt from "jsonwebtoken";
import { unAuthorizedError } from "./handleError";

export const verifyAccessToken = (req, res, next) => {
  // Lấy header bearer token
  const reqHeader = req.headers.authorization;
  if (!reqHeader) return unAuthorizedError("Require authorization", res);

  // Split là lấy access token
  const accessToken = reqHeader.trim().split(" ")[1];
  if (!accessToken) return unAuthorizedError("Access token not found", res);

  //  Check access token
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return unAuthorizedError("Invalid access token", res);
    // Nếu dúng thì gán user cho req.user
    req.user = user;

    // tiếp tục vào route kế
    next();
  });
};
