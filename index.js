// Khai báo và config thư viện + config file .env
import express from "express";
import cors from "cors";
import initRoute from "./src/routes";
require("dotenv").config();
require("./src/config/connectDatabase");

// Khai báo app và chạy server
const app = express();

// Config cors chỉ cho phép url truy cap
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", " POST", " PUT", "DELETE"],
  })
);

// Config req.body cho phép server đọc đc json
app.use(express.json());
// Config req.body cho phép server đọc đc urlencoded
app.use(express.urlencoded({ extended: true }));

// Chạy hàm route cho server
initRoute(app);

const port = process.env.PORT || 8002;

// Chạy server
const listener = app.listen(port, () => {
  console.log(`Example app listening on port ${listener.address().port}`);
});
