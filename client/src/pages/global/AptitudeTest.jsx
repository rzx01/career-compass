import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const AptitudeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions/aptitude'); 
        const data = await response.json();
        
        if (data) {
          setQuestions(data.shuffledQuestions);
          setSelections(Array(data.length).fill(null)); // Initialize selections
        } else {
          console.error("No questions found");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSelection = (index) => {
    setSelections((prev) => {
      const newSelections = [...prev];
      newSelections[currentIndex] = index; // Store selected index for current question
      return newSelections;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    let correctCount = {
      "Numerical Aptitude": 0,
      "Spacial Aptitude": 0,
      "Abstract Reasoning": 0,
      "Perceptual Aptitude": 0
    };

    questions.forEach((question, index) => {
      const category = question.category; // Assuming each question has a 'category' field
      if (selections[index] === question.correctAnswerIndex) {
        correctCount[category] += 1;
      }
    });

    // Divide the correct answers by 1.5 as requested
    const normalizedCorrectCount = {};
    Object.keys(correctCount).forEach((category) => {
      normalizedCorrectCount[category] = correctCount[category] / 1.5;
    });
    const token = localStorage.getItem('token'); 

    // Send normalized correct count to backend
    try {
      const response = await fetch('http://localhost:5000/api/results/aptitude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(normalizedCorrectCount),
      });

      if (response.ok) {
        console.log("Results submitted successfully:", normalizedCorrectCount);
        navigate("/results"); 
      } else {
        console.error("Error submitting results:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting results:", error);
    }
  };

  return (
    <div className='grid grid-col-1'>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-start mb-20">
          <p 
            className="flex items-center text-xl text-gray-600 rounded-md font-semibold py-2 mb-4 hover:text-black cursor-pointer" 
            onClick={handleBack} 
          >
            <IoMdArrowRoundBack className="mr-2" />
            Back
          </p>

          {questions.length > 0 && (
            <p className="text-4xl font-semibold text-center text-gray-800 mb-4">
              {questions[currentIndex].question}
            </p>
          )}

          <div className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-4 mb-4">
              {questions[currentIndex]?.options?.map((option, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 flex items-center justify-center border border-gray-400 rounded-md cursor-pointer ${selections[currentIndex] === index ? 'bg-rust text-white' : 'bg-white'} hover:shadow-md`}
                    onClick={() => handleSelection(index)}
                  >
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={handleNext} 
            className="mt-20 border border-rust bg-rust text-white rounded-md px-4 py-2"
            disabled={currentIndex >= questions.length - 1 || selections[currentIndex] === null} // Disable if no selection
          >
            Next
            <IoMdArrowRoundForward className="ml-2" />
          </button>

          {currentIndex === questions.length - 1 && (
            <button 
              onClick={handleSubmit} 
              className="mt-4 border border-green-500 bg-green-500 text-white rounded-md px-4 py-2"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
