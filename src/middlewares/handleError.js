// Nó chỉ có export default trên file này nên khai báo tên gì cũng được
import createError from "http-errors";

export const badRequestError = (mess, res) => {
  const error = createError.BadRequest(mess);
  return res.status(error.status).json({
    err: -1,
    mess: error.message,
  });
};

export const unAuthorizedError = (mess, res) => {
  const error = createError.Unauthorized(mess);
  return res.status(error.status).json({
    err: -1,
    mess: error.message,
  });
};

export const forbiddenError = (mess, res) => {
  const error = createError.Forbidden(mess);
  return res.status(error.status).json({
    err: -1,
    mess: error.message,
  });
};

export const notFoundError = (req, res) => {
  const error = createError.NotFound();
  return res.status(error.status).json({
    err: -1,
    mess: error.message,
  });
};

// Dùng cả 2 tham số req và res vì đây là dùng trên route trên server
export const internalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    err: -1,
    mess: error.message,
  });
};
