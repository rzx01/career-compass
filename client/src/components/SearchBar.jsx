import React from 'react';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = ({ onChange }) => {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Search by Job"
        className="w-full p-2 pl-10 border border-gray-400 rounded-lg shadow-sm hover:border-moss focus:outline-none focus:ring-2 focus:ring-moss dark:text-gray-700"
        onChange={onChange} 
      />
      <IoIosSearch
        className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
      />
    </div>
  );
};

export default SearchBar;
