import db from "../models/index";

// getall category
export const getAllCategoriesServer = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
      });

      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get Category",
        datas: response,
      });
    } catch (error) {
      reject(error);
    }
  });
