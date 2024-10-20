import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/global/Navbar.jsx";
import Dashboard from "./pages/global/Dashboard.jsx";

import JobPage from "./pages/global/JobPage.jsx";

import UserProfile from "./pages/global/UserProfile.jsx";


function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
          <Navbar />
          <div className="pt-20 grow px-4 sm:px-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/jobs/:job_id" element={<JobPage />} />

              <Route path="/profile/:user_id" element={<UserProfile />} />

            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;


