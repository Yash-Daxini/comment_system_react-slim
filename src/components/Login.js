import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const [users, setusers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://comment-system-backend.onrender.com/Routes/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setusers(data);
      })
      .catch(() => {
        Swal.fire({
          
          icon: "error",
          title: "Failed to connect",
          showConfirmButton: true,
        });
      });
  }, []);

  return (
    <div>
      <div className="my-5 d-flex justify-content-center align-items-center flex-column">
        <p className="fs-3 mb-5">Login Form</p>
        <div className="form-floating mb-3 w-50">
          <input
            type="text"
            className="form-control"
            id="floatingInput1"
            placeholder="Name"
            value={loginDetails.user_Name}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, user_Name: e.target.value });
            }}
          />
          <label for="floatingInput1">User Name</label>
        </div>
        <div className="form-floating mb-3 w-50">
          <input
            type="password"
            className="form-control"
            id="floatingPassword1"
            placeholder="Password"
            value={loginDetails.password}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
          />
          <label for="floatingPassword1">Password</label>
        </div>
        <div className="my-3">
          <button
            className="btn btn-outline-light fw-bold"
            onClick={(e) => {
              users.forEach((user) => {
                if (
                  user.user_Name === loginDetails.user_Name &&
                  user.password === loginDetails.password
                ) {
                  navigate("/");
                  sessionStorage.setItem("userId", user.userId);
                  sessionStorage.setItem("user", user.user_Name);
                  // sessionStorage.setItem("password", user.password);
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully !",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                }
              });
            }}
          >
            Login
          </button>
        </div>
        <div>
          <Link to="/signup" className="text-white">
            Not have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
