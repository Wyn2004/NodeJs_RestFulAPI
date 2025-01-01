import { internalServerError } from "../middlewares/handleError";
import * as insertService from "../services/insert";

export const insertController = async (req, res) => {
  try {
    const response = await insertService.insert();
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
