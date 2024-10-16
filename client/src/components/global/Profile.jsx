import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; 

const Profile = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <FaUserCircle className="text-3xl text-gray-900 dark:text-gray-100" />
      <span className=" max-sm:hidden md:text-2xl text-3xl text-gray-900 dark:text-gray-100">Profile</span>
    </div>
  );
}

export default Profile;
