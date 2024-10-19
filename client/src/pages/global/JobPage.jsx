import React, { useState, useEffect } from 'react';
// import TitleComponent from '../../components/jobs/:job_id';
// import useFetch from '../../hooks/useFetch';


// const JobPage = ({ match }) => {
//   const [job, setJob] = useState(null); 
//   const job_id = match.params.id; 
//   const { data, loading, error } = useFetch('/api/jobs');

//   setJob(data); 

//   if (!job) {
//     return <p>Loading job details</p>;
//   }



const JobPage = () => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    setJob({
      experience: '2-4 years',
    //   qualifications: "Bachelor's degree in Computer Science or related field",
      salary_range: '$80,000 - $100,000',
      job_title: 'Full Stack Developer',
      role: 'Develop and maintain web applications using React and Node.js.',
      job_description: 'A challenging role to build scalable web apps with cutting-edge technologies.',
      benefits: 'Health insurance, Paid time off, Remote work options',
      skills: ['React', 'Node.js', 'MongoDB', 'API Development', 'JavaScript'],
      responsibilities: 'Develop full-stack applications, maintain code quality, collaborate with teams',
    });
  }, []);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-page-container p-6 flex flex-col items-center dark:bg-gray-900 dark:text-gray-300">
      
      <div className="w-full mb-6 text-center">
        <h1 className="text-3xl font-bold dark:text-white">{job.job_title}</h1>
      </div>

      {/* Job Role */}
      {/* <div className="w-full lg:w-3/4 bg-[#D1C5C6] dark:bg-[rgb(95,86,87)]-250 p-6 shadow-lg rounded-md dark:text-gray-300 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Job Role</h2>
        <p>{job.role}</p>
      </div> */}

      
      <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Experience */}
        <div className="bg-[#8B9E83] dark:bg-[#485d45]-350 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <p>{job.experience}</p>
        </div>

        {/* Qualifications */}
        {/* <div className="bg-[#C27D6C] dark:bg-[#6c5147]-300 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
          <p>{job.qualifications}</p>
        </div> */}

        {/* Salary */}
        <div className="bg-[#145ABC] dark:bg-[#0e3f87]-300 p-2 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Salary</h2>
          <p>{job.salary_range}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="w-full lg:w-3/4 bg-[#D1C5C6] dark:bg-[#5f5657] p-6 shadow-lg rounded-md dark:text-gray-300 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
        <p>{job.job_description}</p>
      </div>

      
      <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Skills */}
        <div className="bg-[#C27D6C] dark:bg-[#6c5147]-300 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-5">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Responsibilities */}
        <div className="bg-[#8B9E83] dark:bg-[#485d45]-350 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
          <p>{job.responsibilities}</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="w-full lg:w-3/4 bg-[#145ABC] dark:bg-[#0e3f87]-300 p-6 shadow-lg rounded-md dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
        <p>{job.benefits}</p>
      </div>
    </div>
  );
};

export default JobPage;







