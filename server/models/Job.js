import mongoose from "mongoose";
const jobDataSchema = new mongoose.Schema(
  {
    job_id: {
      type: Number,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    job_description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
      required: true,
    },
    salary_range: {
      type: String,
      required: true,
    },
    work_type: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    company_size: {
      type: Number,
      required: true,
    },
  },
  { collection: "job_data" }
);

const JobData = mongoose.model("JobData", jobDataSchema);
export default JobData;
