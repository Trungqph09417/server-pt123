import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // hàm nhận 2 giá trị (password , độ khó token)

export const registerService = ({ phone, password, name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          name,
          password: hashPassword(password),
          id: v4(),
        },
      });
      // response ==> trả về 1 mảng 2 phần tử ==> tạo mới là true ngược lại
      // console.log("response >>>", response);
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          {
            expiresIn: "2d",
          }
        ); // toán tử && (nếu 2 giá trị đúng ==> lấy giá trị sau , nếu response[1] sai ==> gán luôn token)

      /**
       *  viêt lại code
       * const token;
       *  const tk = {};
      if (response[1]) {
        tk = jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          {
            expiresIn: "2d",
          }
        );
      } else {
        tk = response[1];
      }
       *  */

      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register is  successfully"
          : "Phone number has been aldready used!",
        token: token ? token : null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true, // return ==> 1 object dang json ==> có thể lấy dữ liệu
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          {
            expiresIn: "2d",
          }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is  successfully"
          : response
          ? "Password is wrong !"
          : "Phone number not found !",
        token: token ? token : null,
      });
    } catch (error) {
      reject(error);
    }
  });
