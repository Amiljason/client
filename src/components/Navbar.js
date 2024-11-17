import React, { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-brand btn"
          onClick={() => (window.location.href = "/")}
        >
          PITSTOP
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i class="fa-solid fa-bars" style={{ color: "white" }} />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-5">
            {user ? (
              <>
                <div className="dropdown mr-5">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fa fa-user"></i>
                    {user.name}
                  </button>
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item btn-link"
                      href="/profile"
                      onClick={() => (window.location.href = "/profile")}
                    >
                      Profile
                    </button>
                    <button
                      className="dropdown-item btn-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <button
                    className="nav-link btn"
                    onClick={() => (window.location.href = "/register")}
                  >
                    Register
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
