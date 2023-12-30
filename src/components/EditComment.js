import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditComment = () => {
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const params = useParams();
  const idOfComment = params.id;
  useEffect(() => {
    fetch("https://comment-system-backend.onrender.com/Routes/comment")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed to connect",
          showConfirmButton: true,
        });
      });
  }, [])

  let commentById = comments.filter((comment)=>comment.comment_Id === idOfComment);
  
  return (
    <div className="container my-5 d-flex justify-content-center align-items-center flex-column">
        <h4 className="">Edit</h4>
      <div className="form-floating mb-3 w-50 my-2">
        <textarea
          rows={15}
          className="form-control h-100"
          id="floatingPassword1"
          placeholder="Comment"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
        ></textarea>
        <label for="floatingPassword1">Edit comment</label>
      </div>
      <div className="my-3">
        <button
          className="btn btn-outline-success"
          onClick={() => {
            if (sessionStorage.getItem("user") === null) navigate("/login");
            else {
              fetch(
                `https://comment-system-backend.onrender.com/Routes/comment/${idOfComment}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    ...commentById,
                    comment_Description: commentText,
                    modification_Date: new Date()
                      .toJSON()
                      .slice(0, 19)
                      .replace("T", " "),
                  }),
                }
              )
                .then((res) => {
                  setCommentText("");
                  Swal.fire({
                    icon: "success",
                    title: "Comment updated successfully",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                })
                .catch((error) => {
                    console.warn(error);
                  Swal.fire({
                    icon: "error",
                    title: "Failed to connect",
                    showConfirmButton: true,
                  });
                });
            }
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditComment;
