import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

const Login = () => {
  const initialState = {
    username: "",
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
    console.log(formState);
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
              Sign Up
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/Signup"
            >
              Already have Account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;