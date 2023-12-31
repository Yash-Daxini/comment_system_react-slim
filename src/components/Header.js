import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            Comment System
          </Link>
          <Link className="nav-link text-white ms-5" to="/Blogs">
            Blogs
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
          <div className="">
            <button
              className="btn btn-outline-light"
              onClick={(e) => {
                if (sessionStorage.getItem("user") === null) navigate("/login");
                else {
                  sessionStorage.clear();
                  e.target.innerText = "login";
                }
              }}
            >
              {sessionStorage.getItem("user") !== null ? "logout" : "login"}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
