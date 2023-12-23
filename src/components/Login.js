import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const [users, setusers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://127.1.1.1:8000/Routes/user")
      .then((res) => res.json())
      .then((data) => setusers(data));
    //   console.warn(users);
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
            type="email"
            className="form-control"
            id="floatingInput2"
            placeholder="name@example.com"
            value={loginDetails.user_Email}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, user_Email: e.target.value });
            }}
          />
          <label for="floatingInput2">Email address</label>
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
              let arr = users.filter((user) => {
                return (
                    user.user_Name === loginDetails.name &&
                  user.user_Email === loginDetails.user_Email &&
                  user.password === loginDetails.password
                );
              });
              if (arr.length === 1) navigate("/");
              e.target.value = "logout";
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
