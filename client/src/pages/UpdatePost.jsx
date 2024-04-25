import React, { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import request from "../config/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();
  console.log(formData);
  useEffect(() => {
    try {
      const getPost = async () => {
        const res = await request.get(`posts/getPosts?postId=${postId}`);
        const data = await res.data;
        setFormData(data.posts[0]);
      };

      getPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Vui lòng chọn ảnh");
        return;
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: url });
            setImageUrl(url);
          });
        }
      );
    } catch (error) {
      setImageUploadError("image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await request.put(`posts/update/${formData._id}`, formData);
      const data = await res.data;
      toast.success("Cập nhật bài viết thành công");
      navigate(`/post/${data.slug}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center my-7 font-semibold">Cập nhật bài viết</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            value={formData.title || ""}
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || "uncategorized"}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">ReactJs</option>
            <option value="nextjs">NextJs</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={imageUploadProgress}
          />
          <Button type="button" size="sm" onClick={handleUploadImage}>
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          value={formData.content || ""}
          theme="snow"
          placeholder="Write something..."
          required
          className="h-72 mb-12"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit">Cập nhật</Button>
      </form>
    </div>
  );
};

export default UpdatePost;
