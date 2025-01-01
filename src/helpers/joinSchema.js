import joi from "joi";

const email = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .required();

const password = joi.string().min(3).required();

const title = joi.string().required();

const description = joi.string().required();

const price = joi.number().required();

const available = joi.number().required();

const category_code = joi.string().alphanum().required();

const image = joi.string().required();

export {
  email,
  password,
  title,
  description,
  price,
  category_code,
  image,
  available,
};
