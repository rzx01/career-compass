import React, { useState, useEffect } from 'react';
import careerBanner from '../assets/images/career_banner.jpg'; 
import SearchBar from '../components/searchBar';
import CareerCard from '../components/careerCard';

const CareerExplore = () => {
  const [isActive, setIsActive] = useState(false);
  const [careerData, setCareerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 10;

  const toggleSort = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getCareerCard?page=${currentPage}&limit=${recordsPerPage}`);
        const data = await response.json();
        setCareerData(data.careers); // Assuming 'careers' is the key in your response
        setTotalPages(data.totalPages); // Assuming 'totalPages' is provided in your response
      } catch (error) {
        console.error('Error fetching career data:', error);
      }
    };

    fetchCareerData();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const visiblePages = pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, totalPages));

  return (
    <div>
        <div className="w-full h-36 md:h-44 lg:h-52 overflow-hidden">
          <img
            src={careerBanner}
            alt="Career Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full flex items-center justify-between p-5">
        <div className="flex space-x-2">
          <button className="border border-royalblue bg-royalblue text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:border-royalblue hover:shadow-md hover:shadow-black/10">
            Salary
          </button>

          <button className="border border-moss bg-moss text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:border-moss hover:shadow-md hover:shadow-black/10">
            Experience
          </button>

          <button className="border border-rust bg-rust text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:border-rust hover:shadow-md hover:shadow-black/10">
            Work Type
          </button>
        </div>

        <div className="flex space-x-2 items-center">
          <button
            onClick={toggleSort}
            className={`border rounded-md px-4 py-2 transition-colors duration-300 ease-in-out whitespace-nowrap ${
              isActive
                ? 'bg-royalblue text-white border-royalblue'
                : 'border-gray-400 text-black-600 hover:border-royalblue'
            }`}
          >
            Sort Alphabetically
          </button>
          <SearchBar />
        </div>
      </div>

      <hr className="border-t border-gray-300" />

      <div className="mt-2 flex flex-col items-center">
        {careerData.map((career, index) => (
          <CareerCard 
            key={index} 
            careerName={career.job_title} 
            salary={career.salary_range} 
            experience={career.experience} 
            workType={career.work_type} 
          />
        ))}
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 border rounded bg-white text-black border-gray-400"
        >
          Previous
        </button>

        {currentPage > 4 && (
          <>
            <button
              onClick={() => paginate(1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === 1 ? 'bg-royalblue text-white' : 'bg-white text-black border-gray-400'
              }`}
            >
              1
            </button>
            {currentPage > 5 && <span className="mx-1 px-3 py-1">...</span>}
          </>
        )}

        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`mx-1 px-3 py-1 border rounded ${
              pageNumber === currentPage ? 'bg-royalblue text-white' : 'bg-white text-black border-gray-400'
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < totalPages - 4 && (
          <>
            {currentPage < totalPages - 5 && <span className="mx-1 px-3 py-1">...</span>}
            <button
              onClick={() => paginate(totalPages)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === totalPages ? 'bg-royalblue text-white' : 'bg-white text-black border-gray-400'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-1 px-3 py-1 border rounded bg-white text-black border-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CareerExplore;
