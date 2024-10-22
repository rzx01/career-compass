import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import {useNavigate} from "react-router-dom";
const OceanTest = () => {
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState([]); 
  const navigate =useNavigate();
  useEffect(() => {
    const fetchQuestionsAndChoices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions/ocean');
        const data = await response.json();
        setQuestions(data.questions);
        
        const sortedChoices = data.choices.sort((a, b) => a.score - b.score);
        setChoices(sortedChoices);
        
        // Initialize selections with the same length as questions
        setSelections(Array(data.questions.length).fill(null));
      } catch (error) {
        console.error("Error fetching questions and choices:", error);
      }
    };

    fetchQuestionsAndChoices();
  }, []);

  const handleBoxClick = (choice) => {
    const newSelection = {
      domain: questions[currentIndex].domain, // Use domain from the current question
      keyed: questions[currentIndex].keyed,   // Use keyed from the current question
      score: choice.score,                    // Use score from the selected choice
    };
    
    setSelections((prevSelections) => {
      const updatedSelections = [...prevSelections];
      updatedSelections[currentIndex] = newSelection; // Update the current index
      return updatedSelections;
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

  const handleSubmit =async () => {
    const oceanScores = {
      O: 0, // Openness
      C: 0, // Conscientiousness
      E: 0, // Extraversion
      A: 0, // Agreeableness
      N: 0, // Neuroticism
    };

    selections.forEach((selection) => {
      if (selection) {
        const adjustment = selection.keyed === "minus" ? -selection.score : selection.score;
        oceanScores[selection.domain] += adjustment;
      }
    });

    const finalScores = {
      O: (oceanScores.O + 18) / 4.8,
      C: (oceanScores.C + 18) / 4.8,
      E: (oceanScores.E + 18) / 4.8,
      A: (oceanScores.A + 18) / 4.8,
      N: (oceanScores.N + 18) / 4.8,
    };

    console.log("Final selections:", selections);
    // console.log("Calculated OCEAN scores:", finalScores);
    const token = localStorage.getItem('token'); 

  try {
    const response = await fetch('http://localhost:5000/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ finalScores }), 
    });
    console.log(finalScores)
    if (!response.ok) {
      throw new Error('Failed to submit results');
    }

    const resultData = await response.json();
    console.log('Server response:', resultData);
    navigate("/results")
  } catch (error) {
    console.error('Error submitting scores:', error);
  }
  };

  // Calculate progress percentage
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className='grid grid-col-1'>
      {/* Progress Bar */}
      <div style={{ height: '10px', background: '#f3f4f6' }}>
        <div 
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#fca311', 
            transition: 'width 0.3s ease-in-out'
          }} 
        />
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        {/* back btn */}
        <div className="flex flex-col items-start mb-20">
          <p 
            className="flex items-center text-xl text-gray-600 dark:text-gray-300 rounded-md font-semibold py-2 mb-4 hover:text-black dark:hover:text-white cursor-pointer" 
            onClick={handleBack} 
          >
            <IoMdArrowRoundBack className="mr-2" />
            Back
          </p>

          {/* question */}
          {questions.length > 0 && (
            <p className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">
              {questions[currentIndex].text}
            </p>
          )}

          {/* Choice */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-4 mb-4">
              {choices.map((choice, index) => {
                const isSelected = selections[currentIndex]?.score === choice.score;
                return (
                  <div key={choice._id} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 flex items-center justify-center border border-gray-400 dark:border-gray-600 rounded-md cursor-pointer ${isSelected ? 'bg-rust text-white border-rust dark:bg-red-600' : 'bg-white dark:bg-gray-800'} hover:shadow-md hover:shadow-black/10 dark:hover:shadow-gray-700`}
                      onClick={() => handleBoxClick(choice)}
                    >
                      {choice.score}
                    </div>
                    {(index === 0 || index === 2 || index === 4) && (
                      <span className="text-center text-gray-700 dark:text-gray-300 mt-1">{choice.text}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <button 
            onClick={handleNext} 
            className="flex mt-20 text-lg items-center border border-rust bg-rust text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-black/10 dark:border-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            disabled={currentIndex >= questions.length - 1 || !selections[currentIndex]} // Disable if no selection
          >
            Next
            <IoMdArrowRoundForward className="ml-2" />
          </button>

          {/* Submit button */}
          {currentIndex === questions.length - 1 && (
            <button 
              onClick={handleSubmit} 
              className="flex mt-4 text-lg items-center border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-black/10"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OceanTest;
