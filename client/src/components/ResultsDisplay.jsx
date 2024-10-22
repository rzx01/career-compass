import React, { useEffect, useState } from "react";
import CareerCard from "./CareerCard"; // Adjust the import path as necessary

const DisplayResults = ({ option }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token"); // Assuming your token is stored in localStorage

      try {
        const response = await fetch(
          `http://localhost:5000/api/results/${option}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Set the Bearer token in the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setResults(data); // This will contain 4 arrays as per the backend logic
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [option]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const [recommendedCareers, jobsForCareer1, jobsForCareer2, jobsForCareer3] =
    results;

  return (
    <div className="results-display w-fit">
      <h2 className="text-2xl font-bold mb-6">Recommended Careers</h2>
      <div className="">
        <ul className="flex justify-around">
          {recommendedCareers.map((career, index) => (
            <li key={index} className="font-semibold mb-6 lg:text-3xl">
              {career}
            </li>
          ))}
        </ul>
      </div>

      <div className="job-section flex justify-between">
        <div className="career-jobs">

          {jobsForCareer1.length > 0 ? (
            jobsForCareer1.map((job, index) => (
              <CareerCard
                key={index}
                job_title={job?.role} // Ensure the property names match your JobData schema
                salary_range={job?.salary_range}
                experience={job?.experience}
                work_type={job?.work_type}
              />
            ))
          ) : (
            <div>No job data available for this career.</div>
          )}
        </div>

        <div className="career-jobs ">

          {jobsForCareer2.length > 0 ? (
            jobsForCareer2.map((job, index) => (
              <CareerCard
                key={index}
                job_title={job?.role}
                salary_range={job?.salary_range}
                experience={job?.experience}
                work_type={job?.work_type}
              />
            ))
          ) : (
            <div>No job data available for this career.</div>
          )}
        </div>

        <div className="career-jobs">

          {jobsForCareer3.length > 0 ? (
            jobsForCareer3.map((job, index) => (
              <CareerCard
                key={index}
                job_title={job?.role}
                salary_range={job?.salary_range}
                experience={job?.experience}
                work_type={job?.work_type}
              />
            ))
          ) : (
            <div>No job data available for this career.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayResults;
