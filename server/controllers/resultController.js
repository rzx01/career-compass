import Result from '../models/Result.js';
import User from "../models/User.js";
import KNN from 'ml-knn';
import mongoose from 'mongoose';
import JobData from "../models/Job.js";
import CareerMap from "../models/CareerMap.js";
import { timestamp } from 'rxjs';

export const submitOceanResults = async (req, res, next) => {
    try {
        const finalResults = req.body.finalScores; 

        const scores_array = [[
            finalResults['O'], 
            finalResults['C'], 
            finalResults['E'], 
            finalResults['A'], 
            finalResults['N']
        ]];
        
        const user = await User.findById(req.user.userId);
        const result = new Result({
            type: "ocean",
            user_id: user.email, 
            career_names: [],
            oceanScore: finalResults 
        });

        await result.save();

        const oceanData = await mongoose.connection.db.collection('ocean').find({}).toArray();
        
        const X = oceanData.map(item => [
            item.O_score, 
            item.C_score, 
            item.E_score, 
            item.A_score, 
            item.N_score
        ]);
        const y = oceanData.map(item => item.Career);

        const topCareersSet = new Set();

        for (let k = 9; k >= 7; k--) {
            const knn = new KNN(X, y, { k });
            const predictions = knn.predict(scores_array);

            const careerCount = {};
            predictions.forEach(career => {
                careerCount[career] = (careerCount[career] || 0) + 1;
            });

            const topCareer = Object.entries(careerCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 1)
                .map(entry => entry[0]);
            
            topCareer.forEach(career => topCareersSet.add(career));
        }

        if (topCareersSet.size < 3) {
            for (let k = 6; k >= 2; k--) {
                const knn = new KNN(X, y, { k });
                const predictions = knn.predict(scores_array);

                const careerCount = {};
                predictions.forEach(career => {
                    careerCount[career] = (careerCount[career] || 0) + 1;
                });

                const topCareer = Object.entries(careerCount)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 1)
                    .map(entry => entry[0]);

                topCareer.forEach(career => topCareersSet.add(career));

                if (topCareersSet.size >= 3) break;
            }
        }

        const topCareers = Array.from(topCareersSet).slice(0, 3);
        
        result.career_names = topCareers;
        await result.save();

        res.json({ predictions: topCareers });
        
    } catch (error) {
        next(error);
    }
};
export const submitAptitudeResults = async (req, res, next) => {
    try {
      const aptitudeScore  = req.body;

      const user = await User.findById(req.user.userId);
      console.log(user);
      console.log(aptitudeScore);
      if (!user.email || !aptitudeScore) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const result = new Result({
        type: 'aptitude',
        user_id: user.email,
        aptitudeScore,
        career_names: [], 
      });

      await result.save();
  
      const aptitudeData = await mongoose.connection.db.collection('aptitude').find({}).toArray();
  
      const X = aptitudeData.map(item => [
        item.Numerical_Aptitude,
        item.Spatial_Aptitude,
        item.Abstract_Reasoning,
        item.Perceptual_Aptitude
      ]);
      const y = aptitudeData.map(item => item.Career);
  
      const scores_array = [[
        aptitudeScore['Numerical Aptitude'],
        aptitudeScore['Spatial Aptitude'],
        aptitudeScore['Abstract Reasoning'],
        aptitudeScore['Perceptual Aptitude']
      ]];
  
      const topCareersSet = new Set();
  
      for (let k = 9; k >= 7; k--) {
        const knn = new KNN(X, y, { k });
        const predictions = knn.predict(scores_array);
  
        const careerCount = {};
        predictions.forEach(career => {
          careerCount[career] = (careerCount[career] || 0) + 1;
        });
  
        const topCareer = Object.entries(careerCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 1)
          .map(entry => entry[0]);
  
        topCareer.forEach(career => topCareersSet.add(career));
      }
  
      if (topCareersSet.size < 3) {
        for (let k = 6; k >= 2; k--) {
          const knn = new KNN(X, y, { k });
          const predictions = knn.predict(scores_array);
  
          const careerCount = {};
          predictions.forEach(career => {
            careerCount[career] = (careerCount[career] || 0) + 1;
          });
  
          const topCareer = Object.entries(careerCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 1)
            .map(entry => entry[0]);
  
          topCareer.forEach(career => topCareersSet.add(career));
  
          if (topCareersSet.size >= 3) break;
        }
      }
  
      const topCareers = Array.from(topCareersSet).slice(0, 3);
  
      result.career_names = topCareers;
      await result.save();
  
      res.json({ predictions: topCareers });
  
    } catch (error) {
      next(error);
    }
  };

export const displayResults = async (req, res, next) => {
    const { option } = req.params;
    try {
        const user = await User.findById(req.user.userId);
        
        const result = await Result.findOne({ user_id: user.email, type: option });
        const recommendedCareers = result.career_names; 

        const jobDataResults = [];
        for (const career of recommendedCareers) {
            const lowercaseCareer = career.toLowerCase();
            const careerMapEntry = await CareerMap.findOne({ Career: lowercaseCareer });

            if (careerMapEntry) {
                const similarJobs = careerMapEntry.Similar_Jobs;

                const jobsForCareer = await Promise.all(similarJobs.map(async (job) => {
                  const [jobId, jobTitle] = job; 
                  const jobData = await JobData.findOne({  job_id: jobId,
                    $or: [
                      { job_title: { $regex: new RegExp(`^${jobTitle}$`, 'i') } },  
                      { role: { $regex: new RegExp(`^${jobTitle}$`, 'i') } }           
                  ] });
                  return jobData;
              }));

                jobDataResults.push(jobsForCareer.filter(job => job !== null));
            } else {
                
                jobDataResults.push([]);
            }
        }

        res.status(200).json([
            recommendedCareers,     
            jobDataResults[0] || [],
            jobDataResults[1] || [],
            jobDataResults[2] || [], 
        ]);
    } catch (error) {
        next(error);
    }
};
