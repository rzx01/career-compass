import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoMdArrowRoundForward } from 'react-icons/io';

const OceanTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions'); 
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleBoxClick = (value) => {
    if (selectedValue === value) {
      setSelectedValue(null); 
    } else {
      setSelectedValue(value); 
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedValue(null); 
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); 
      setSelectedValue(null); 
    }
  };

  return (
    <div className='grid grid-col-1'>
    <div className="flex flex-col items-center justify-center h-screen">
      {/* back btn */}
      <div className="flex flex-col items-start mb-20">
        <p 
          className="flex items-center text-xl text-gray-600 rounded-md font-semibold py-2 mb-4 hover:text-black cursor-pointer" 
          onClick={handleBack} 
        >
          <IoMdArrowRoundBack className="mr-2" />
          Back
        </p>

        {/* question */}
        {questions.length > 0 && (
          <p className="text-4xl font-semibold text-center text-gray-800 mb-4">
            {questions[currentIndex].text}
          </p>
        )}

        {/* square box */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-5 gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <div
                key={value}
                className={`w-12 h-12 flex items-center justify-center border border-gray-400 rounded-md cursor-pointer ${
                  selectedValue === value ? 'bg-rust text-white border-rust' : 'bg-white'
                } hover:shadow-md hover:shadow-black/10`}
                onClick={() => handleBoxClick(value)} 
              >
                {value}
              </div>
            ))}
          </div>

          {/* labels */}
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-between w-full">
              <span className="text-center text-gray-600">Strongly</span>
              <span className="text-center text-gray-600">Neutral</span>
              <span className="text-center text-gray-600">Strongly</span>
            </div>
            <div className="flex justify-between w-full mt-1">
              <span className="text-center text-gray-600">Disagree</span>
              <span className="text-center text-gray-600"></span>
              <span className="text-center text-gray-600">Agree</span>
            </div>
          </div>
        </div>

        {/* next btn */}
        <button 
          onClick={handleNext} 
          className="flex mt-20 text-lg items-center border border-rust bg-rust text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-black/10"
          disabled={currentIndex >= questions.length - 1} 
        >
          Next
          <IoMdArrowRoundForward className="ml-2" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default OceanTest;
