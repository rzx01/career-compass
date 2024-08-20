import mongoose from "mongoose";
const jobDataSchema = new mongoose.Schema({
    job_title: String,
    salary_range: String,
    experience: String,
    work_type: String
  }, { collection: 'job_data' }); 
  
  const JobData = mongoose.model('JobData', jobDataSchema);
  export default JobData