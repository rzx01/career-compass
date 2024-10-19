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
      const { page = 1, limit = 10, work_type, experience, salary_range, job_title_regex } = req.query;
      const skip = (page - 1) * limit;

      let filter = {};
      if (work_type) {
          filter.work_type = work_type;
      }
      if (experience) { 
          filter.experience = { $regex: /^0/ }; 
      }
      if (salary_range === 'high') {
          filter['salary_range.min'] = { $gte: 80000 }; 
      }
      if (job_title_regex) {
          filter.job_title = { $regex: new RegExp(job_title_regex + '$', 'i') }; 
      }

      const careerData = await JobData.find(filter)
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
