import { getJobsData } from "../controllers/careerController.js";
import express from "express";
const careerRoutes = express.Router();

careerRoutes.get('/', getJobsData);

export default careerRoutes;
