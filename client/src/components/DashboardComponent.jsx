import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import request from "../config/axiosInstance";
import {
  HiArrowNarrowRight,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FaCommentDots } from "react-icons/fa";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
const DashboardComponent = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await request.get("users/getUsers?limit=5");
        const data = await res.data;
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getPosts = async () => {
      try {
        const res = await request.get("posts/getPosts?limit=5");
        const data = await res.data;
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getComments = async () => {
      try {
        const res = await request.get("comments/listComments?limit=5");
        const data = await res.data;
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      getUsers();
      getPosts();
      getComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div>Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div>Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md uppercase">Total comments</h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <FaCommentDots className="bg-teal-600 text-white rounded-full p-3 text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div>Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-500">
            <div className="flex justify-between p-3 text-sm">
                <p className="text-center p-2">Users</p>
                <Button outline><Link to="/dashboard?tab=users">Tất cả</Link></Button>
            </div>
            <Table hoverable>                                                       
                <Table.Head>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
               </Table.Head>
               {users && users.map((user) => (
                        <Table.Body key={user._id} className="divide-y">
                            <Table.Row className="bg-white dark::border-gray-500 dark:bg-gray-800">
                                <Table.Cell>
                                    <img className="w-10 h-10 rounded-full object-cover" src={user.avatar} alt="" />
                                </Table.Cell>
                                <Table.Cell>
                                    {user.username}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.email}
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-500">
            <div className="flex justify-between p-3 text-sm">
                <p className="text-center p-2">Posts</p>
                <Button outline><Link to="/dashboard?tab=posts">Tất cả</Link></Button>
            </div>
            <Table hoverable>                                                       
                <Table.Head>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
               </Table.Head>
               {posts && posts.map((post) => (
                        <Table.Body key={post._id} className="divide-y">
                            <Table.Row className="bg-white dark::border-gray-500 dark:bg-gray-800">
                            <Table.Cell>
                                    <img className="w-full h-20  object-cover" src={post.image} alt="" />
                                </Table.Cell>
                                <Table.Cell>
                                    {post.title}
                                </Table.Cell>
                                <Table.Cell>
                                    {post.category}
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-500">
            <div className="flex justify-between p-3 text-sm">
                <p className="text-center p-2">Comments</p>
                <Button outline><Link to="/dashboard?tab=comments">Tất cả</Link></Button>
            </div>
            <Table hoverable>                                                       
                <Table.Head>
                    <Table.HeadCell>Content</Table.HeadCell>
                    <Table.HeadCell>Number of likes</Table.HeadCell>
                    <Table.HeadCell>User</Table.HeadCell>
                    <Table.HeadCell>Post</Table.HeadCell>
               </Table.Head>
               {comments && comments.map((comment) => (
                        <Table.Body key={comment._id} className="divide-y">
                            <Table.Row className="bg-white dark::border-gray-500 dark:bg-gray-800">
                                <Table.Cell>
                                   <p className="line-clamp-2">{comment.content}</p> 
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.numberOfLikes}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.userId}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.postId}
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    ))}
            </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
