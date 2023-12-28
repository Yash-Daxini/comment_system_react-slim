import React from "react";
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
  useEffect(() => {
    fetch("https://comment-system-backend.onrender.com/Routes/comment")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
        setIsLoading(false);
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
              <div className="d-flex justify-content-between align-items-center gap-5 w-100">
                <button
                  className="btn btn-outline-danger mb-3 w-25"
                  onClick={() => {
                    if (sessionStorage.getItem("user") === null)
                      navigate("/login");
                    else {
                      fetch(
                        `https://comment-system-backend.onrender.com/Routes/comment/${commentObj.comment_Id}`,
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
                        setTimeout(() => {
                          navigate("/blogs");
                        }, 100);
                      });
                    }
                  }}
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
                <div className="w-25">
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      if (sessionStorage.getItem("user") === null)
                        navigate("/login");
                      else {
                        setUpvotes(upvotes + 1);
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
                        ).then((res) => {
                          document.getElementById("upvote").style.color =
                            "#03a9f4";
                          setTimeout(() => {
                            document.getElementById("upvote").style.color =
                              "#fff";
                          }, 2000);
                        });
                      }
                    }}
                  >
                    <ion-icon id="upvote" name="arrow-up-outline"></ion-icon>
                    <span className="ms-2">{upvotes}</span>
                  </button>
                </div>
                <div className="w-25">
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      if (sessionStorage.getItem("user") === null)
                        navigate("/login");
                      else {
                        setDownvotes(downvotes + 1);
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
                        ).then((res) => {
                          document.getElementById("downvote").style.color =
                            "#03a9f4";
                          setTimeout(() => {
                            document.getElementById("downvote").style.color =
                              "#fff";
                          }, 2000);
                        });
                      }
                    }}
                  >
                    <ion-icon
                      id="downvote"
                      name="arrow-down-outline"
                    ></ion-icon>
                    <span className="ms-2">{downvotes}</span>
                  </button>
                </div>
              </div>
              <h5 className="card-title my-2">{commentObj.user_Name}</h5>
              <p className="card-text">{commentObj.comment_Description}</p>
              {/* <button
                className="btn text-light"
                onClick={() => {
                  // if( inputBoxRef.current === 'none' ){
                  inputBoxRef.current = "revert";
                  buttonRef.current = "revert";
                  // }
                  // else{
                  //   inputBoxRef.current = 'none';
                  //   buttonRef.current = 'none';
                  // }
                }}
              >
                <ion-icon name="arrow-redo-outline"></ion-icon>
              </button> */}
              <button
                className="btn btn-outline-light"
                onClick={(e) => {
                  if (!showReply) {
                    setShowReply(true);
                    e.target.innerText = "Hide reply";
                  } else {
                    setShowReply(false);
                    e.target.innerText = "See reply";
                  }
                }}
              >
                See reply
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
                      setCommentReply("");
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
