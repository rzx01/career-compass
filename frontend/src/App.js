import "./App.css";
import CareerExplore from "./pages/careerExplore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page1 from "./pages/Page1";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/explore" element={<CareerExplore />} />
      <Route path="/" element={<Page1 />} />
      </Routes>
    </Router>
  );
}

export default App;
