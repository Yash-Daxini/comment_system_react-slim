import moment from "moment";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Comment = ({ commentObj }) => {
  const navigate = useNavigate();
  const [commentReply, setCommentReply] = useState("");
  const [upvotes, setUpvotes] = useState(parseInt(commentObj.upvotes));
  const [downvotes, setDownvotes] = useState(parseInt(commentObj.downvotes));
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const updateButton = useRef(null);
  const curComment = useRef(null);
  useEffect(() => {
    fetch("http://localhost:8000/Routes/comment")
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
  }, [commentReply, navigate, showReply, updateButton]);

  let giveReplysOfEachComment = (commetnId) => {
    return comments
      .filter((comment) => comment.parentComment_Id === commetnId)
      .map((comment) => {
        return (
          <>
            <Comment commentObj={comment} />
          </>
        );
      });
  };

  let curDate = new Date(moment().format("YYYY-MM-DD h:mm:ss"));
  let postDate = new Date(
    moment(commentObj.creation_Date).format("YYYY-MM-DD h:mm:ss")
  );

  let diff = 0;
  if (curDate.getDate() !== postDate.getDate()) {
    if (updateButton.current) {
      updateButton.current.style.display = "none";
    }
  } else diff = curDate.getTime() - postDate.getTime();

  if (diff > 300000) {
    if (updateButton.current) {
      updateButton.current.style.display = "none";
    }
  }

  if (diff <= 300000 && updateButton.current !== "none") {
    setTimeout(() => {
      if (updateButton.current) {
        updateButton.current.style.display = "none";
      }
    }, 300000 - diff);
  }
  return (
    <>
      {isLoading ? (
        <div className="container comment">
          <div className="mb-3 border-light w-100 p-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center gap-5">
                <div className="placeholder-glow w-25">
                  <span className="placeholder col-8"></span>
                </div>
                <div className="placeholder-glow w-25">
                  <span className="placeholder col-8"></span>
                </div>
                <div className="placeholder-glow w-25">
                  <span className="placeholder col-8"></span>
                </div>
              </div>
              <div className="placeholder-glow w-100 my-3">
                <span className="placeholder col-8 h-25"></span>
              </div>
              <div className="placeholder-glow w-100">
                <span className="placeholder col-6 h-25"></span>
              </div>
              <div className="placeholder-glow w-100 my-3">
                <span className="placeholder col-2 h-25"></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container" ref={curComment}>
          <div className="comment mb-3 border-light p-2">
            <span id="commentSpan"></span>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center gap-5 w-100">
                <button
                  className="btn btn-outline-danger mb-3 w-25"
                  onClick={() => {
                    if (sessionStorage.getItem("user") === null)
                      navigate("/login");
                    else if (
                      commentObj.userId !== sessionStorage.getItem("userId")
                    ) {
                      Swal.fire({
                        icon: "error",
                        title:
                          "You can't delete this comment ! Because this not added by you.",
                        showConfirmButton: true,
                      });
                    } else {
                      fetch(
                        `http://localhost:8000/Routes/comment/${commentObj.comment_Id}`,
                        {
                          method: "DELETE",
                        }
                      )
                        .then((res) => {
                          Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Comment Deleted successfully !",
                            showConfirmButton: false,
                            timer: 2500,
                          });
                          curComment.current.style.display = "none";
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
                <div className="w-25">
                  <button
                    ref={updateButton}
                    className="btn btn-outline-info mb-3 w-100"
                    onClick={(e) => {
                      if (sessionStorage.getItem("user") === null)
                        navigate("/login");
                      else if (
                        commentObj.userId !== sessionStorage.getItem("userId")
                      ) {
                        Swal.fire({
                          icon: "error",
                          title:
                            "You can't update this comment ! Because this not added by you.",
                          showConfirmButton: true,
                        });
                      } else {
                        navigate(`/editcomment/${commentObj.comment_Id}`);
                      }
                    }}
                  >
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </div>
                <div className="w-25">
                  <button
                    className="btn btn-dark"
                    onClick={(e) => {
                      if (sessionStorage.getItem("user") === null)
                        navigate("/login");
                      else {
                        fetch(
                          `http://localhost:8000/Routes/comment/${commentObj.comment_Id}`,
                          {
                            method: "PUT",
                            headers: {
                              Accept: "application/json",
                              "Content-type": "application/json",
                            },
                            body: JSON.stringify({
                              ...commentObj,
                              upvotes: upvotes + 1,
                            }),
                          }
                        )
                          .then((res) => {
                            if (e.target.tagName === "BUTTON") {
                              e.target.setAttribute("disabled", "");
                              e.target.style.color = "#03a9f4";
                            } else if (e.target.tagName === "ION-ICON") {
                              e.target.parentElement.parentElement.setAttribute(
                                "disabled",
                                ""
                              );
                              e.target.parentElement.parentElement.style.color =
                                "#03a9f4";
                            } else {
                              e.target.parentElement.setAttribute(
                                "disabled",
                                ""
                              );
                              e.target.parentElement.style.color = "#03a9f4";
                            }
                            setUpvotes(upvotes + 1);
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
                    <span>
                      <ion-icon name="arrow-up-outline"></ion-icon>
                    </span>
                    <span className="ms-2">{upvotes}</span>
                  </button>
                </div>
                <div className="w-25">
                  <button
                    className="btn btn-dark"
                    onClick={(e) => {
                      if (sessionStorage.getItem("user") === null)
                        navigate("/login");
                      else {
                        fetch(
                          `http://localhost:8000/Routes/comment/${commentObj.comment_Id}`,
                          {
                            method: "PUT",
                            headers: {
                              Accept: "application/json",
                              "Content-type": "application/json",
                            },
                            body: JSON.stringify({
                              ...commentObj,
                              downvotes: downvotes + 1,
                            }),
                          }
                        )
                          .then((res) => {
                            if (e.target.tagName === "BUTTON") {
                              e.target.setAttribute("disabled", "");
                              e.target.style.color = "#03a9f4";
                            } else if (e.target.tagName === "ION-ICON") {
                              e.target.parentElement.parentElement.setAttribute(
                                "disabled",
                                ""
                              );
                              e.target.parentElement.parentElement.style.color =
                                "#03a9f4";
                            } else {
                              e.target.parentElement.setAttribute(
                                "disabled",
                                ""
                              );
                              e.target.parentElement.style.color = "#03a9f4";
                            }
                            setDownvotes(downvotes + 1);
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
                    <span>
                      <ion-icon name="arrow-down-outline"></ion-icon>
                    </span>
                    <span className="ms-2">{downvotes}</span>
                  </button>
                </div>
              </div>
              <p className="card-text my-3">{commentObj.comment_Description}</p>
              <footer className="blockquote-footer my-3 fs-3">
                {commentObj.user_Name}
              </footer>
              <button
                className="btn btn-outline-light"
                onClick={(e) => {
                  setShowReply(!showReply);
                  e.target.innerText = !showReply ? "Hide reply" : "See reply";
                }}
              >
                {showReply ? "Hide reply" : "See reply"}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-end me-2 align-items-center">
            <div className="form-floating mb-3 w-50 mx-5">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                value={commentReply}
                onChange={(e) => {
                  setCommentReply(e.target.value);
                }}
              />
              <label for="floatingInput">Reply</label>
            </div>
            <div>
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  if (sessionStorage.getItem("user") === null)
                    navigate("/login");
                  else {
                    fetch("http://localhost:8000/Routes/comment", {
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
                        postId: commentObj.postId,
                        parentComment_Id: commentObj.comment_Id,
                        creation_Date: moment().format("YYYY-MM-DD h:mm:ss"),
                        modification_Date:
                          moment().format("YYYY-MM-DD h:mm:ss"),
                      }),
                    })
                      .then((res) => {
                        setCommentReply("");
                        setShowReply(true);
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
                send
              </button>
            </div>
          </div>
          {showReply ? (
            <div className="d-flex justify-content-center align-items-end flex-column">
              <div className="mt-1">
                {giveReplysOfEachComment(commentObj.comment_Id)}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
