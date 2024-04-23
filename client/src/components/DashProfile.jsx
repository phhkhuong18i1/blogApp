import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateError,
  deleteStart,
  deleteError,
  deleteSuccess,
  signOutSuccess,
} from "../redux/user/userSlice";
import request from "../config/axiosInstance";
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileLoading, setImageFileLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const filePicker = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      setImageFile(file);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //     match /b/{bucket}/o {
    //       match /{allPaths=**} {
    //         allow read;
    //         allow write: if
    //         request.resource.size < 2 *1024 *1024 &&
    //         request.resource.contentType.matches("image/.*");
    //       }
    //     }
    //   }
    setImageFileLoading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Could not upload image");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageUrl(null);
        setImageFileLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl(downloadUrl);
          setFormData({ ...formData, profilePicture: downloadUrl });
          setImageFileLoading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }

    if (imageFileLoading) {
      return;
    }

    try {
      dispatch(updateStart());
      const res = await request.put(
        `users/update/${currentUser._id}`,
        formData
      );
      const data = await res.data;
      dispatch(updateSuccess(data));
      toast.success("Cập nhật thành công");
    } catch (error) {
      if (error.response) {
        dispatch(updateError(error.response.data.message));
        toast.error(error.response.data.message);
      } else if (error.request) {
        dispatch(updateError(error.request));
        toast.error(error.request);
      } else {
        dispatch(updateError(error.message));
        toast.error(error.message);
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteStart());
      const res = await request.delete(`users/delete/${currentUser._id}`);
      const data = await res.data;
      dispatch(deleteSuccess(data));
      toast.success("Xóa tài khoản thành công");
    } catch (error) {
      if (error.response) {
        dispatch(updateError(error.response.data.message));
        toast.error(error.response.data.message);
      } else if (error.request) {
        dispatch(updateError(error.request));
        toast.error(error.request);
      } else {
        dispatch(updateError(error.message));
        toast.error(error.message);
      }
    }
  };

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
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          ref={filePicker}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer  shadow-md rounded-full overflow-hidden"
          onClick={() => filePicker.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || currentUser.avatar}
            alt="user"
            className={`rounded-full w-full h-full border-solid border-8  object-cover border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-3 text-sm">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign out
        </span>
      </div>

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
              Are you sure you want to delete your account?
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

export default DashProfile;
