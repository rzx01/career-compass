import React, { useEffect, useState } from "react";
import CareerCard from "./CareerCard"; 
import { Link } from "react-router-dom";

const DisplayResults = ({ option }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCareer, setVisibleCareer] = useState(null); 

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token"); 

      try {
        const response = await fetch(
          `http://localhost:5000/api/results/${option}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("No results found for this option. Please take the test.");
          } else {
            throw new Error("Network response was not ok " + response.statusText);
          }
        }

        const data = await response.json();
        setResults(data); 
      } catch (err) {
        setError(err.message); // Store the error message
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
    return (
      <div>
        <div>{error}</div>
        <Link to={`/${option}`}>Take the test By Cli</Link> {/* Redirect to the test page */}
      </div>
    );
  }

  const [recommendedCareers, jobsForCareer1, jobsForCareer2, jobsForCareer3] = results;

  const handleCareerToggle = (careerIndex) => {
    setVisibleCareer(visibleCareer === careerIndex ? null : careerIndex);
  };

  return (
    <div className="results-display w-full p-4">
      <div>
        <ul className="flex flex-wrap justify-center gap-6 mb-6">
          {recommendedCareers.map((career, index) => (
            <button
              key={index}
              onClick={() => handleCareerToggle(index + 1)} 
              className="bg-blue-400 text-white p-2 rounded"
            >
              <li className="font-semibold text-lg lg:text-3xl">{career}</li>
            </button>
          ))}
        </ul>
      </div>

      <div className="job-section">
        {/* Career 1 Jobs */}
        {visibleCareer === 1 && (
          <div className="career-jobs">
            {jobsForCareer1.length > 0 ? (
              jobsForCareer1.map((job, index) => (
                <Link to={`/jobs/${job.job_id}`} className="w-full" key={index}>
                  <CareerCard
                    job_title={job?.role}
                    salary_range={job?.salary_range}
                    experience={job?.experience}
                    work_type={job?.work_type}
                  />
                </Link>
              ))
            ) : (
              <div>No job data available for this career.</div>
            )}
          </div>
        )}

        {/* Career 2 Jobs */}
        {visibleCareer === 2 && (
          <div className="career-jobs">
            {jobsForCareer2.length > 0 ? (
              jobsForCareer2.map((job, index) => (
                <Link to={`/jobs/${job.job_id}`} className="w-full" key={index}>
                  <CareerCard
                    job_title={job?.role}
                    salary_range={job?.salary_range}
                    experience={job?.experience}
                    work_type={job?.work_type}
                  />
                </Link>
              ))
            ) : (
              <div>No job data available for this career.</div>
            )}
          </div>
        )}

        {/* Career 3 Jobs */}
        {visibleCareer === 3 && (
          <div className="career-jobs">
            {jobsForCareer3.length > 0 ? (
              jobsForCareer3.map((job, index) => (
                <Link to={`/jobs/${job.job_id}`} className="w-full" key={index}>
                  <CareerCard
                    job_title={job?.role}
                    salary_range={job?.salary_range}
                    experience={job?.experience}
                    work_type={job?.work_type}
                  />
                </Link>
              ))
            ) : (
              <div>No job data available for this career.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayResults;
