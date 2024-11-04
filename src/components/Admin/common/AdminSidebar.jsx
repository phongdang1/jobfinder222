import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaHistory,
  FaBars,
  FaNetworkWired,
} from "react-icons/fa";
import WorkIcon from "@mui/icons-material/Work";
import { GiSkills } from "react-icons/gi";
import { MdWorkHistory, MdSpaceDashboard } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import { LuPackageSearch } from "react-icons/lu";
import { BsFilePost } from "react-icons/bs";
import { Link, useMatch } from "react-router-dom";

const AdminSidebar = ({}) => {
  // const matchDashBoard = useMatch("/admin/dashboard");
  // const matchJobType = useMatch("/admin/jobType");
  // const matchSkill = useMatch("/admin/skill");
  // const matchLevel = useMatch("/admin/level");
  // const matchWorkForm = useMatch("/admin/workForm");
  const matchCompany = useMatch("/admin/company");
  const matchPost = useMatch("/admin/post");
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
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageJobOpen(!isManageJobOpen)}
              to="/admin/dashboard"
            >
              <MdSpaceDashboard className="mr-4" />

              {isOpen && "Dashboard"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/jobType"
            >
              <FaNetworkWired className="mr-4" />

              {isOpen && "Manage Type Of Job"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/skill"
            >
              <GiSkills className="mr-4" />
              {isOpen && "Manage Skill"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/level"
            >
              <SiLevelsdotfyi className="mr-4" />
              {isOpen && "Manage Level"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/workForm"
            >
              <MdWorkHistory className="mr-4" />
              {isOpen && "Manage Working Form"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/package"
            >
              <LuPackageSearch className="mr-4" />
              {isOpen && "Manage Package"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/company"
            >
              <FaBuilding className="mr-4" />
              {isOpen && "Manage Company"}
            </Link>
          </li>

          <li className="group">
            <Link
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
              to="/admin/post"
            >
              <BsFilePost className="mr-4" />
              {isOpen && "Manage Post"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
