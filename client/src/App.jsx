import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/components/Home";  // Home bileşeni

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
