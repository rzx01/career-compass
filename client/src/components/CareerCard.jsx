import React from 'react';
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
  return <RandomIcon className="text-gray-700 w-5 h-5 dark:text-gray-100" />; 
};

const CareerCard = ({ job_title, salary_range, experience, work_type }) => {
  return (
    <div className="m-3 w-full h-auto bg-white border border-gray-300 shadow-md rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:bg-transparent dark:hover:shadow-sm dark:hover:shadow-white">
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 gap-4 h-full items-center p-4 mr-2">

        <div className="flex justify-center col-span-1 max-md:hidden">
          {getRandomIcon()}
        </div>

        <div className="col-span-2 sm:col-span-2 md:col-span-2">
          <div className="text-base md:text-lg font-semibold dark:text-gray-100 text-gray-800">
            {job_title}
          </div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Work Type: {work_type}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-2 md:col-span-2">
          <div className="text-sm md:text-md font-normal text-gray-500 dark:text-gray-400">
            Salary:
          </div>
          <div className="text-xs md:text-base">{salary_range}</div>
        </div>

        <div className="col-span-2 sm:col-span-2 md:col-span-2">
          <div className="text-sm md:text-md font-normal text-gray-500 dark:text-gray-400">
            Experience:
          </div>
          <div className="text-xs md:text-base">{experience}</div>
        </div>

        <div className="flex justify-end col-span-1 max-md:hidden">
          <IoIosArrowForward className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
        </div>

      </div>
    </div>
  );
};

export default CareerCard;
