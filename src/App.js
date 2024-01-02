import "./App.css";
import React from "react";
// import Login2 from "./Components/Login2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./Components/LoginForm";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
