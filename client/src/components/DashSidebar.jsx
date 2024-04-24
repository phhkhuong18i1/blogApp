import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import request from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
const DashSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {currentUser} = useSelector(state => state.user)
  const [tab, setTab] = useState("");
  const handleSignOut = async () => {
    try {
      const res = await request.post("users/signOut");
      const data = await res.data;
      dispatch(signOutSuccess(data));
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request);
      } else {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-3">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label="User"
              as="div"
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              as="div"

            >
              Posts
            </Sidebar.Item>
          </Link>
          )}
         
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignOut}
            className="cursor-pointer"
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
