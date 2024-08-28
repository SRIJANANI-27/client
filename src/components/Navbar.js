import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ size }) {
  const navigate = useNavigate();

  // Retrieve user info from local storage
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userName = user ? user.name : "";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
            FOODY
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {userName ? (
                <>
                  {/* <li className="nav-item">
                    <span className="nav-link">Hello, {userName}</span>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li> */}
                  <div class="dropdown mt-1">
                    <a
                      class=" dropdown-toggle nav-link"
                      type="a"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userName}
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#">
                          Orders
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#" onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    href="#"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </a>
                </li>
              )}
<li className="nav-item position-relative">
  <a
    className="nav-link d-flex align-items-center"
    href="#"
    onClick={() => navigate("/cart")}
  >
    <FaShoppingCart className="fs-3 me-2" />
    <span className="badge rounded-pill bg-danger position-absolute translate-middle badge-notification">
      {size}
    </span>
  </a>
</li>


            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
