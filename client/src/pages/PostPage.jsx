import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as request from "../config/axiosInstance";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [recentPosts, setRecentPosts] = useState(null);
  console.log();(recentPosts)
  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const res = await request.get(`posts/getPosts?slug=${postSlug}`);
        setPost(res.posts[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getPost();
  }, [postSlug]);

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const res = await request.get(`posts/getPosts?limit=3`);
        setRecentPosts(res.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRecentPosts(0)
  }, []);
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link to={`/search?category=${post?.category}`} className="self-center">
        <Button className="text-center" color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="p-3 flex justify-between border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post?.content?.length / 1000).toFixed(0)} phút đọc.
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1>Bài viết mới</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
