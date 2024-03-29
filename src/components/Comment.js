import moment from "moment";
import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CommentUpdation } from "./Blog";

const Comment = ({ commentObj }) => {
  const navigate = useNavigate();
  const [commentReply, setCommentReply] = useState("");
  const [upvotes, setUpvotes] = useState(parseInt(commentObj.upvotes));
  const [downvotes, setDownvotes] = useState(parseInt(commentObj.downvotes));
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [isShowUpdateBtn, setIsShowUpdateBtn] = useState(true);
  const { commentsFromBlog, setCommentsFromBlog } = useContext(CommentUpdation);

  useEffect(() => {
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
  }, [commentReply, navigate, showReply]);

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

  let curDate = new Date(moment().format("YYYY-MM-DD HH:mm:ss"));
  let postDate = new Date(
    moment(commentObj.creation_Date).format("YYYY-MM-DD HH:mm:ss")
  );

  let diff = 0;
  if (curDate.getDate() !== postDate.getDate()) {
    if (isShowUpdateBtn) {
      setIsShowUpdateBtn(false);
    }
  } else diff = curDate.getTime() - postDate.getTime();

  if (diff > 300000) {
    if (isShowUpdateBtn) {
      setIsShowUpdateBtn(false);
    }
  }

  if (diff <= 300000 && isShowUpdateBtn) {
    setTimeout(() => {
      if (isShowUpdateBtn) {
        setIsShowUpdateBtn(false);
      }
    }, 270000 - diff);
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
        <div className="container">
          <div className="comment mb-3 border-light p-2">
            <span id="commentSpan"></span>
            <div className="card-body">
              <div className="d-flex justify-content-end align-items-center">
                <p>
                  {moment(
                    moment(commentObj.creation_Date).format(
                      "YYYY-MM-DD HH:mm:ss a"
                    ),
                    "YYYY-MM-DD HH:mm:ss a"
                  ).fromNow()}
                </p>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-2 w-100 flex-wrap">
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
                        `https://comment-system-backend.onrender.com/Routes/comment/${commentObj.comment_Id}`,
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
                          setCommentsFromBlog(
                            commentsFromBlog.filter(
                              (comment) =>
                                comment.comment_Id !== commentObj.comment_Id
                            )
                          );
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
                <div className="">
                  {isShowUpdateBtn ? (
                    <button
                      className="btn btn-outline-info mb-3"
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
                  ) : (
                    <></>
                  )}
                </div>
                <div className="width25per">
                  <button
                    className="btn btn-dark"
                    onClick={(e) => {
                      if (sessionStorage.getItem("user") === null)
                        navigate("/login");
                      else {
                        fetch(
                          `https://comment-system-backend.onrender.com/Routes/comment/${commentObj.comment_Id}`,
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
                <div className="width25per">
                  <button
                    className="btn btn-dark"
                    onClick={(e) => {
                      if (sessionStorage.getItem("user") === null)
                        navigate("/login");
                      else {
                        fetch(
                          `https://comment-system-backend.onrender.com/Routes/comment/${commentObj.comment_Id}`,
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
                          postId: commentObj.postId,
                          parentComment_Id: commentObj.comment_Id,
                          creation_Date: moment().format("YYYY-MM-DD HH:mm:ss"),
                          modification_Date: moment().format(
                            "YYYY-MM-DD HH:mm:ss"
                          ),
                        }),
                      }
                    )
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
