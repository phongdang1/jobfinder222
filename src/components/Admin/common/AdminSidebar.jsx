import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaHistory,
  FaBars,
} from "react-icons/fa";
import { Link, useMatch } from "react-router-dom";

const AdminSidebar = ({}) => {
  const matchDashBoard = useMatch("/admin/dashboard");
  const matchJobType = useMatch("/admin/jobType");
  const matchSkill = useMatch("/admin/skill");
  const matchLevel = useMatch("/admin/level");
  const matchWorkForm = useMatch("/admin/workForm");

  const [isOpen, setIsOpen] = useState(true);
  const [isManageJobOpen, setIsManageJobOpen] = useState(false);
  const [isManageCompanyOpen, setIsManageCompanyOpen] = useState(false);

  const getTitle = () => {
    if (matchDashBoard) return "DashBoard";
    if (matchJobType) return "Manage Type Of Job";
    if (matchSkill) return "Manage Skill";
    if (matchLevel) return "Manage Level";
    if (matchWorkForm) return "Manage Working Form";
  };

  const title = getTitle();

  return (
    <div className="flex">
      <div
        className={`bg-third ${
          isOpen ? "w-64" : "w-16"
        } min-h-screen transition-all duration-300`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>
        <ul className="mt-10">
          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageJobOpen(!isManageJobOpen)}
            >
              <FaBriefcase className="mr-4" />

              {isOpen && <Link to="/admin/dashboard">Dashboard</Link>}
            </div>
          </li>

          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
            >
              <FaBuilding className="mr-4" />

              {isOpen && <Link to="/admin/jobType">Manage Type Of Job</Link>}
            </div>
          </li>

          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
            >
              <FaBuilding className="mr-4" />
              {isOpen && <Link to="/admin/skill">Manage Skill</Link>}
            </div>
          </li>

          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
            >
              <FaBuilding className="mr-4" />
              {isOpen && <Link to="/admin/level">Manage Level</Link>}
            </div>
          </li>

          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
            >
              <FaBuilding className="mr-4" />
              {isOpen && <Link to="/admin/workForm">Manage Working Form</Link>}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
