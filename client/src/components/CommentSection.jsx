import { Alert, Button, Modal, TextInput, Textarea } from "flowbite-react";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import request from "../config/axiosInstance";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [listComments, setListComments] = useState([]);
  const [commentError, setCommentError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [commentDelete, setCommentDelete] = useState(null)
  const navigate = useNavigate();
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
      setListComments([data, ...listComments]);
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

  const handleLikeComment = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await request.put(`comments/likeComment/${commentId}`);
      const data = await res.data;
      setListComments(
        listComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.likes,
                numberOfLikes: data.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editContent) => {
    setListComments(
      listComments.map((c) =>
        c._id === comment._id ? { ...c, content: editContent } : c
      )
    );
  };

  const handleDeleteComment = async () => {
    try {
      const res = await request.delete(`comments/deleteComment/${commentDelete}`)
      setListComments((prev) => prev.filter((comment) => comment._id !== commentDelete))
      setShowModal(false)
    } catch (error) {
      console.log(error.message);
    }
  };
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
            <Comment
              key={comment._id}
              comment={comment}
              onEdit={handleEdit}
              onLike={handleLikeComment}
              onDelete={(commentId) => {
                setShowModal(true)
                setCommentDelete(commentId)
              }}
            />
          ))}

          <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-red-700 dark:text-gray-200 mx-auto mb-4" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Bạn muốn xóa bình luận này?
            </h3>
            <div className="flex gap-4 justify-center">
              <Button
                className="w-[7.5rem] h-15"
                color="failure"
                onClick={handleDeleteComment}
              >
                Có
              </Button>
              <Button
                className="w-[7.5rem] h-15"
                color="gray"
                onClick={() => setShowModal(false)}
              >
                Không
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </>
      )}
    </div>
  );
};

export default CommentSection;
