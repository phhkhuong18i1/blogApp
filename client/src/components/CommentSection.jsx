import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import request from "../config/axiosInstance";
import Comment from "./Comment";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [listComments, setListComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim().length == 0) {
      return;
    }
    try {
      const res = await request.post("comments/create", {
        content: comment,
        postId,
        userId: currentUser._id,
      });

      const data = await res.data;
      setComment("");
      setCommentError("");
      setListComments([data, ...listComments])
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    try {
      const getComments = async () => {
        const res = await request.get(`comments/getComments/${postId}`);
        const data = await res.data;
        setListComments(data);
      };

      getComments();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);
  return (
    <div className="p-3 max-w-2xl w-full mx-auto">
      {currentUser ? (
        <div className="flex gap-2 mt-5 items-center text-sm ">
          <p>Đăng nhập bởi:</p>
          <img
            className="w-7 h-7 rounded-full object-cover"
            src={currentUser.avatar}
            alt=""
          />
          <Link
            className="text-blue-500 hover:underline"
            to="/dashboard?tab=profile"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm flex gap-1">
          Bạn cần đăng nhập để có thể bình luận.
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Đăng nhập
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3 my-5"
        >
          <Textarea
            placeholder="Thêm bình luận..."
            rows="3"
            value={comment}
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between mt-5 items-center">
            <p className="text-sm">Tối đa 200 kí tự</p>
            <Button outline gradientDuoTone="purpleToPink" type="submit">
              Submit
            </Button>
          </div>
          {commentError && <Alert color="failure">{commentError}</Alert>}
        </form>
      )}

      {listComments.length === 0 ? (
        <p className="text-sm my-5">Không có bình luận</p>
      ) : (
        <>
          <div className="text-sm my-5 flex gap-2 items-center">
            <p>Bình luận</p>
            <div className="border py-1 px-2 rounded-sm">
              {listComments.length}
            </div>
          </div>
          {listComments.map((comment) => (
            
              <Comment key={comment._id} comment={comment} />
           
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
