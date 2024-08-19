import React, {useState} from 'react';
import careerBanner from '../assets/images/career_banner.jpg'; 
import SearchBar from '../components/searchBar';
import CareerCard from '../components/careerCard';

const CareerExplore = () => {

  const [isActive, setIsActive] = useState(false);

  const toggleSort = () => {
    setIsActive(!isActive);
  };

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
        <CareerCard />
        <CareerCard />
        <CareerCard />
        <CareerCard />
        <CareerCard />
        <CareerCard />
        <CareerCard />
        <CareerCard />
        <CareerCard />
        <CareerCard />
      </div>

    </div>
  );
};

export default CareerExplore;
