import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formState, setformState] = useState(initialState);
  const [pic, setpic] = useState();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormChange = (e) => {
    setformState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const postDetails = (pics) => {
    if (pics === undefined) {
      alert("please select an image");
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_present", "ChatApp");
      data.append("cloud_name", "duluif3zv");
      fetch("https://api.cloudinary.com/v1_1/duluif3zv", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setpic(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(`Pic Not Found ${err}`);
        });
    } else {
      alert("data must b in jpeg and png");
    }
  };
  const handleSignup = () => {
    if (formState.password === formState.confirmpassword) {
      const isFormValid = Object.values(formState).every(
        (value) => value !== ""
      );

      if (!isFormValid) {
        alert("Please fill in all required fields.");
        return;
      }
      console.log(formState);
      console.log(pic);
    } else {
      alert("password Doesnt Match");
    }
    try {
      axios(
        "http://localhost:5000/api/user/signup",
        {
          method: "POST",
          data: formState,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          navigate("/testForm");
          console.log("sucessfully Signedup");
        })
        .catch((err) => console.log(err));

      //   toast.success("sucessfully signup");
    } catch (error) {
      //   toast.error("some error");
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-blue-100 gap-4">
      <div className="max-w-lg mx-auto w-[50%] bg-white text-black text-center text-3xl font-semibold px-4 py-6 rounded-md">
        Chat & Connect
      </div>
      <div className="max-w-lg mx-auto w-[50%]">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={handleFormChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              onChange={handleFormChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleFormChange}
              />
              <button
                className="absolute right-0 bottom-0 m-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmpassword"
                required
                type={passwordVisible ? "text" : "confirmpassword"}
                placeholder="Enter your confirm password"
                onChange={handleFormChange}
              />
              <button
                className="absolute right-0 bottom-0 m-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Profile Picture
            </label>
            <input
              onChange={(e) => postDetails(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pic"
              type="file"
              accept="image/*"
              placeholder="Enter your username"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleSignup(formState)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/"
            >
              Already have Account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
