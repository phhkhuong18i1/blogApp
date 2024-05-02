import React, { useEffect, useState } from "react";
import * as request from "../config/axiosInstance";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";
import { FaCheck, FaEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  useEffect(() => {
    const comments = async () => {
      try {
        const res = await request.get(
          `comments/listComments`
        );
        setComments(res.comments);
        if (res.comments.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

     comments();

    return () => {
        comments();
    };
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await request.get(
        `comments/geComments?startIndex=${startIndex}`
      );

      setComments((prev) => [...prev, ...res.comments]);
      if (res.comments.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await request.deleteItem(`comments/deleteComment/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId))
      toast.success("Xóa bình luận thành công");
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Post</Table.HeadCell>
              <Table.HeadCell>Content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell >Delete</Table.HeadCell>
        
            </Table.Head>
            {comments.map((comment, index) => (
              <Table.Body className="divide-y" key={index}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                      {comment.userId}
                  </Table.Cell>
                  <Table.Cell>
                      {comment.postId}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell className="text-center">{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>
                    <RiDeleteBin6Line
                      onClick={() => {
                        setShowModal(true);
                        setCommentId(comment._id);
                      }}
                      className="cursor-pointer mx-auto"
                      color="red"
                    />
                  </Table.Cell>
                
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              className="w-full text-teal-500 self-center text-sm py-7"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You not have comments yet.</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mx-auto mb-4" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex gap-4 justify-center">
              <Button
                className="w-[7.5rem] h-15"
                color="failure"
                onClick={handleDeleteComment}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="w-[7.5rem] h-15"
                color="gray"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashComments;
