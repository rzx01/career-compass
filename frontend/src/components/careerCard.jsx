import React from 'react';
import { IoIosArrowForward } from "react-icons/io";

const CareerCard = () => {
  return (
    <div className="m-3 w-3/4 h-20 bg-white border border-gray-300 shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <div className="grid grid-cols-5 gap-2 h-full items-center p-4">

        <div className="text-sm">
          Career Name:
        </div>
        <div className="text-sm">
          Salary: 
        </div>
        <div className="text-sm">
          Experience:
        </div>
        <div className="text-sm">
          Work Type: 
        </div>

        <div className="flex justify-end">
          <IoIosArrowForward className="text-gray-500 w-5 h-5" />
        </div>
        
      </div>
    </div>
  );
};

export default CareerCard;
