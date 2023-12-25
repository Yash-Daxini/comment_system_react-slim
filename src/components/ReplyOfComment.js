import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ReplyOfComment = ({ commentReplyObj }) => {
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(parseInt(commentReplyObj.upvotes));
  const [downvotes, setDownvotes] = useState(
    parseInt(commentReplyObj.downvotes)
  );

  return (
    <div>
      <div
        className="commentReply p-3 mb-5 border-light"
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center gap-5">
            <button
              className="btn btn-outline-danger mb-3"
              onClick={() => {
                if (sessionStorage.getItem("user") === null) navigate("/login");
                else {
                  fetch(
                    `https://comment-system-backend.onrender.com/Routes/comment/${commentReplyObj.comment_Id}`,
                    {
                      method: "DELETE",
                    }
                  ).then((res) => {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Comment Deleted successfully !",
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
            <div className="">
              <button
                className="btn btn-dark"
                onClick={() => {
                  if (sessionStorage.getItem("user") === null)
                    navigate("/login");
                  else {
                    setUpvotes(upvotes + 1);
                    fetch(
                      `https://comment-system-backend.onrender.com/Routes/comment/${commentReplyObj.comment_Id}`,
                      {
                        method: "PUT",
                        headers: {
                          Accept: "application/json",
                          "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                          ...commentReplyObj,
                          upvotes: upvotes + 1,
                        }),
                      }
                    ).then((res) => {});
                  }
                }}
              >
                <ion-icon name="arrow-up-outline"></ion-icon>
                <spanc className="ms-2">{upvotes}</spanc>
              </button>
            </div>
            <div className="">
              <button
                className="btn btn-dark"
                onClick={() => {
                  if (sessionStorage.getItem("user") === null)
                    navigate("/login");
                  else {
                    setDownvotes(downvotes + 1);
                    fetch(
                      `https://comment-system-backend.onrender.com/Routes/comment/${commentReplyObj.comment_Id}`,
                      {
                        method: "PUT",
                        headers: {
                          Accept: "application/json",
                          "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                          ...commentReplyObj,
                          downvotes: downvotes + 1,
                        }),
                      }
                    ).then((res) => {});
                  }
                }}
              >
                <ion-icon name="arrow-down-outline"></ion-icon>
                <spanc className="ms-2">{downvotes}</spanc>
              </button>
            </div>
          </div>
          <h5 className="card-title">{commentReplyObj.user_Name}</h5>
          <p className="card-text">{commentReplyObj.comment_Description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReplyOfComment;
