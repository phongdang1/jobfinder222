import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "@/components/Common/Authentication/Logout";
import logo from "../../../assets/images/JobFinder_logo.png";
import logoText from "../../../assets/images/JobFinder_logoText.png";
import { getUsersById } from "@/fetchData/User"; // Import the API function

const AdminHeader = () => {
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Retrieve admin ID from token or local storage
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        const adminId = payload.sub;

        // Fetch admin details using the API
        const response = await getUsersById(adminId);
        if (response?.data?.errCode === 0) {
          const { firstName, lastName } = response.data.data;
          setAdminName(`${firstName} ${lastName}`);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

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
      <div className="flex items-center space-x-4 text-third font-bold">
        <span>Welcome, {adminName}</span>
        <div className="px-4 py-3 rounded flex items-center gap-2 hover:text-primary">
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
