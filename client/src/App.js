import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/global/Navbar.jsx";
import Dashboard from "./pages/global/Dashboard.jsx";
import CareerExplore from "./pages/global/CareerExplore.jsx";
import OceanTest from "./pages/global/OceanTest.jsx";
import AptitudeTest from "./pages/global/AptitudeTest.jsx";
import JobPage from "./pages/global/JobPage.jsx";
import UserProfile from "./pages/global/UserProfile.jsx";
import Authenticate from "./pages/global/Authenticate.jsx";
import Results from "./pages/global/Results.jsx";
import CareerMap from "./pages/global/CareerMap.jsx";
import ProtectedRoute from "./components/global/ProtectedRoute.jsx"; 

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
          <Navbar />
          <div className="pt-20 grow px-4 sm:px-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/career" element={<CareerExplore />} />
              <Route path="/jobs/:job_id" element={<JobPage />} />
              <Route path="/authenticate" element={<Authenticate />} />
              
              {/* Protected routes */}
              <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
              <Route path="/personality" element={<ProtectedRoute element={<OceanTest />} />} />
              <Route path="/aptitude" element={<ProtectedRoute element={<AptitudeTest />} />} />
              <Route path="/results" element={<ProtectedRoute element={<Results />} />} />
              <Route path="/careermap" element={<ProtectedRoute element={<CareerMap />} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
