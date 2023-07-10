import express from "express";
import * as areaController from "../controllers/areaController";
const router = express.Router();

router.get("/all", areaController.getAllArea);

export default router;
