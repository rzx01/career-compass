import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import DarkModeToggle from "./DarkModeToggle";
import { BiLogOut } from "react-icons/bi";
import logo_light from "../../assets/images/cc_icon_dark.jpg";
import logo_dark from "../../assets/images/cc_icon_light.jpg";
import { darkModeState } from "../../context/atoms";
import { useRecoilState } from "recoil";

const Navbar = () => {
  const [isDarkTheme] = useRecoilState(darkModeState);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // LogOut handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex z-40 fixed max-h-20 top-0 w-full px-20 items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      {/* Logo and Home Link */}
      <div className="flex h-full items-center justify-center md:space-x-12 overflow-hidden">
        <img className="max-h-[60px]" src={isDarkTheme ? logo_dark : logo_light} alt="icon" />
        <Link to="/">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex-row">
            Career Compass
          </h1>
        </Link>
      </div>

      {/* Profile, Dark Mode Toggle, and LogOut Icon */}
      <div className="flex items-center gap-4">
        <Link to="/profile/">
          <Profile />
        </Link>
        <DarkModeToggle />
        {token && (
          <BiLogOut
            onClick={handleLogout}
            className="text-3xl text-gray-900 dark:text-gray-100 cursor-pointer hover:text-red-500 dark:hover:text-red-400"
            title="Log Out"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
