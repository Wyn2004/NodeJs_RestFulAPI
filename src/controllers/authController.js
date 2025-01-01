import * as authService from "../services/auth";
import {
  badRequestError,
  internalServerError,
} from "../middlewares/handleError";
import joi from "joi";
import * as schema from "../helpers/joinSchema";

export const register = async (req, res) => {
  try {
    // Dung joi de render error input voi 2 ham trong helps
    const error = joi
      .object({
        email: schema.email,
        password: schema.password,
        role_code: schema.role_code,
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
        email: schema.email,
        password: schema.password,
      })
      .validate(req.body)?.error;
    if (error) return badRequestError(error.message, res);
    const response = await authService.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.body;
    const { error } = joi
      .object({
        refresh_token: schema.refresh_token,
      })
      .validate(refresh_token);
    if (error) return badRequestError(error.message, res);
    const response = await authService.refreshToken(refresh_token);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
