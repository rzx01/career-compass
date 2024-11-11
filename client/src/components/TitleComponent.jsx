import React from 'react';

const TitleComponent = ({ title, description, border_color }) => {

  const hoverBgColor = {
    'blue-400': 'hover:bg-royalblue',
    'green-400': 'hover:bg-moss',
    'red-400': 'hover:bg-rust',
    'purple-400': 'hover:bg-purple-400'
  }[border_color] || '';

  const borderColorClass = {
    'blue-400': 'border-royalblue',
    'green-400': 'border-moss',
    'red-400': 'border-rust',
    'purple-400': 'border-purple-400'
  }[border_color] || '';

  const darkModeHoverBgColor = {
    'blue-400': 'dark:hover:bg-royalblue',
    'green-400': 'dark:hover:bg-moss',
    'red-400': 'dark:hover:bg-rust',
    'purple-400': 'dark:hover:bg-purple-500'
  }[border_color] || '';

  return (
    <div 
      className={`border-2 md:min-h-[200px] h-full flex justify-center items-center flex-col p-4 rounded-2xl text-center 
      ${borderColorClass} ${hoverBgColor} ${darkModeHoverBgColor} transition-colors duration-300 
      bg-white dark:bg-gray-800`} 
    >
      <h2 className="text-4xl  font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      <p className="text-gray-700 text-2xl dark:text-gray-300 mt-2">{description}</p>
    </div>
  );
}

export default TitleComponent;
