import React, { useState, useEffect } from "react";
import Card from "../components/Mainpage/Card";
// import Compass from "../Components/Mainpage/Compass";
import Navbar from "../components/Navbar/Navbar";
import {Link} from "react-router-dom";

const CARD_POSITIONS = {
  "Personality Test": 0,
  "Aptitude Test": 90,
  "Job Explore": 180,
  "Career Roadmap": 270,
};

function Page1() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  const [compassRotation, setCompassRotation] = useState(0);
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
    document.body.className = theme;
  }, [theme]);
  const handleHover = (title) => {
    setCompassRotation(CARD_POSITIONS[title] || 0);
  };
  return (
    <div className="relative h-screen flex flex-col">
      {" "}
      <Navbar theme={theme} setTheme={setTheme} />{" "}
      <div className="flex flex-grow pt-16">
        <div className="flex flex-wrap w-full h-full">
          {" "}
          <div className="w-full md:w-1/2 h-1/2 p-4">
            {" "}
            <Card
              title="Personality Test"
              borderColor="border-[#8B9E83]"
              hoverColor="#8B9E83"
              onHover={handleHover}
            />
          </div>
          <div className="w-full md:w-1/2 h-1/2 p-4">
            {" "}
            <Card
              title="Aptitude Test"
              borderColor="border-[#C27D6C]"
              hoverColor="#C27D6C"
              onHover={handleHover}
            />
          </div>
          <div className="w-full md:w-1/2 h-1/2 p-4">
            {" "}
            <Card
              title="Job Explore"
              borderColor="border-[#D1C5C7]"
              hoverColor="#D1C5C7"
              onHover={handleHover}
            />
          </div>
          <div className="w-full md:w-1/2 h-1/2 p-4">
            <Link to="/explore">
              <Card
                title="Career Roadmap"
                borderColor="border-[#145ABC]"
                hoverColor="#145ABC"
                onHover={handleHover}
              />
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page1;
