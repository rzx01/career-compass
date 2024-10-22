import React, { useState } from 'react';

const DropDown = ({ onSelect, options, label, buttonClass }) => {
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
                className={buttonClass} 
            >
                {label}
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer dark:text-gray-900"
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