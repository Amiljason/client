import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader"; // Import the Loader component
import Error from "../components/Error"; // Import the Error component
import Success from "../components/Success"; // Import the Success component

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      setSuccess("Registration successful");
      setError("");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("User already exists");
      setSuccess(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message={error} />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration Successful" />}
          <div className="bs">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                required
                placeholder="Enter Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                required
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="Confirm Password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary mt-3">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
