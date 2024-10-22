import express from 'express';
import {getOceanQuestions, getAptitudeQuestions} from "../controllers/questionController.js";

const questionRoutes = express.Router();

questionRoutes.get('/ocean', getOceanQuestions);
questionRoutes.get('/aptitude', getAptitudeQuestions);

export default questionRoutes;
