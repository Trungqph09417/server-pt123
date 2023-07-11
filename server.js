import express from "express";
require("dotenv").config(); // lấy giá trị dotenv
import initRoutes from "./src/routes";
import cors from "cors";
import connectDatabase from "./src/config/connectDatabase";
import generateCode from "./src/utils/generateCode";
import { dataPrice, dataArea } from "./src/utils/datas";
import { getNumberFromString } from "./src/utils/common";

import genarateDate from "./src/utils/genarateDate";

const app = express();

app.use(
  cors({
    origin: "*", // cho phép url http có thể truy cập lấy data
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "30mb" })); // đọc đc dữ liệu dạng json
app.use(express.urlencoded({ extended: true, limit: "30mb" })); // đọc dữ liệu dạng body khi submit lên

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
