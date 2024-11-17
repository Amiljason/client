import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen"; // Adjust the path as necessary
import Bookingscreen from "./screens/Bookingscreen";
import RegisterScreen from "./screens/RegisterScreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Landingscreen from "./screens/Landingscreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" exact element={<Homescreen />} />
          {/* Add other routes here */}
          <Route path="/home" element={<h1>Welcome to the Home Page</h1>} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            element={<Bookingscreen />}
          />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/profile" element={<Profilescreen />} />
          <Route path="/admin" element={<Adminscreen />} />
          <Route path="/" element={<Landingscreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
