import db from "../models/index";

// get user current
export const getOneUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get user",
        datas: response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(payload, {
        where: { id },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "Updated" : "Failed to Update user",
      });
    } catch (error) {
      reject(error);
    }
  });
