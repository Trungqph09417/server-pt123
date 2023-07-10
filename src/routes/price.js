import express from "express";
import * as priceController from "../controllers/priceController";
const router = express.Router();

router.get("/all", priceController.getAllPrice);

export default router;
