import React, { useState, useEffect } from 'react';
import career_banner from '../../assets/images/career_banner.jpg'; 
import CareerMapCard from '../../components/CareerMapCard';
import { BsFillExclamationCircleFill } from "react-icons/bs";
import SearchBar from '../../components/SearchBar';

const CareerMap = () => {
    const [careerData, setCareerData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCareerData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/career_map/CareerMap?search=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Failed to fetch career data');
            }
            const data = await response.json();
            setCareerData(data.map(item => item.Career)); 
        } catch (error) {
            console.error('Error fetching career data:', error);
        }
    };

    useEffect(() => {
        fetchCareerData();
    }, [searchQuery]);

    const handleSearchChange = (query) => {
        setSearchQuery(query); 
    };

    const handlePredefinedSearch = (type) => {
        setSearchQuery(type); 
    };

    const handleClearFilter = () => {
        setSearchQuery(''); 
    };

  return (
    <div className="w-full">
      <div className="w-full h-36 md:h-44 lg:h-52 overflow-hidden">
        <img
          src={career_banner}
          alt="Career Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between p-3">  
        <div className="flex space-x-2 mb-2 md:mb-0">
        </div>

        <div className="flex space-x-2 items-center max-lg:visible">
        <button
          onClick={handleClearFilter}
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
      <p className="border border-rust rounded-lg p-3 text-md mt-3 mb-3 font-semibold max-sm:text-sm text-rust">
            <BsFillExclamationCircleFill className="inline mr-2 mb-1" />
            Click on the Careers to find similar Jobs
      </p>
        <p className="text-2xl mb-2 max-sm:text-sm">General Searches</p>
        <p
          className="text-lg mb-2 text-gray-500 max-sm:text-sm hover:text-black hover:cursor-pointer dark:text-gray-400 dark:hover:text-white"
          onClick={() => handlePredefinedSearch('manager')}>
          Managerial Jobs
        </p>
        <p
          className="text-lg mb-2 text-gray-500 max-sm:text-sm hover:text-black hover:cursor-pointer dark:text-gray-400 dark:hover:text-white"
          onClick={() => handlePredefinedSearch('engineer')}>
          Engineer Jobs
        </p>
        <p
          className="text-lg text-gray-500 max-sm:text-sm hover:text-black hover:cursor-pointer dark:text-gray-400 dark:hover:text-white"
          onClick={() => handlePredefinedSearch('analyst')}>
          Analyst Jobs
        </p>
        
      </div>

      <div className="border-l border-gray-300 h-auto max-sm:mx-1 mr-2" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {careerData.map((career, index) => (
            <CareerMapCard key={index} job_title={career} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerMap;
