import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader"; // Import the Loader component
import Error from "../components/Error";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      setLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Invalid email or password");
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message={error} />}
          <div className="bs">
            <h2>Login</h2>
            <form onSubmit={login}>
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
              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
