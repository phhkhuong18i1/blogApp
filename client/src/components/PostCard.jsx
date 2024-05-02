import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({ post }) => {
  return (
    <div className="group relative w-full border sm:w-[350px] h-[400px] overflow-hidden rounded-lg hover:border-2 transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          className="w-full h-[260px] object-cover group-hover:h-[200px] transition-all duration-300 z-20"
          src={post.image}
          alt="post"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          className="z-10 mx-2 group-hover:bottom-5 absolute bottom-[-200px] 
          
          left-0 right-0 border border-teal-500 text-green-500 hover:bg-green-500 hover:text-white
          transition-none duration-300 text-center py-2 rounded-md
          "
          to={`/post/${post.slug}`}
        >
          Chi tiết
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
