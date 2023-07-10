import db from "../models/index";

// get all province
export const getAllProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get Province",
        datas: response,
      });
    } catch (error) {
      reject(error);
    }
  });
