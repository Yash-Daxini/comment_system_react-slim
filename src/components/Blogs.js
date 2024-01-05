import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://comment-system-backend.onrender.com/Routes/post")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to connect",
          showConfirmButton: true,
        });
      });
  }, []);

  let blogsInHtml = blogs.map((blog) => {
    return (
      <div className="text-center post border border-none my-5 text-white">
        <Blog blogObj={blog} />
      </div>
    );
  });

  return (
    <>
      {isLoading ? (
        <>
          <div className="container d-flex justify-content-center align-items-center flex-column placeholder-glow w-100">
            <span className="placeholder col-1 my-5"></span>
            <div className="placeholder-glow card post border border-0 my-5 text-white w-100">
              <div className="card-header d-flex justify-content-between">
                <span className="placeholder col-1"></span>
                <span className="placeholder col-1 h-50"></span>
              </div>
              <div className="text-center card-body">
                <span className="placeholder col-4 h-50"></span>
                <br></br>
                <span className="placeholder col-3 h-50 my-3"></span>
              </div>
              <div className="text-center my-3">
                <span className="placeholder col-2 h-50"></span>
              </div>
              <div className="d-flex justify-content-end me-2 align-items-center">
                <div class="placeholder-glow form-floating mb-3 w-50 mx-5">
                  <span className="placeholder col-12 ms-3"></span>
                </div>
                <div className="placeholder-glow w-25">
                  <span className="placeholder col-2"></span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-md d-flex justify-content-center align-items-center">
            <button
              className="btn btn-outline-info"
              onClick={() => {
                if (sessionStorage.getItem("user") === null) navigate("/login");
                else navigate("/addPost");
              }}
            >
              Add Post
            </button>
          </div>
          <div className="my-5 container">{blogsInHtml}</div>
        </>
      )}
    </>
  );
};

export default Blogs;
