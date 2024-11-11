import React from "react";
import { UserCircleIcon, Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { HiOutlineSearch } from "react-icons/hi";
import logo from "../../../assets/images/JobFinder_logo.png";
import { Link } from "react-router-dom";
import logoText from "../../../assets/images/JobFinder_logoText.png";
import Logout from "@/components/Common/Authentication/Logout";
const AdminHeader = () => {
  return (
    <header className="bg-gray-100 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/admin/dashboard" className="text-lg font-semibold">
          <img
            className="w-full h-16 hidden lg:block"
            src={logoText}
            alt="JobFinder Logo"
          />
          <img
            className="w-full h-16 lg:hidden block"
            src={logo}
            alt="JobFinder Logo"
          />
        </Link>
      </div>
      {/* <div className="relative">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        />
        <Button
          type="button"
          className="p-3 bg-third hover:text-white rounded-md rounded-l-none flex-shrink-0"
        >
          <p className="text-white">Search</p>
        </Button>
      </div> */}
      <div className="flex items-center space-x-4 text-third font-bold">
        <span>Welcome, Admin</span>
        <div className=" px-4 py-3 rounded flex items-center gap-2 hover:text-primary ">
          <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          <Logout />
        </div>
        <div className=" px-2 py-3  rounded flex items-center  hover:text-primary ">
          <NotificationsIcon className="h-5 w-5 text-blue-gray-500" />
        </div>
        <div className=" px-2 py-3  rounded flex items-center  hover:text-primary ">
          <SettingsIcon className="h-5 w-5 text-blue-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
