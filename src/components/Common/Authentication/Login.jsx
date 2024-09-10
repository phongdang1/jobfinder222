// src/components/Login.js

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typewriter from "typewriter-effect";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { IoMdLock, IoMdCall, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@/components/ui/button";
import IconGoogle from "../../../assets/svgicon/icons8-google.svg";
import IconFacebook from "../../../assets/svgicon/icons8-facebook.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../assets/css/login.css";
import { useEffect } from "react";
import { getProfile } from "@/fetchData/User";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  setToken,
  loginWithGoogle,
} from "../../../redux/features/authSlice";

const Login = () => {
  // xử lý show/hidden password
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Xử lý login bằng redux
  const authStatus = useSelector((state) => state.auth.status);
  const authToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  // Xử lý login thông thường
  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = {
      phoneNumber: phoneNumber,
      password: password,
    };
    try {
      const result = await dispatch(login(credentials)).unwrap();
      console.log("Login successful, result:", result);
      navigate("/");
    } catch (error) {
      console.error("Failed to login: ", error.message || error);
    }
  };

  // Xử lý khi nhận token từ Google OAuth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      dispatch(setToken(tokenFromUrl));
      dispatch(loginWithGoogle(tokenFromUrl));

      // Xóa token khỏi URL sau khi xử lý xong
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch]);

  // Xử lý đăng nhập bằng Google
  const handleLoginWithGoogle = () => {
    // Điều hướng đến route Google OAuth của backend
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <div className="m-auto height-[100vh] flex flex-row px-12 py-24 mx-auto">
      {/* Left side */}
      <div className="flex-1 mb-[56px] w-[548px] text-third lg:flex hidden flex-col items-center justify-center">
        <div className="text-3xl font-title font-bold mb-4">Job Finder</div>
        <Typewriter
          options={{
            strings: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing el Lorem ipsum dolor sit amet, consectetur adipiscing el",
            ],
            autoStart: true,
            loop: true,
            delay: 75, // Thay đổi độ trễ nếu cần
          }}
        />
      </div>

      {/* Right side */}
      <div className="flex-1  px-12 py-14 mx-auto border shadow-lg max-w-[800px] bg-white flex flex-col items-center justify-center">
        <form className="w-full" onSubmit={handleLogin}>
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex items-center border focus:border-primary py-7 px-10"
              />
            </div>
          </div>
          <div className="my-7 flex items-center justify-center ">
            <Button
              type="submit"
              className="text-white rounded-full w-full py-5 px-7 transition  transform hover:scale-105"
            >
              Login now
            </Button>
          </div>

          <div className="mb-4 flex items-center">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="mx-4 font-bold">Login with other</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>
          <div className="flex flex-row sm:flex-col justify-center gap-x-10 gap-y-3 xl:gap-x-4">
            <button
            type="y"
              onClick={handleLoginWithGoogle}
              className="flex items-center justify-center px-3 py-3  rounded-full border-2 border-slate-300 hover:bg-slate-200"
            >
              <img src={IconGoogle} className="w-6 m-2" alt="" />
              <p className="hidden sm:block">Login with Google</p>
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-3 py-3  rounded-full border-2 border-slate-300 hover:bg-slate-200"
            >
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
