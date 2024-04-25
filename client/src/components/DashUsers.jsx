import React, { useEffect, useState } from "react";
import * as request from "../config/axiosInstance";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";
import { FaCheck, FaEdit } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const users = async () => {
      try {
        const res = await request.get(
          `users/getUsers`
        );
        setUsers(res.users);
        if (res.users.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

     users();

    return () => {
        users();
    };
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await request.get(
        `users/getUsers?startIndex=${startIndex}`
      );

      setUsers((prev) => [...prev, ...res.users]);
      if (res.users.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await request.deleteItem(`users/delete/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId))
      toast.success("Xóa tài khoản thành công");
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>isAdmin</Table.HeadCell>
              <Table.HeadCell className="text-center">Delete</Table.HeadCell>
        
            </Table.Head>
            {users.map((user, index) => (
              <Table.Body className="divide-y" key={index}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                  </Table.Cell>
                  <Table.Cell>
                      {user.username}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? 
                  (<FaCheck className="mx-auto" color="green" />) : 
                  (<RiCloseFill className="mx-auto text-xl" color="red" />)}</Table.Cell>
                  <Table.Cell>
                    <RiDeleteBin6Line
                      onClick={() => {
                        setShowModal(true);
                        setUserId(user._id);
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
        <p>You not have posts yet.</p>
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
                onClick={handleDeleteUser}
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

export default DashUsers;
