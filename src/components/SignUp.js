import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();
  const [singupDetails, setSingupDetails] = useState({});
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
            value={singupDetails.user_Name}
            onChange={(e) => {
              setSingupDetails({ ...singupDetails, user_Name: e.target.value });
            }}
          />
          <label for="floatingInput1">User Name</label>
        </div>
        <div className="form-floating mb-3 w-50">
          <input
            type="email"
            className="form-control"
            id="floatingInput1"
            placeholder="email"
            value={singupDetails.user_Email}
            onChange={(e) => {
              setSingupDetails({
                ...singupDetails,
                user_Email: e.target.value,
              });
            }}
          />
          <label for="floatingInput1">User Email</label>
        </div>
        <div className="form-floating mb-3 w-50">
          <input
            type="password"
            className="form-control"
            id="floatingPassword1"
            placeholder="Password"
            value={singupDetails.password}
            onChange={(e) => {
              setSingupDetails({ ...singupDetails, password: e.target.value });
            }}
          />
          <label for="floatingPassword1">Password</label>
        </div>
        <div className="my-3">
          <button
            className="btn btn-outline-light fw-bold"
            onClick={(e) => {
              fetch("https://comment-system-backend.onrender.com/Routes/user", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json",
                },
                body: JSON.stringify(singupDetails),
              }).then((res) => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Registerd Successfully !",
                  showConfirmButton: false,
                  timer: 2500,
                }).catch(() => {
                  Swal.fire({
                    
                    icon: "error",
                    title: "Failed to connect",
                    showConfirmButton: true,
                  });
                });
                setSingupDetails({});
                navigate("/");
              });
            }}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
