import React from 'react';
import { useLocation } from 'react-router-dom'; 
import Profile from './Profile';
import DarkModeToggle from './DarkModeToggle';
// import logo_light from "./images/careercompass.jpg";
// import logo_dark from "./images/careercompass_inverted_colors.jpg";

const Navbar = () => {
  const location = useLocation(); // get the current url

  // Check if the current path includes '/profile/'
  const isUserProfilePage = location.pathname.includes('/profile/');

  return (

    <div className="flex fixed max-h-20 top-0 w-full px-20 items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 z-40">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex-row">Career Compass</h1>

      <div className="flex items-center gap-4">
        {/* conditionally render the Profile component only if not on the UserProfile page */}
        {!isUserProfilePage && <Profile />}
        <DarkModeToggle />

      </div>
    </div>

  );
}

export default Navbar;
