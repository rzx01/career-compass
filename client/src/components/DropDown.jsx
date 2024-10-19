import React, { useState } from 'react';

const DropDown = ({ onSelect, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        onSelect(option); 
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="border-rust bg-rust text-white rounded-md px-4 py-2 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:border-rust hover:shadow-md hover:shadow-black/10"
            >
                Work Type
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
