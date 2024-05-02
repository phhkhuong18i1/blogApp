import React, { useEffect, useState } from "react";
import request from "../config/axiosInstance";
import moment from "moment";
import "moment/locale/vi";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [contentEdit, setContentEdit] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await request.get(`users/${comment.userId}`);
        const data = await res.data;
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEdit(true);
    setContentEdit(comment.content);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await request.put(`comments/editComment/${comment._id}`, {
        content: contentEdit,
      });

      const data = await res.data;
      setIsEdit(false);
      setContentEdit("");
      onEdit(comment, contentEdit);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={user.avatar}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Người ẩn danh"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEdit ? (
          <>
            <Textarea
              value={contentEdit}
              className="mb-2"
              onChange={(e) => setContentEdit(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" size="sm" onClick={handleSaveEdit}>
                Lưu
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex gap-2 items-center pt-2 text-xs max-w-fit ">
              <button
                className={` hover:text-blue-500 ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
                type="button"
                onClick={() => onLike(comment._id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 && comment.numberOfLikes}
              </p>
              {((currentUser && currentUser._id === comment.userId) ||
                currentUser.isAdmin) && (
                <>
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => onDelete(comment._id)}
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                  >
                   Xóa
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
