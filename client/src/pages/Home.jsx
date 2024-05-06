import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import CallToAction from "../components/CallToAction";
import request from '../config/axiosInstance';
import PostCard from '../components/PostCard';
const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
      const getPosts = async () => {
          try {
            const res = await request.get("posts/getPosts")
            const data = await res.data
            setPosts(data.posts)
          } catch (error) {
            console.log(error);
          }
      }
      getPosts()
  },[])
    return (
        <div>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
              <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
              <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages </p>
            <Link to="/search" className='text-xs sm:text-sm text-blue-500 font-bold hover:underline'>
                View all posts
            </Link>
            </div>  
            <div className='p-3 bg-amber-100 dark:bg-slate-700'>
              <CallToAction />
            </div>
            <div className='max-w-6xl mx-auto flex flex-col gap-8 py-7'>
            {posts && posts.length > 0 && 
             <div className='flex flex-col gap-6'>
             <h2 className='text-2xl font-semibold text-center'>Bài viết mới</h2>
              <div className='flex flex-wrap gap-4 justify-center'>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link to="/search" className='text-lg text-center text-blue-500 font-bold hover:underline'>
                View all posts
            </Link>
             </div>

            }
            </div>
        </div>
    );
};

export default Home;