import React, { useState } from "react";
import {
  IoMdCall,
  IoMdLock,
  IoMdEye,
  IoMdEyeOff,
  IoMdPerson,
  IoMdMail,
} from "react-icons/io";
import { FaGenderless } from "react-icons/fa";
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

const roles = ["Job Seeker", "Company"];
const genders = ["Male", "Female"];
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowRetypePassword = () =>
    setShowRetypePassword(!showRetypePassword);

  return (
    <div className="flex-1 px-12 py-14 mx-auto bg-secondary flex flex-col items-center justify-center border border-gray-300">
      <form className="w-[524px]">
        <h1 className="mb-8 text-5xl text-primary font-title">Sign Up</h1>

        <div className="mb-6">
          <div className="relative flex items-center mb-4">
            <AiOutlineUser className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="text"
              placeholder="First Name"
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-4">
            <AiOutlineUser className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="text"
              placeholder="Last Name"
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-6">
            <IoMdPerson className="text-gray-500 mr-2 absolute left-3" />
            <Select className="rounded-full">
              <SelectTrigger className="w-full rounded-full py-7 pl-10 pr-4 ">
                <SelectValue placeholder="Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-primary">Genders</SelectLabel>
                  {genders.map((gender) => {
                    return (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="relative flex items-center mb-4">
            <IoMdCall className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="tel"
              placeholder="Phone Number"
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-4">
            <IoMdMail className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type="email"
              placeholder="Email"
              className="flex items-center border focus:border-primary py-7 px-10"
            />
          </div>
          <div className="relative flex items-center mb-4">
            <IoMdLock className="text-gray-500 mr-2 absolute left-3" />
            <Input
              type={showPassword ? "text" : "password"}
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
            <Select className="rounded-full">
              <SelectTrigger className="w-full rounded-full py-7 pl-10 pr-4">
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  {roles.map((role) => {
                    return (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="my-7 flex items-center justify-center">
            <Button className="text-white rounded-full w-full py-5 px-7 transition transform hover:scale-105">
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
