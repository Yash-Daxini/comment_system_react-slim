import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://comment-system-backend.onrender.com/Routes/post")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  let blogsInHtml = blogs.map((blog) => {
    return (
      <div className="card bg-dark border border-none my-5 text-white">
        <Blog blogObj={blog} />
      </div>
    );
  });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-outline-info" onClick={()=>{
          if( sessionStorage.getItem("user") === null ) navigate("/login");
          else navigate("/addPost");
        }}>Add Post</button>
      </div>
      <div className="container my-5">{blogsInHtml}</div>
    </>
  );
};

export default Blogs;
