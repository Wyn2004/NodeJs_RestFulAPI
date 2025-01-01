import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uuid4 from "uuid4";
require("dotenv").config();

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
      expiresIn: "5s",
    }
  );
const generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "10s",
  });

export const register = ({ email, password, role_code }) =>
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
          role_code,
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
      const access_token = isCorrectPassword ? generateToken(response) : null;
      const refresh_token = access_token
        ? generateRefreshToken(response)
        : null;
      await db.User.update(
        {
          refresh_token,
        },
        {
          where: {
            id: response.id,
          },
        }
      );
      resolve({
        err: access_token ? 0 : -1,
        mess: access_token
          ? "Login success"
          : response
          ? "Incorrect password"
          : "Email does not exist!!!",

        access_token: access_token ? `Bearer ${access_token}` : null,
        refresh_token: refresh_token ? `Bearer ${refresh_token}` : null,
      });
    } catch (error) {
      reject({
        err: -1,
        mess: "Login failed",
      });
    }
  });

export const refreshToken = ({ refresh_token }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { refresh_token },
        raw: true,
      });
      if (response) {
        jwt.verify(
          refresh_token,
          process.env.JWT_REFRESH_TOKEN_SECRET,
          async (err) => {
            console.log(err);

            if (err) {
              resolve({
                err: -1,
                mess: "Invalid refresh token, please login again!",
              });
            } else {
              const new_access_token = generateToken(response);
              const new_refresh_token = generateRefreshToken(response);
              await db.User.update(
                {
                  refresh_token: new_refresh_token,
                },
                {
                  where: {
                    id: response.id,
                  },
                }
              );
              resolve({
                err: new_access_token ? 0 : -1,
                mess: new_access_token
                  ? "Create new access token success"
                  : "Create new access token failed, please try again!",
                access_token: new_access_token
                  ? `Bearer ${new_access_token}`
                  : null,
                refresh_token: new_refresh_token
                  ? `Bearer ${new_refresh_token}`
                  : null,
              });
            }
          }
        );
      } else {
        resolve({
          err: -1,
          mess: "Invalid refresh token, please login again!",
        });
      }
    } catch (error) {
      reject({
        err: -1,
        mess: "Refresh token failed",
      });
    }
  });
