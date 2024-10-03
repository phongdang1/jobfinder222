import React from "react";
import { UserCircleIcon, Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
const AdminHeader = () => {
  return (
    <header className="bg-gray-100 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold text-gray-500">Logo</div>
      <div className="relative">
        <div className="bg-white h-10 fl px-4"></div>
      </div>
      <div className="flex items-center space-x-4 text-gray-500 font-bold">
        <span>Welcome, Admin</span>
        <button className=" px-4 py-3 rounded flex items-center gap-2 hover:bg-gray-500/10 ">
          <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          <span>Logout</span>
        </button>
        <button className=" px-2 py-3  rounded flex items-center  hover:bg-gray-500/10">
          <NotificationsIcon className="h-5 w-5 text-blue-gray-500" />
        </button>
        <button className=" px-2 py-3  rounded flex items-center  hover:bg-gray-500/10">
          <SettingsIcon className="h-5 w-5 text-blue-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
