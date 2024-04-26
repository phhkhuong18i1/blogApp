import React, { useEffect, useState } from "react";
import request from "../config/axiosInstance";
import moment from "moment";
import "moment/locale/vi"
import {FaThumbsUp} from "react-icons/fa";
import { useSelector } from "react-redux";
const Comment = ({ comment, onLike }) => {
  const {currentUser} = useSelector(state => state.user)
  const [user, setUser] = useState({});
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
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img className="w-10 h-10 rounded-full object-cover" src={user.avatar} alt={user.username} />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1"> 
            <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : 'Người ẩn danh'}</span>
            <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex gap-2 items-center pt-2 text-xs max-w-fit ">
          <button className={` hover:text-blue-500 ${
            currentUser && comment.likes.includes(currentUser._id) ? 'text-blue-500' : 'text-gray-400'
          }`}  type="button" onClick={() => onLike(comment._id)}>
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {
              comment.numberOfLikes > 0 && comment.numberOfLikes
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
