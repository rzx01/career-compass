import express from 'express';
import { getCareerMapData } from '../controllers/careerMapController.js';  // Controller for fetching career map data

const careerMapRoutes = express.Router();

careerMapRoutes.get('/CareerMap', getCareerMapData);

export default careerMapRoutes;
