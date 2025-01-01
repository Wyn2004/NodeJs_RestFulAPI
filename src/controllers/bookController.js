import joi from "joi";
import {
  badRequestError,
  internalServerError,
} from "../middlewares/handleError";
import * as bookService from "../services/book";
import {
  available,
  category_code,
  description,
  image,
  price,
  title,
} from "../helpers/joinSchema";
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
  try {
    const data = req.body;
    const imageFile = req?.file;
    data.image = imageFile?.path;
    console.log(data);

    const { error } = joi
      .object({
        title,
        price,
        available,
        image,
        description,
        category_code,
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
