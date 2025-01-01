import { forbiddenError } from "./handleError";

export const verifyAdmin = (req, res, next) => {
  const role = req.user.role_code;
  if (role !== "R1") return forbiddenError("Require admin role", res);
  next();
};

export const verifyModeratorAndAdmin = (req, res, next) => {
  const role = req.user.role_code;
  if (role !== "R1" && role !== "R2")
    return forbiddenError("Require moderator or admin role", res);
  next();
};
