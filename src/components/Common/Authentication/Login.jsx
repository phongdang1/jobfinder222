// src/components/Login.js

import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { IoMdLock, IoMdCall } from "react-icons/io";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-blue-500 text-white flex flex-col items-center justify-center p-10">
        <div className="text-3xl font-bold mb-4">Logo</div>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod.
        </p>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
        <form className="w-full max-w-sm">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <IoMdCall className="text-gray-500 mr-2" />
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border-none focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <IoMdLock className="text-gray-500 mr-2" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border-none focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold">Login with other</span>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              <FaGoogle className="mr-2" />
              Login with Google
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <FaFacebookF className="mr-2" />
              Login with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
