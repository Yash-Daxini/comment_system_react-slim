import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Comment from "./Comment";

const Blog = ({ blogObj }) => {
  const [commentReply, setCommentReply] = useState("");
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://comment-system-backend.onrender.com/Routes/comment")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
      });
    fetch("https://comment-system-backend.onrender.com/Routes/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, [commentReply, navigate]);

  const findNameOfUser = (givenId) => {
    let userName = "";
    users.forEach((user) => {
      if (user.userId === givenId) userName = user.user_Name;
    });
    return userName;
  };

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
    <div>
      <div className="card bg-dark border border-0 my-5 text-white">
        <div className="card-header d-flex justify-content-between">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              if (sessionStorage.getItem("user") === null) navigate("/login");
              else {
                fetch(
                  `https://comment-system-backend.onrender.com/Routes/post/${blogObj.postId}`,
                  {
                    method: "DELETE",
                  }
                ).then((res) => {
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
              {findNameOfUser(blogObj.userId)}
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
                if (sessionStorage.getItem("user") === null) navigate("/login");
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
                        creation_Date: new Date()
                          .toJSON()
                          .slice(0, 19)
                          .replace("T", " "),
                        modification_Date: new Date()
                          .toJSON()
                          .slice(0, 19)
                          .replace("T", " "),
                      }),
                    }
                  ).then((res) => {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Comment Deleted successfully !",
                      showConfirmButton: false,
                      timer: 2500,
                    });
                    setCommentReply("");
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
  );
};

export default Blog;
