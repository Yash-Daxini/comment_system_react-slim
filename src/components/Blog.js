import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Comment from "./Comment";
import moment from "moment";

const Blog = ({ blogObj }) => {
  const [commentReply, setCommentReply] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch("https://comment-system-backend.onrender.com/Routes/comment")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed to connect",
          showConfirmButton: true,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [commentReply, navigate]);

  let commentsByPost = comments
    .filter(
      (comment) =>
        comment.postId === blogObj.postId && comment.parentComment_Id === null
    )
    .map((comment) => {
      return (
        <>
          <Comment commentObj={comment} />
        </>
      );
    });
  return (
    <>
      {isLoading ? (
        <div>
          <div className="placeholder-glow card post border border-0 my-5 text-white">
            <div className="card-header d-flex justify-content-between">
              <span className="placeholder col-1 h-50"></span>
            </div>
            <div className="card-body">
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
          <hr></hr>
          <div className="placeholder-glow text-center my-3">
            <span className="placeholder col-2 h-50"></span>
          </div>
          <div className="post placeholder-glow card border border-0 my-5 text-white">
            <div className="placeholder-glow card-header d-flex justify-content-between">
              <span className="placeholder col-1 h-50"></span>
            </div>
            <div className="card-body placeholder-glow">
              <span className="placeholder col-4 h-50"></span>
              <br></br>
              <span className="placeholder col-3 h-50 my-3"></span>
            </div>
            <div className="text-center my-3 ">
              <span className="placeholder col-2 h-50"></span>
            </div>
            <div className="d-flex justify-content-end me-2 align-items-center placeholder-glow">
              <div class="placeholder-glow form-floating mb-3 w-50 mx-5">
                <span className="placeholder col-12 ms-3"></span>
              </div>
              <div className="placeholder-glow w-25">
                <span className="placeholder col-2"></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="post card border border-0 my-5 text-white">
            <div className="card-header d-flex justify-content-between">
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  if (sessionStorage.getItem("user") === null)
                    navigate("/login");
                  else {
                    fetch(
                      `https://comment-system-backend.onrender.com/Routes/post/${blogObj.postId}`,
                      {
                        method: "DELETE",
                      }
                    )
                      .then((res) => {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Post Deleted successfully !",
                          showConfirmButton: false,
                          timer: 2500,
                        });
                        navigate("/");
                        setTimeout(() => {
                          navigate("/blogs");
                        }, 1000);
                      })
                      .catch(() => {
                        Swal.fire({
                          icon: "error",
                          title: "Failed to connect",
                          showConfirmButton: true,
                        });
                      });
                  }
                }}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{blogObj.description}</p>
                <footer className="blockquote-footer">
                  {blogObj.user_Name}
                </footer>
              </blockquote>
            </div>
            <div className="text-center my-3">
              <p>Add Comment</p>
            </div>
            <div className="d-flex justify-content-end me-2 align-items-center">
              <div class="form-floating mb-3 w-50 mx-5">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  value={commentReply}
                  onChange={(e) => {
                    setCommentReply(e.target.value);
                  }}
                />
                <label for="floatingInput">Comment</label>
              </div>
              <div>
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    if (sessionStorage.getItem("user") === null)
                      navigate("/login");
                    else {
                      fetch(
                        "https://comment-system-backend.onrender.com/Routes/comment",
                        {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                          },
                          body: JSON.stringify({
                            comment_Description: commentReply,
                            userId: sessionStorage.getItem("userId"),
                            upvotes: 0,
                            downvotes: 0,
                            postId: blogObj.postId,
                            parentCommentId: null,
                            creation_Date:
                              moment().format("YYYY-MM-DD h:mm:ss"),
                            modification_Date:
                              moment().format("YYYY-MM-DD h:mm:ss"),
                          }),
                        }
                      )
                        .then((res) => {
                          setCommentReply("");
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Comment Added successfully !",
                            showConfirmButton: false,
                            timer: 2500,
                          });
                        })
                        .catch((err) => {
                          Swal.fire({
                            icon: "error",
                            title: "Failed to connect",
                            showConfirmButton: true,
                          });
                        });
                    }
                  }}
                >
                  send
                </button>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="text-center my-3">
            <p>Comments</p>
          </div>
          {commentsByPost}
        </div>
      )}
    </>
  );
};

export default Blog;
