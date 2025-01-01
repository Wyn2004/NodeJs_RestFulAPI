import { internalServerError } from "../middlewares/handleError";
import * as userService from "../services/user";

export const getMyProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await userService.getMyProfile(id);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const response = await userService.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
