import * as authService from "../services/auth";
import {
  badRequestError,
  internalServerError,
} from "../middlewares/handleError";
import joi from "joi";
import { email, password } from "../helpers/joinSchema";

export const register = async (req, res) => {
  try {
    // Dung joi de render error input voi 2 ham trong helps
    const error = joi
      .object({
        email,
        password,
      })
      .validate(req.body)?.error;
    if (error) return badRequestError(error.message, res);
    const response = await authService.register(req.body);
    return res.status(201).json({
      err: response.err,
      mess: response.mess,
    });
  } catch (error) {
    return internalServerError(res);
  }
};

export const login = async (req, res) => {
  try {
    // Dung joi de render error input voi 2 ham trong helps
    const error = joi
      .object({
        email,
        password,
      })
      .validate(req.body)?.error;
    if (error) return badRequestError(error.message, res);
    const response = await authService.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
