//import { sanitizeFilter } from "mongoose";
import React from "react";
import { Link } from "react-router-dom";
function Landingscreen() {
  return (
    <div className="row landing justify-content-center">
      <div
        className="col-md-9 my-auto text-center"
        style={{ borderRight: "5px solid white" }}
      >
        <h3>PIT STOP</h3>
        <h4>Book your room now!</h4>

        <Link to="/login">
          <button className="btn landingbtn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
