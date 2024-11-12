import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Handle click based on token presence
  const handleClick = () => {
    if (token) {
      navigate(`/profile`);
    } else {
      navigate(`/authenticate`);
    }
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <FaUserCircle
        className="text-3xl text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
      />
      <span
        className="max-sm:hidden md:text-2xl text-3xl text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
      >
        {token ? 'Profile' : 'Log In'}
      </span>
    </div>
  );
};

export default Profile;
