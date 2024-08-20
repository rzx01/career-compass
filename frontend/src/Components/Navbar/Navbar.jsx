import React, { useEffect } from "react";
import "./Navbar.css";
import logo_light from "../../assets/assets/careercompass.jpg";
import logo_dark from "../../assets/assets/careercompass_inverted_colors.jpg";
import search_icon_light from "../../assets/assets/search-w.png";
import search_icon_dark from "../../assets/assets/search-b.png";
import toggle_light from "../../assets/assets/night.png";
import toggle_dark from "../../assets/assets/day.png";

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="navbar">
      <img
        src={theme === "light" ? logo_light : logo_dark}
        alt="  "
        className="logo"
      />
      <ul>
        <li>Home</li>
        <li>Dashboard</li>
        <li>Profile</li>
        <li>Feedback</li>
        <li>Login</li>
      </ul>
      <div className="search-box">
        <input type="text" placeholder="Search..." />{" "}
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark}
          alt=""
        />
      </div>
      <img
        onClick={toggle_mode}
        src={theme === "light" ? toggle_light : toggle_dark}
        alt=""
        className="toggle-icon"
      />{" "}
    </div>
  );
};
export default Navbar;
