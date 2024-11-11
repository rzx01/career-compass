import React from "react";
import { Link } from "react-router-dom";
import TitleComponent from "../../components/TitleComponent";
import career_banner from "../../assets/images/career_compass_dark.jpg";
import career_banner_light from "../../assets/images/career_compass_light.jpg";
import {darkModeState} from "../../context/atoms.js";

import {useRecoilState } from "recoil";

const Dashboard = () => {
  const [isDarkTheme] = useRecoilState(darkModeState);
  console.log(isDarkTheme);
  const titleArray = [
    {
      title: "Aptitude Assessment",
      description: "Track your Reasoning Abilities",
      border_color: "blue-400",
      link: "/aptitude",
    },
    {
      title: "Personality Assessment",
      description: "Get insights into yourself.",
      border_color: "green-400",
      link: "/personality",
    },
    {
      title: "Job Opportunities",
      description: "Explore various job options.",
      border_color: "red-400",
      link: "/career",
    },
    {
      title: "Career Paths",
      description: "Find curated learning paths.",
      border_color: "purple-400",
      link: "/careermap",    
    },
  ];

  return (
    <div className="lg:px-32  md:px-20 max-md:pbx-24 p-4 h-screen">
      <div className="w-full h-36 mb-20 md:h-44 lg:h-52 overflow-hidden">
          <img
            src={isDarkTheme ? career_banner : career_banner_light} 
          alt="Career Banner"
            className="w-full h-full object-cover  duration-300 transition"
          />
        </div>
        
      <div className=" relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8  ">
        {titleArray.map((item, index) => (
          <Link to={item.link} key={index}>
            <TitleComponent
              title={item.title}
              description={item.description}
              border_color={item.border_color}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
