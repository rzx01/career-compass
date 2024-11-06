import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import{ submitOceanResults, submitAptitudeResults, displayResults} from "../controllers/resultController.js";

const resultRoutes = express.Router();

resultRoutes.post("/", authMiddleware, submitOceanResults );
resultRoutes.post("/aptitude", authMiddleware, submitAptitudeResults );
resultRoutes.get("/:option", authMiddleware, displayResults );

export default resultRoutes;