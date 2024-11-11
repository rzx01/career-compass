import React from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { IoIosArrowForward } from "react-icons/io";
import { 
  HiArchive, HiBriefcase, HiCurrencyDollar, HiOutlineClock, HiOutlineLightBulb, HiOutlineClipboardList } from "react-icons/hi";
import { FaBuilding, FaClipboardCheck, FaLaptopCode, FaTools, FaChartLine, FaMoneyBillWave, FaUserTie, FaHardHat, FaUserShield, FaHandsHelping } from "react-icons/fa";
import { MdWorkOutline, MdOutlineEngineering, MdBusinessCenter, MdOutlineDesignServices, MdOutlineSupportAgent, MdOutlineScience } from "react-icons/md";
import { AiOutlineFileSearch, AiOutlineFundProjectionScreen, AiOutlineBarChart, AiOutlineBank, AiOutlineCustomerService, AiOutlineSolution } from "react-icons/ai";
import { RiTeamLine, RiMoneyDollarCircleLine, RiStackLine, RiOrganizationChart, RiSearchLine } from "react-icons/ri";
import { BsGraphUp, BsPersonWorkspace, BsPersonLinesFill, BsClipboardData, BsFillPeopleFill } from "react-icons/bs";
import { GiMoneyStack, GiNetworkBars, GiScales, GiMechanicGarage, GiNuclearPlant, GiHealthNormal } from "react-icons/gi";
import { BiBrain, BiPieChartAlt, BiTimeFive, BiBuildingHouse } from "react-icons/bi";
import { SiNotion, SiPowerbi, SiAdobe, SiCisco } from "react-icons/si";
import { GrProjects, GrWorkshop, GrAnalytics, GrPlan } from "react-icons/gr";
import { FaMoneyCheckAlt } from "react-icons/fa";

const icons = [
  HiArchive, HiBriefcase, HiCurrencyDollar, HiOutlineClock, HiOutlineLightBulb, HiOutlineClipboardList, FaBuilding, FaClipboardCheck, FaLaptopCode, FaTools, FaChartLine, FaMoneyBillWave, FaUserTie, FaHardHat, FaUserShield, FaHandsHelping, MdWorkOutline, MdOutlineEngineering, MdBusinessCenter, MdOutlineDesignServices, MdOutlineSupportAgent, MdOutlineScience, AiOutlineFileSearch, AiOutlineFundProjectionScreen, AiOutlineBarChart, AiOutlineBank, AiOutlineCustomerService, AiOutlineSolution, RiTeamLine, RiMoneyDollarCircleLine, RiStackLine, RiOrganizationChart, RiSearchLine, BsGraphUp, BsPersonWorkspace, BsPersonLinesFill, BsClipboardData, BsFillPeopleFill, GiMoneyStack, GiNetworkBars, GiScales, GiMechanicGarage, GiNuclearPlant, GiHealthNormal, BiBrain, BiPieChartAlt, BiTimeFive, BiBuildingHouse, SiNotion, SiPowerbi, SiAdobe, SiCisco, GrProjects, GrWorkshop, GrAnalytics, GrPlan
];

const getRandomIcon = () => {
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
  return <RandomIcon className="text-gray-700 w-6 h-6 dark:text-gray-100" />;
};

const CareerMapCard = ({ job_title }) => {
  return (
    <div className="m-3 w-full h-16 bg-white border hover:cursor-pointer border-gray-300 shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:bg-transparent dark:hover:shadow-sm dark:border-gray-300 dark:hover:shadow-white text-center">
      <div className="grid grid-cols-3 items-right p-4 dark:gray-100">
        <div className="flex justify-center">
          {getRandomIcon()}
        </div>
        <div className="flex justify-center items-center text-base md:text-sm font-semibold dark:text-gray-100 text-gray-800 text-center">
          {job_title}
        </div>
        <div className="flex justify-center">
          <IoMdInformationCircleOutline className="text-gray-500 w-6 h-6 hover:text-royalblue cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CareerMapCard;