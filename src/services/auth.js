import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uuid4 from "uuid4";

// hash pass bằng hàm bcrypt.hash với salt 10
const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const generateToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
      role_code: user.role_code,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          id: uuid4(),
          email,
          password: hashPassword(password),
        },
      });
      resolve({
        err: response[1] ? 0 : -1,
        mess: response[1] ? "Register success" : "Register email is exist!!!",
      });
    } catch (error) {
      reject({
        err: -1,
        mess: "Register failed",
      });
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: {
          email,
        },
        raw: true,
      });
      const isCorrectPassword = response
        ? bcrypt.compareSync(password, response.password)
        : false;
      const token = isCorrectPassword ? generateToken(response) : null;
      resolve({
        err: token ? 0 : -1,
        mess: token
          ? "Login success"
          : response
          ? "Incorrect password"
          : "Email does not exist!!!",

        access_token: token ? `Bearer ${token}` : null,
      });
    } catch (error) {
      reject({
        err: -1,
        mess: "Login failed",
      });
    }
  });
