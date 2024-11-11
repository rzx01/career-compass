import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AptitudeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState([]);
  const navigate = useNavigate();

  const progress = (currentIndex / questions.length) * 100;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/questions/aptitude"
        );
        const data = await response.json();

        if (data) {
          setQuestions(data.shuffledQuestions);
          setSelections(Array(data.length).fill(null));
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
      newSelections[currentIndex] = index;
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
      "Spatial Aptitude": 0,
      "Abstract Reasoning": 0,
      "Perceptual Aptitude": 0,
    };

    questions.forEach((question, index) => {
      const category = question.category;
      if (selections[index] === question.correctAnswerIndex) {
        correctCount[category] += 1;
      }
    });

    const normalizedCorrectCount = {};
    Object.keys(correctCount).forEach((category) => {
      normalizedCorrectCount[category] = correctCount[category] / 1.5;
    });
    const token = localStorage.getItem("token");
    console.log(normalizedCorrectCount);
    try {
      const response = await fetch(
        "http://localhost:5000/api/results/aptitude",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(normalizedCorrectCount),
        }
      );

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
    <div className="grid grid-col-1">
      <div className="w-full h-[10px] bg-[#f3f4f6]">
        <div
          className="h-full bg-[#fca311] transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-start mb-20">
          <p
            className="flex items-center text-xl text-gray-600 dark:text-gray-300 rounded-md font-semibold py-2 mb-4 hover:text-black dark:hover:text-white cursor-pointer"
            onClick={handleBack}
          >
            <IoMdArrowRoundBack className="mr-2" />
            Back
          </p>

          {questions.length > 0 && (
            <p className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-4">
              {questions[currentIndex].question}
            </p>
          )}


          <div className=" max-md:m-auto  mt-8 flex flex-col items-center">
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              {questions[currentIndex]?.options?.map((option, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-fit min-w-16 min-h-12 h-fit p-2 flex items-center justify-center border border-gray-400 rounded-md cursor-pointer ${
                      selections[currentIndex] === index
                        ? "bg-rust text-white border-rust dark:bg-red-600"
                        : "bg-white dark:bg-gray-800"
                    } hover:shadow-md hover:shadow-black/10 dark:hover:shadow-gray-700`}
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
            className="flex mt-4 md:mt-20 text-lg items-center border border-rust bg-rust text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-black/10 dark:border-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            disabled={
              currentIndex >= questions.length - 1 ||
              selections[currentIndex] === null
            }
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
