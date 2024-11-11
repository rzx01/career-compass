import express from 'express';
import { getCareerMapData } from '../controllers/careerMapController.js';  

const careerMapRoutes = express.Router();

careerMapRoutes.get('/CareerMap', getCareerMapData);

export default careerMapRoutes;