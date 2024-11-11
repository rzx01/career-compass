import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate(); 
  const handleProfileClick = () => {
    navigate(`/profile/`);
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={handleProfileClick}>
      <FaUserCircle className="text-3xl text-gray-900 dark:text-gray-100" />
      <span className="max-sm:hidden md:text-2xl text-3xl text-gray-900 dark:text-gray-100">Profile</span>
    </div>
  );
};

export default Profile;
