import React, { useState } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

const AptitudeTest = () => {
  const question = {
    question: "A bookseller bought 500 text books for 20,000. He wanted to sell them at a profit so that he gets 50 books free. At what profit percent should he sell them?",
    options: [
      "10 %",
      "20 %",
      "15 %",
      "10.5 %"
    ]
  };
  
  const [selectedValue, setSelectedValue] = useState(null);

  const handleBoxClick = (value) => {
    setSelectedValue(selectedValue === value ? null : value);
  };

  const handleNext = () => {
    setSelectedValue(null);
  };

  return (
    <div className='grid grid-col-1'>
      <div className="flex flex-col items-start justify-center h-screen">
        {/* back btn */}
        <div className="flex flex-col items-start mb-20">
          <p 
            className="flex items-center text-xl text-gray-600 rounded-md font-semibold py-2 mb-4 hover:text-black cursor-pointer" 
            
          >
            <IoMdArrowRoundBack className="mr-2" />
            Back
          </p>

          {/* question */}
          <p className="text-xl font-semibold text-left text-gray-800 mb-4">
            {question.question}
          </p>

          {/* square boxes for options */}
          <div className="flex flex-col items-center mb-20">

              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`w-96 h-12 flex items-center justify-center border border-gray-400 rounded-md cursor-pointer mt-4 ${
                    selectedValue === option ? 'bg-rust text-white border-rust' : 'bg-white'
                  } hover:shadow-md hover:shadow-black/10`}
                  onClick={() => handleBoxClick(option)}
                >
                  {option}
                </div>
              ))}

          </div>

          {/* next btn */}
          <button 
            onClick={handleNext} 
            className="flex text-lg items-center border border-rust bg-rust text-white rounded-md py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-black/10 p-4"
          >
            Next
            <IoMdArrowRoundForward className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
