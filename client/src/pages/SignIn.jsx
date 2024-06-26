import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInError, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !formData.email || !formData.password) {
      return dispatch(signInError("vui lòng nhập đầy đủ các trường!"));
    }
    try {
      dispatch(signInStart())
      const res = await request.post("auth/signin", formData);

      const data = await res.data;
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
      if (error.response) {
        dispatch(signInError(error.response.data.message));
      } else if (error.request) {
        dispatch(signInError(error.request));
      } else {
        dispatch(signInError(error.message));
      }

    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex  p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-red-400 rounded-lg text-white">
              Khuong
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
            <div>
              <Label value="Your email" htmlFor="email" />
              <TextInput
                type="email"
                id="email"
                placeholder="name@gmail.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" htmlFor="password" />
              <TextInput
                type="password"
                id="password"
                placeholder="*********"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-4">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="red">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
