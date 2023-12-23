import React, { useEffect, useState } from "react";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/Routes/post")
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
      <div className="container my-5">{blogsInHtml}</div>
    </>
  );
};

export default Blogs;
