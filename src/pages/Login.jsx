import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formState, setformState] = useState(initialState);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormChange = (e) => {
    setformState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };
  const handleLogin = () => {
    const isFormValid = Object.values(formState).every((value) => value !== "");

    if (!isFormValid) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      axios(
        "http://localhost:5000/api/user/signin",
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
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          console.log(res.data.user);
          console.log(res.data.user.email);
          navigate(`chat/${res.data.user._id}`);

          console.log("sucessfully Logedin");
          // navigate("/");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    // console.log(formState);
    // alert("Login Sucessfully");
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
                required
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

          <div className="flex items-center justify-between">
            <button
              onClick={() => handleLogin(formState)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Login{" "}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/Signup"
            >
              Don't have Account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
