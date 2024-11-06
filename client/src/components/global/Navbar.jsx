import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import DarkModeToggle from "./DarkModeToggle";
// import logo_light from "./images/careercompass.jpg";
// import logo_dark from "./images/careercompass_inverted_colors.jpg";

const Navbar = () => {
  return (
    <div className="flex z-40 fixed max-h-20 top-0 w-full px-20 items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <Link to="/">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex-row">
          Career Compass
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/profile/">
          <Profile />
        </Link>
        <DarkModeToggle />
      </div>
    </div>

  );
};

export default Navbar;
