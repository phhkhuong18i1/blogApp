import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../config/axiosInstance";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("vui lòng nhập đầy đủ các trường!");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await request.post("auth/signup", formData);

      if (res.success === false) {
        setErrorMessage(res.message);
      }
      const data = await res.data;
      navigate("/sign-in");
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage(error.request);
      } else {
        setErrorMessage(error.message);
      }
      setLoading(false);
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
            This is a demo project. You can sign up with your email and password
            or with Google
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" htmlFor="username" />
              <TextInput
                id="username"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Password"
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
                "Sign up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-4">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign in
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

export default SignUp;
