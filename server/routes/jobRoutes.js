import { getJobsData,getOneJobData } from "../controllers/careerController.js";
import express from "express";

const jobRoutes = express.Router();

jobRoutes.get('/', getJobsData);
jobRoutes.get('/:job_id', getOneJobData);

export default jobRoutes;
