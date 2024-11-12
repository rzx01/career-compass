import React from 'react';
import { useRecoilState } from 'recoil';
import { darkModeState } from '../../context/atoms.js';
import { MdDarkMode, MdLightMode } from 'react-icons/md'; 

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button 
      onClick={toggleDarkMode} 
      className="p-2 ml-4 flex hover:bg-gray-300 hover:dark:bg-gray-700 items-center  bg-gray-200 dark:bg-gray-600 rounded"
    >
      {isDarkMode ? (
        <MdLightMode className="text-2xl" />
      ) : (
        <MdDarkMode className="text-2xl" />
      )}

    </button>
  );
};

export default DarkModeToggle;
