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
      }).catch((err)=>{
        Swal.fire({
          icon: "error",
          title: "Failed to connect",
          showConfirmButton: true
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
          <div className="container d-flex justify-content-center align-items-center flex-column placeholder-glow">
            <span className="placeholder col-1 my-5"></span>
            <div className="placeholder-glow d-flex justify-content-center align-items-start placeholder-glow flex-column w-75"><span className="placeholder col-1 my-5"></span></div>
            <div className="placeholder-glow d-flex justify-content-center align-items-end placeholder-glow flex-column w-100">
              <div className="placeholder col-8 my-3 h-25"></div>
              <div className="placeholder col-6 my-3 h-25"></div>
              <div className="placeholder col-4 my-3 h-25"></div>
              <div className="placeholder col-2 my-3 h-25"></div>
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
