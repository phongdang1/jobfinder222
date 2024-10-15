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
  // const matchDashBoard = useMatch("/admin/dashboard");
  // const matchJobType = useMatch("/admin/jobType");
  // const matchSkill = useMatch("/admin/skill");
  // const matchLevel = useMatch("/admin/level");
  // const matchWorkForm = useMatch("/admin/workForm");
  const matchCompany = useMatch("/admin/company")
  const matchPost = useMatch("/admin/post")
  const [isOpen, setIsOpen] = useState(true);
  const [isManageJobOpen, setIsManageJobOpen] = useState(false);
  const [isManageCompanyOpen, setIsManageCompanyOpen] = useState(false);

  const getTitle = () => {
    if (matchCompany) return "Manage Company";
    if (matchPost) return "Manage Post";
  };


  // const title = getTitle();

  return (
    <div className="flex">
      <div
        className={`bg-third ${isOpen ? "w-64" : "w-16"
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
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageJobOpen(!isManageJobOpen)}
              to="/admin/dashboard"
            >
              <FaBriefcase className="mr-4" />

              {isOpen && "Dashboard"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/jobType"
            >
              <FaBuilding className="mr-4" />

              {isOpen && "Manage Type Of Job"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/skill"
            >
              <FaBuilding className="mr-4" />
              {isOpen && "Manage Skill"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/level"
            >
              <FaBuilding className="mr-4" />
              {isOpen && "Manage Level"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/workForm"
            >
              <FaBuilding className="mr-4" />
              {isOpen && "Manage Working Form"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/package"
            >
              <FaBuilding className="mr-4" />
              {isOpen && "Manage Package"}
            </Link>
          </li>

        
          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
            >
              <FaBuilding className="mr-4" />
              {isOpen && <Link to="/admin/company">Manage Company</Link>}
            </div>
          </li>

          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
            >
              <FaBuilding className="mr-4" />
              {isOpen && <Link to="/admin/post">Manage Post</Link>}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
