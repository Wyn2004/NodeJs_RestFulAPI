import joi from "joi";
import {
  badRequestError,
  internalServerError,
} from "../middlewares/handleError";
import * as bookService from "../services/book";
import * as schema from "../helpers/joinSchema";
import { removeImage } from "../helpers/removeImage";

export const getBooks = async (req, res) => {
  try {
    const response = await bookService.getBooks(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const createBook = async (req, res) => {
  const data = req.body;
  const imageFile = req?.file;
  data.image = imageFile?.path;
  console.log(imageFile);

  try {
    const { error } = joi
      .object({
        title: schema.title,
        price: schema.price,
        available: schema.available,
        image: schema.image,
        description: schema.description,
        category_code: schema.category_code,
      })
      .validate(data);
    if (error) {
      imageFile && removeImage(imageFile?.filename);
      return badRequestError(error.message, res);
    }
    const response = await bookService.createBook(data);
    response.err === -1 && imageFile && removeImage(imageFile?.filename);
    return res.status(200).json(response);
  } catch (error) {
    imageFile && removeImage(imageFile?.filename);
    return internalServerError(res);
  }
};

export const updateBook = async (req, res) => {
  const imageFile = req?.file;
  const data = req.body;
  data.image = imageFile?.path;
  data.bid = req.params.bid;
  try {
    const { error } = joi
      .object({
        title: schema.title,
        price: schema.price,
        available: schema.available,
        image: schema.image,
        description: schema.description,
        category_code: schema.category_code,
        bid: schema.bid,
      })
      .validate(data);
    if (error) {
      imageFile && removeImage(imageFile?.filename);
      return badRequestError(error.message, res);
    }
    const { bid, ...updateData } = data;
    const response = await bookService.updateBook(bid, updateData);
    response.err === -1 && imageFile && removeImage(imageFile?.filename);
    return res.status(200).json(response);
  } catch (error) {
    imageFile && removeImage(imageFile?.filename);
    return internalServerError(res);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bid = req.params.bid;
    const { error } = joi.object({ bid: schema.bid }).validate({ bid });
    if (error) return badRequestError(error.message, res);
    const response = await bookService.deleteBook(bid);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
