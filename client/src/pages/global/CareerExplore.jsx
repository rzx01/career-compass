import React, { useState, useEffect } from 'react';
import career_banner from '../../assets/images/career_banner.jpg'; 
import SearchBar from '../../components/SearchBar';
import CareerCard from '../../components/CareerCard';
import DropDown from "../../components/DropDown";

const CareerExplore = () => {
  const [isActive, setIsActive] = useState(false);
  const [careerData, setCareerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({ work_type: '' });
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const recordsPerPage = 10;
  const workTypeOptions = ['Intern', 'Part-Time', 'Full-Time', 'Contract', 'Temporary'];
  const experienceSortOptions = ['Lowest to Highest', 'Highest to Lowest'];

  const toggleSort = () => {
    setIsActive(!isActive);
    setFilter({ work_type: '', experience: '' }); 
    setCurrentPage(1); 
  };

  const fetchCareerData = async () => {
    console.log('Current Filter:', filter);
    try {
        const response = await fetch(
            `http://localhost:5000/getCareerCard?page=${currentPage}&limit=${recordsPerPage}&work_type=${filter.work_type}&experience=${filter.experience}&salary_range=${filter.salary_range}&experience_sort=${filter.experience_sort}&searchQuery=${searchQuery}`
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCareerData(data.careers || []);
        setTotalPages(data.totalPages || 0);
    } catch (error) {
        console.error('Error fetching career data:', error);
        setCareerData([]);
    }
};
  
    useEffect(() => {
      fetchCareerData();
    }, [currentPage, filter, searchQuery]);

  // updating filter
  const handleFilterChange = (newFilter) => {
    if (newFilter.work_type === 'No Experience') {
        setFilter({ work_type: '', experience: '0' });
    } else if (newFilter.salary_range === 'high') {
        setFilter({ salary_range: 'high' });
    } else {
        setFilter((prev) => ({ ...prev, ...newFilter }));
    }
    setCurrentPage(1);
  };
  
  const handleSearchChange = (query) => {
    setSearchQuery(query); 
    setCurrentPage(1); 
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const visiblePages = pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, totalPages));

  return (
    <div className="w-full">
      <div className="w-full h-36 md:h-44 lg:h-52 overflow-hidden">
        <img
          src={career_banner}
          alt="Career Banner"
          className="w-full h-full object-cover"
        />
      </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-5">  
        <div className="flex space-x-2 mb-2 md:mb-0">
        <div className="flex space-x-2 mb-2 md:mb-0">
        
          <DropDown 
              label="Experience" 
              buttonClass="border-moss bg-moss text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:border-moss hover:shadow-md hover:shadow-black/10" 
              options={experienceSortOptions} 
              onSelect={(option) => handleFilterChange({ experience_sort: option === 'Lowest to Highest' ? 'asc' : 'desc' })}
          />
          <DropDown 
              label="Work Type" 
              buttonClass="border-rust bg-rust text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:border-rust hover:shadow-md hover:shadow-black/10" 
              options={workTypeOptions} 
              onSelect={(option) => handleFilterChange({ work_type: option })}
          />
      </div>

      </div>

      <div className="flex space-x-2 items-center max-lg:visible">
        <button
          onClick={toggleSort}
          className={`border rounded-md px-4 py-2 transition-colors duration-300 ease-in-out whitespace-nowrap border-gray-400 text-black-600 hover:border-royalblue hover:bg-royalblue hover:text-white`}
        >
          Clear Filter
        </button>
        <SearchBar onChange={(event) => handleSearchChange(event.target.value)} />
      </div>
    </div>

    <hr className="border-t border-gray-300" />

    <div className="mt-2 flex flex-col md:flex-row">
      <div className="flex flex-col items-start pr-4 max-sm:hidden">
        <p className="text-2xl mb-2 max-sm:text-sm">General</p>
        <p
          className="text-lg mb-2 text-gray-500 max-sm:text-sm hover:text-black hover:cursor-pointer dark:text-gray-400 dark:hover:text-white"
          onClick={() => handleFilterChange({ work_type: 'Intern' })}
        >
          Internships
        </p>
        <p
          className="text-lg mb-2 text-gray-500 max-sm:text-sm hover:text-black hover:cursor-pointer dark:text-gray-400 dark:hover:text-white"
          onClick={() => handleFilterChange({ work_type: 'Part-Time' })}
        >
          Part-time Jobs
        </p>
        <p
          className="text-lg text-gray-500 max-sm:text-sm hover:text-black hover:cursor-pointer dark:text-gray-400 dark:hover:text-white"
          onClick={() => handleFilterChange({ work_type: '', experience: '0' })}
        >
          Jobs that don't require experience
        </p>
        
      </div>

      <div className="border-l border-gray-300 h-auto mx-4 max-sm:mx-1" />

      <div className="flex flex-col items-start max-sm:w-full">
        {careerData.map((career, index) => (
          <CareerCard
            key={index}
            job_title={career.job_title}
            salary_range={career.salary_range}
            experience={career.experience}
            work_type={career.work_type}
          />
        ))}
      </div>
    </div>

    <div className="flex justify-center my-4 p-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 border rounded bg-white dark:bg-transparent dark:text-gray-300 text-black border-gray-400"
      >
        Previous
      </button>

      {currentPage > 4 && (
        <>
          <button
            onClick={() => paginate(1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === 1 ? 'bg-royalblue text-white' : 'bg-white text-black border-gray-400 dark:bg-transparent dark:text-gray-300'
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
            pageNumber === currentPage ? 'bg-royalblue text-white' : 'bg-white text-black border-gray-400 dark:bg-transparent dark:text-gray-300'
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
        className="mx-1 px-3 py-1 border rounded bg-white text-black border-gray-400 dark:bg-transparent dark:text-gray-300"
      >
        Next
      </button>
    </div>
  </div>
);
};

export default CareerExplore;