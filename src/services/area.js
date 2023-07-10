import db from "../models/index";

// getall category
export const getAllAreaServer = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Area.findAll({
        raw: true,
        attributes: ["code", "value", "order"],
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
