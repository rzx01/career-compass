import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; 

import JobData from "./models/Job.js";
import { Choice, Question } from './models/Question.js';
import questionsRoutes from './routes/questionsRoutes.js';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './utils/errorHandler.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev')); 
app.use(express.json()); 

connectDB(); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionsRoutes);

// Error handling middleware
app.use(errorHandler);

app.get("/getCareerCard", async (req, res) => {
    try {
        const { page = 1, limit = 10, work_type, experience, salary_range, experience_sort, searchQuery } = req.query;
        const skip = (page - 1) * limit;
  
        let filter = {};
        if (work_type) {
            filter.work_type = work_type;
        }
        if (experience) {
            filter.experience = { $regex: /^0/ };
        }
        if (searchQuery) {
            filter.job_title = { $regex: searchQuery, $options: 'i' }; // Case-insensitive search
        }
  
        let sortCriteria = {};
        if (experience_sort === 'asc') {
            sortCriteria['experience'] = 1;
        } else if (experience_sort === 'desc') {
            sortCriteria['experience'] = -1;
        }
  
        const careerData = await JobData.find(filter)
            .sort(sortCriteria)
            .skip(parseInt(skip))
            .limit(parseInt(limit));
  
        const totalRecords = await JobData.countDocuments(filter);
  
        res.json({
            careers: careerData,
            totalPages: Math.ceil(totalRecords / limit),
        });
    } catch (error) {
        console.error("Error fetching career data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
