// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Info from "./Info";
import Survey from "./Survey";

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Survey</Link>
        <br />
        <Link to="/info">Info</Link>
        <hr />

        <Routes>
          <Route exact path="/" element={<Survey />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
