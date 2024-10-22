import React from 'react';
import { Link } from 'react-router-dom';
import TitleComponent from '../../components/TitleComponent';

const Dashboard = () => {
  const titleArray = [
    { title: 'Aptitude Assessment', description: 'Track your Reasoning Abilities', border_color: 'blue-400', link: '/aptitude' },
    { title: 'Personality Assessment', description: 'Get insights into yourself.', border_color: 'green-400', link: '/personality' },
    { title: 'Job Opportunities', description: 'Explore various job options.', border_color: 'red-400', link: '/jobs' },
    { title: 'Career Paths', description: 'Find curated learning paths.', border_color: 'purple-400', link: '/career' }
  ];

  return (
    <div className=" lg:p-32  md:p-20 max-md:pb-24 p-4 h-screen grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8  ">
      {titleArray.map((item, index) => (
        <Link to={item.link} key={index} > 
        <TitleComponent 
          title={item.title}
          description={item.description}
          border_color={item.border_color}
        />
      </Link>
      ))}
    </div>
  );
}

export default Dashboard;
