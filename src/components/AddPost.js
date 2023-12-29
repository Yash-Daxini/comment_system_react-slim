import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddPost = () => {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1 className="my-5">Add post here</h1>
      <div className="form-floating mb-3 w-50">
        <textarea
          rows={15}
          className="form-control h-100"
          id="floatingPassword1"
          placeholder="Password"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <label for="floatingPassword1">Add description of Post</label>
      </div>
      <div>
        <button
          className="btn btn-outline-success"
          onClick={() => {
            fetch("https://comment-system-backend.onrender.com/Routes/post", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                description: description,
                userId: sessionStorage.getItem("userId"),
                creation_Date: new Date()
                  .toJSON()
                  .slice(0, 19)
                  .replace("T", " "),
                modification_Date: new Date()
                  .toJSON()
                  .slice(0, 19)
                  .replace("T", " "),
              }),
            }).then((res) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Post added Successfully !",
                showConfirmButton: false,
                timer: 2500,
              }).catch(() => {
                Swal.fire({
                  
                  icon: "error",
                  title: "Failed to connect",
                  showConfirmButton: true,
                });
              });
              navigate("/blogs");
            });
          }}
        >
          Add post
        </button>
      </div>
    </div>
  );
};

export default AddPost;
