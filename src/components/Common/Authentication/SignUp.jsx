import React, { useEffect, useState } from "react";
import {
  IoMdCall,
  IoMdLock,
  IoMdEye,
  IoMdEyeOff,
  IoMdPerson,
  IoMdMail,
} from "react-icons/io";
import { FaGenderless, FaRegAddressBook } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { login, signUp, setUser } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import firebase from "../../../utils/firebase";

const roles = ["User", "Company"];

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    roleCode: "",
    image: "",
  });
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const navigate = useNavigate();
  const [retypePassword, setRetypePassword] = useState("");
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowRetypePassword = () =>
    setShowRetypePassword(!showRetypePassword);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth); // Lấy trạng thái auth từ Redux store

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value); // Cập nhật giá trị của retypePassword riêng
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== retypePassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const result = await dispatch(signUp(formData)).unwrap();
      // Điều hướng sau khi thành công, nếu cần
      console.log("Sign Up Successful", authState);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("user_id", result.user?.id);
      
      navigate("/");
    } catch (error) {
      console.log("image", formData.image);
      console.error("Sign Up Error:", error);
    }
  };
  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`/getUserById?id=${userId}`);

      console.log("Response from /getUserById:", response);

      if (response.data) {
        dispatch(setUser(response.data)); // Cập nhật thông tin người dùng vào Redux store
        localStorage.setItem("user", JSON.stringify(response.data)); // Lưu thông tin người dùng vào localStorage
        console.log("User data set in Redux and localStorage:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  return (
    <div className="flex-1 px-12 py-14 mx-auto bg-secondary flex flex-col items-center justify-center border border-gray-300">
      {/* Recaptcha container */}
      <div id="recaptcha-container"></div>
      <form className="w-[524px]">
        <h1 className="mb-8 text-5xl text-primary font-title">Sign Up</h1>

        <div className="mb-6">
          <div className="relative flex items-center mb-4">
            <AiOutlineUser className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-4">
            <AiOutlineUser className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-6">
            <FaRegAddressBook className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-4">
            <IoMdCall className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-4">
            <IoMdMail className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-4">
            <IoMdLock className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="flex items-center border focus:border-primary py-7 px-10"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-5"
            >
              {showPassword ? (
                <IoMdEyeOff className="text-gray-500" />
              ) : (
                <IoMdEye className="text-gray-500" />
              )}
            </button>
          </div>
          <div className="relative flex items-center mb-4">
            <IoMdLock className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type={showRetypePassword ? "text" : "password"}
              placeholder="Retype Password"
              value={retypePassword}
              onChange={handleRetypePasswordChange}
              className="flex items-center border focus:border-primary py-7 px-10"
            />
            <button
              type="button"
              onClick={toggleShowRetypePassword}
              className="absolute right-5"
            >
              {showRetypePassword ? (
                <IoMdEyeOff className="text-gray-500" />
              ) : (
                <IoMdEye className="text-gray-500" />
              )}
            </button>
          </div>

          <div className="relative flex items-center mb-4">
            <FaGenderless className="text-gray-500 mr-2 absolute left-3" />
            <Select
              className="rounded-full"
              name="roleCode"
              value={formData.roleCode}
              onValueChange={(value) =>
                setFormData({ ...formData, roleCode: value })
              }
            >
              <SelectTrigger className="w-full rounded-full py-7 pl-10 pr-4">
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="my-7 flex items-center justify-center">
            <Button
              onClick={handleSubmit}
              type="submit"
              className="text-white rounded-full w-full py-5 px-7 transition transform hover:scale-105"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
