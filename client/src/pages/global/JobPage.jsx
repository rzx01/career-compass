import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobPage = ({ match }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { job_id } = useParams();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/${job_id}`
        );  //job_id passed as a parameter to job page
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 flex flex-col items-center dark:bg-gray-900 dark:text-gray-300">
      <div className="w-full mb-6 text-center">
        <h1 className="text-3xl font-bold dark:text-white">{job.job_title}</h1>
      </div>

      {/* Job Role */}
      <div className="w-full lg:w-3/4 bg-[#D1C5C6]  p-6 shadow-lg rounded-md  dark:bg-purple-500 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Job Role</h2>
        <p>{job.role}</p>
      </div>

      <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Experience */}
        <div className="bg-[#8B9E83] dark:bg-[#485d45]-350 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <p>{job.experience}</p>
        </div>

        {/* Qualifications */}
        <div className="bg-[#C27D6C] dark:bg-[#6c5147]-300 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
          <p>{job.qualifications}</p>
        </div>

        {/* Salary */}
        <div className="bg-[#145ABC] dark:bg-[#0e3f87]-300 p-2 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Salary</h2>
          <p>{job.salary_range}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="w-full lg:w-3/4 bg-[#D1C5C6] dark:bg-purple-500 p-6 shadow-lg rounded-md dark:text-gray-300 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
        <p>{job.job_description}</p>
      </div>

      <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Skills */}
        <div className="bg-[#C27D6C] dark:bg-[#6c5147]-300 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc pl-5">{job.skills}</ul>
        </div>

        {/* Responsibilities */}
        <div className="bg-[#8B9E83] dark:bg-[#485d45]-350 p-4 shadow-lg rounded-md dark:text-gray-300">
          <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
          <p>{job.responsibilities}</p>
        </div>
      </div>

      {/* Benefits */}
      {/* <div className="w-full lg:w-3/4 bg-[#145ABC] dark:bg-[#0e3f87]-300 p-6 shadow-lg rounded-md dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
        <p>{job.benefits}</p>
      </div> */}
    </div>
  );
};

export default JobPage;
