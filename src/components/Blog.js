import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ blogObj }) => {
  const [commentReply, setCommentReply] = useState("");
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://127.0.0.1:8000/Routes/comment")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
      });
    fetch("http://127.0.0.1:8000/Routes/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, [commentReply]);

  const findNameOfUser = (givenId) => {
    let userName = "";
    users.forEach((user) => {
      if (user.userId === givenId) userName = user.user_Name;
    });
    return userName;
  };
  let commentsByPost = comments
    .filter((comment) => comment.postId === blogObj.postId)
    .map((comment) => {
      return (
        <>
          <div className="card text-bg-dark mb-3 mx-5 border-light w-50">
            <div className="card-body">
              <h5 className="card-title">{findNameOfUser(comment.userId)}</h5>
              <p className="card-text">{comment.comment_Description}</p>
            </div>
          </div>
        </>
      );
    });
  return (
    <div>
      <div className="card bg-dark border border-none my-5 text-white">
        <div className="card-header"></div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{blogObj.description}</p>
            <footer className="blockquote-footer">
              {findNameOfUser(blogObj.userId)}
            </footer>
          </blockquote>
        </div>
        <hr />
        <div className="text-center my-3">
          <p>Add Comment</p>
        </div>
        <div className="d-flex justify-content-start align-items-center">
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
            <label for="floatingInput">reply</label>
          </div>
          <div>
            <button
              className="btn btn-outline-light"
              onClick={() => {
                if (sessionStorage.getItem("user") === null) navigate("/login");
                else {
                  fetch("http://127.0.0.1:8000/Routes/comment", {
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
                  }).then((res) => {
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
