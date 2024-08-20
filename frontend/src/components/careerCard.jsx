import React from 'react';
import { IoIosArrowForward } from "react-icons/io";

const CareerCard = ({ careerName, salary, experience, workType }) => {
  return (
    <div className="m-3 w-3/4 h-20 bg-white border border-gray-300 shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <div className="grid grid-cols-5 gap-2 h-full items-center p-4">

        <div className="text-sm">
          Job Title: {careerName}
        </div>
        <div className="text-sm">
          Salary: {salary}
        </div>
        <div className="text-sm">
          Experience: {experience}
        </div>
        <div className="text-sm">
          Work Type: {workType}
        </div>

        <div className="flex justify-end">
          <IoIosArrowForward className="text-gray-500 w-5 h-5" />
        </div>
        
      </div>
    </div>
  );
};

export default CareerCard;
