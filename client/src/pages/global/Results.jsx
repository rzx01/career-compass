import React, { useState } from 'react';
import ResultsDisplay from '../../components/ResultsDisplay'; // Import the ResultsDisplay component

const Results = () => {
    const [selectedOption, setSelectedOption] = useState('ocean');

    const handleSelection = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6">Career Assessment Results</h1>
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => handleSelection('ocean')}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedOption === 'ocean' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
                >
                    Personality
                </button>
                <button
                    onClick={() => handleSelection('aptitude')}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedOption === 'aptitude' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
                >
                    Aptitude
                </button>
                {/* <button
                    onClick={() => handleSelection('Both')}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${selectedOption === 'Both' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
                >
                    Both
                </button> */}
            </div>
            <div className="min-w-fit max-w-2xl bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <ResultsDisplay option={selectedOption} />
            </div>
        </div>
    );
};

export default Results;
