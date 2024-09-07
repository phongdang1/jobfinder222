// src/components/Login.js

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typewriter from "typewriter-effect";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { IoMdLock, IoMdCall, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@/components/ui/button";
import IconGoogle from "../../../assets/svgicon/icons8-google.svg";
import IconFacebook from "../../../assets/svgicon/icons8-facebook.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../../assets/css/login.css"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="m-auto height-[100vh] flex flex-row px-12 py-24 mx-auto">
      {/* Left side */}
      <div className="flex-1 mb-[56px] w-[548px] text-third lg:flex hidden flex-col items-center justify-center">
        <div className="text-3xl font-title font-bold mb-4">Job Finder</div>
        <Typewriter
          options={{
            strings: ["Lorem ipsum dolor sit amet, consectetur adipiscing el Lorem ipsum dolor sit amet, consectetur adipiscing el"],
            autoStart: true,   
            loop: true,
            delay: 75, // Thay đổi độ trễ nếu cần
          }}
        />
      </div>

      {/* Right side */}
      <div className="flex-1  px-12 py-14 mx-auto border shadow-lg max-w-[800px] bg-white flex flex-col items-center justify-center">
        <form className="w-full">
          <h1 className="mb-8 text-5xl text-primary  font-title">Sign in</h1>
          <div className="mb-6">
            <div
              className="flex flex-row justify-between items-center mb-2"
              htmlFor="phone"
            >
              <label className="text-gray-700 text-sm font-bold">
                {" "}
                Phone Number
              </label>
              <div className="flex items-center text-[13px] gap-x-2">
                <p>Need an account ?</p>
                <Link
                  className="text-[13px]  text-primary font-medium"
                  to="/signup"
                >
                  Sign up
                </Link>
              </div>
            </div>
            <div className="relative flex items-center">
              <IoMdCall className="text-gray-500 mr-2 absolute left-3" />
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="flex items-center border focus:border-primary py-7 px-10"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label
                className="text-gray-700 text-sm font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <button
                type="button"
                onClick={toggleShowPassword}
                className="text-blue-500 flex items-center space-x-2"
              >
                {showPassword ? (
                  <>
                    <IoMdEyeOff className="text-gray-500" />
                    <span className="text-sm">Hide</span>
                  </>
                ) : (
                  <>
                    <IoMdEye className="text-gray-500" />
                    <span className="text-sm">Show</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative flex items-center">
              <IoMdLock className="text-gray-500 mr-2 absolute left-3" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="flex items-center border focus:border-primary py-7 px-10"
              />
            </div>
          </div>
          <div className="my-7 flex items-center justify-center ">
            <Button className="text-white rounded-full w-full py-5 px-7 transition  transform hover:scale-105">
              Login now
            </Button>
          </div>

          <div className="mb-4 flex items-center">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-4 font-bold">Login with other</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          <div className="flex flex-row sm:flex-col justify-center gap-x-10 gap-y-3 xl:gap-x-4">
            <button className="flex items-center justify-center px-3 py-3  rounded-full border-2 border-slate-300 hover:bg-slate-200">
              <img src={IconGoogle} className="w-6 m-2" alt="" />
              <p className="hidden sm:block">Login with Google</p>
            </button>
            <button className="flex items-center justify-center px-3 py-3  rounded-full border-2 border-slate-300 hover:bg-slate-200">
              <img src={IconFacebook} className="w-6 m-2" alt="" />
              <p className="hidden sm:block">Login with Facebook</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;