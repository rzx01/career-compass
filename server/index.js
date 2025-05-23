import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; 

import connectDB from './config/db.js';

import questionRoutes from './routes/questionsRoutes.js';
import careerRoutes from "./routes/careerRoutes.js";
import userRoutes from './routes/userRoutes.js';
import jobRoutes from "./routes/jobRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import careerMapRoutes from './routes/careerMapRoutes.js';
import { errorHandler } from './utils/errorHandler.js';

dotenv.config();  

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());                   //cross origin resourse sharing-3000 port and 5000 port to allow commn b/w them
app.use(morgan('dev'));            // morgan-
app.use(express.json());           //deals with json type docs-job.js

connectDB(); 

// Routes
app.use('/api/users', userRoutes);          //routes-communication endpoints-connection b/w frontend and db
app.use('/api/questions', questionRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/results',resultRoutes);
app.use('/api/career_map', careerMapRoutes);

// Error handling middleware 
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);          //main code-for switching on server
});




