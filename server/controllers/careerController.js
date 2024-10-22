import JobData from "../models/Job.js";

export const getJobsData = async(req, res, next) => {
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
            filter.job_title = { $regex: searchQuery, $options: 'i' }; 
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
        next(error);
    }
  };

  export const getOneJobData =async(req,res,next)=>{
    const { job_id } = req.params;

  try {
    const job = await JobData.findOne({job_id:job_id});
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  }catch(error){next(error)}
  }