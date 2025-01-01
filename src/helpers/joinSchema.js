import joi from "joi";

export const email = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .required();

export const password = joi.string().min(3).required();

export const role_code = joi.string().alphanum();

export const refresh_token = joi.string().required();

export const title = joi.string().required();

export const description = joi.string().required();

export const price = joi.number().required();

export const available = joi.number().required();

export const category_code = joi.string().alphanum().required();

export const image = joi.string();

export const bid = joi.string().required();

export const bids = joi.array().required();
