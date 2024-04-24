import React, { useEffect, useState } from "react";
import * as request from "../config/axiosInstance";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const posts = async () => {
      try {
        const res = await request.get(
          `posts/getPosts?userId=${currentUser._id}`
        );
        setUserPosts(res.posts);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) posts();

    return () => {
      posts();
    };
  }, [currentUser._id]);
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table
            hoverable
            className="shadow-md "
          >
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell className="text-center">Delete</Table.HeadCell>
              <Table.HeadCell>
                {" "}
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <RiDeleteBin6Line
                      className="cursor-pointer mx-auto"
                      color="red"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`updatePost/${post._id}`}>
                      <FaEdit className="mx-auto" color="blue" />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You not have posts yet.</p>
      )}
    </div>
  );
};

export default DashPosts;
