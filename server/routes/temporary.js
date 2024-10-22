
app.post('/job_data', async (req, res) => {
    try {
      const jobDataArray = req.body.map(doc => ({ ...doc, r: 1 }));
      const result = await JobData2.insertMany(jobDataArray);
      res.status(201).json({ message: 'Job data documents added successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Error adding job data documents', error });
    }
  });

  app.post('/career_related_jobs', async (req, res) => {
    try {
      const careerData = {
        Career: req.body.Career,
        Similar_Jobs: req.body.Similar_Jobs.map(([job_id, job_title, role]) => [job_id, job_title, role]),
        r: 1
      };
      
      const result = await CareerRelatedJobs.insertMany([careerData]);
      res.status(201).json({ message: 'Career-related job documents added successfully', result });
    } catch (error) {
      res.status(500).json({ message: 'Error adding career-related job documents', error });
    }
  });
  
  import mongoose from 'mongoose';

const JobDataSchema = new mongoose.Schema({
  job_id: { type: String, required: true },
  job_title: { type: String, required: true },
  role: { type: String, required: true },
  job_description: { type: String, required: true },
  experience: { type: String, required: true },
  qualifications: { type: String, required: true },
  skills: { type: String, required: true },
  responsibilities: { type: String, required: true },
  salary_range: { type: String, required: true },
  work_type: { type: String, required: true },
  benefits: { type: [String], required: true },
  company_name: { type: String, required: true },
  company_profile: { type: String, required: true },
  company_size: { type: Number, required: true },
  r: { type: Number, default: 1 }
},{ collection: 'job_data2' });

export const JobData2 = mongoose.model('JobData', JobDataSchema);

import mongoose from 'mongoose';

const CareerRelatedJobsSchema = new mongoose.Schema({
  Career: { type: String, required: true },
  Similar_Jobs: {
    type: [[String]], // Array of arrays of strings
    required: true
  },
  r: { type: Number, default: 1 }
}, { collection: 'CareerMap' });

export const CareerRelatedJobs = mongoose.model('CareerRelatedJobs', CareerRelatedJobsSchema);
