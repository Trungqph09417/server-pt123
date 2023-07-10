import db from "../models/index";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";
import generateCode from "../utils/generateCode";
import { dataPrice, dataArea } from "../utils/datas";
import { getNumberFromString, getNumberFromStringV2 } from "../utils/common";
require("dotenv").config();

const dataBody = [
  {
    body: nhachothue.body,
    code: "NCT",
  },
  {
    body: chothuephongtro.body,
    code: "CTPT",
  },
  {
    body: chothuematbang.body,
    code: "CTMB",
  },
  {
    body: chothuecanho.body,
    code: "CTCH",
  },
];
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//
// const prices=
export const inserServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];
      dataBody.forEach((cate) => {
        cate.body.forEach(async (item) => {
          let postId = v4();
          let labelCode = generateCode(item?.header?.class?.classType).trim();
          let provinceCode = generateCode(
            item?.header?.address?.split(",")?.slice(-1)[0]
          ).trim();
          provinceCodes?.every((item) => item?.code !== provinceCode) &&
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
            });
          labelCodes?.every((item) => item?.code !== labelCode) &&
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType.trim(),
            });

          let attributesId = v4();
          let userId = v4();
          let overviewId = v4();
          let imagesId = v4();
          let currentArea = getNumberFromString(
            item?.header?.attribute?.acreage
          );
          let currentPrice = getNumberFromString(
            item?.header?.attribute?.price
          );
          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: cate.code,
            description: JSON.stringify(item?.mainContent?.content),
            userId,
            overviewId,
            imagesId,
            areaCode: dataArea.find(
              (area) => area.max > currentArea && area.min <= currentArea
            )?.code,
            priceCode: dataPrice.find(
              (price) => price.max > currentPrice && price.min <= currentPrice
            )?.code,
            provinceCode,
            priceNumber: +getNumberFromStringV2(item?.header?.attribute?.price),
            areaNumber: +getNumberFromStringV2(
              item?.header?.attribute?.acreage
            ),
          });

          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attribute?.price,
            acreage: item?.header?.attribute?.acreage,
            published: item?.header?.attribute?.published,
            hashtag: item?.header?.attribute?.hashtag,
          });
          await db.Image.create({
            id: imagesId,
            image: JSON.stringify(item?.images),
          });

          await db.Overview.create({
            id: overviewId,
            code: item?.overContent?.overviewContent.find(
              (i) => i.name === "Mã tin:"
            )?.content,
            area: item?.overContent?.overviewContent.find(
              (i) => i.name === "Khu vực"
            )?.content,
            type: item?.overContent?.overviewContent.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overContent?.overviewContent.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            created: item?.overContent?.overviewContent.find(
              (i) => i.name === "Ngày đăng:"
            )?.content,
            expired: item?.overContent?.overviewContent.find(
              (i) => i.name === "Ngày hết hạn:"
            )?.content,
            bonus: item?.overContent?.overviewContent.find(
              (i) => i.name === "Gói tin:"
            )?.content,
          });
          await db.User.create({
            id: userId,
            name: item?.postContact?.inforContent.find(
              (i) => i.name === "Liên hệ:"
            )?.content,
            password: hashPassword("123456"),
            phone: item?.postContact?.inforContent.find(
              (i) => i.name === "Điện thoại:"
            )?.content,
            zalo: item?.postContact?.inforContent.find((i) => i.name === "Zalo")
              ?.content,
          });
        });
      });

      provinceCodes?.forEach(async (item) => {
        await db.Province.create(item);
      });
      labelCodes?.forEach(async (item) => {
        await db.Label.create(item);
      });
      resolve("done...");
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
export const createPriceAndArea = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      // console.log("log respone", respone);
      resolve("ok price");
    } catch (e) {
      reject("price failt!");
      reject(e);
    }
  });

// export const createArea = () =>
//   new Promise((resolve, reject) => {
//     try {
//       dataArea.forEach(async (item, index) => {
//         await db.Area.create({
//           code: item.code,
//           value: item.value,
//           order: index + 1,
//         });
//       });
//       resolve("ok area");
//     } catch (e) {
//       reject("area failt!");
//     }
//   });
