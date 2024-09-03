import React, { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaHistory,
  FaBars,
} from "react-icons/fa";
import { Link, Outlet, useMatch } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";

const SideBar = () => {
  const matchJobPost = useMatch("/company/jobPost");
  const matchManageCompany = useMatch("/company/manageCompany");
  const matchCandidate = useMatch("/company/candidate");
  const matchTransaction = useMatch("/company/transaction");
  const [isOpen, setIsOpen] = useState(true);
  const [isManageJobOpen, setIsManageJobOpen] = useState(false);
  const [isManageCompanyOpen, setIsManageCompanyOpen] = useState(false);

  const getTitle = () => {
    if (matchJobPost) return "Manage Job Post";
    if (matchManageCompany) return "Manage Company";
    if (matchCandidate) return "Find Candidate";
    if (matchTransaction) return "Transaction History";
  };

  const title = getTitle();
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-third ${
          isOpen ? "w-64" : "w-16"
        } min-h-screen transition-all duration-300`}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        <ul className="mt-10">
          {/* Manage Job Post */}
          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageJobOpen(!isManageJobOpen)}
            >
              <FaBriefcase className="mr-4" />
              {isOpen && <span>Manage Job Post</span>}
            </div>
            {/* Dropdown */}
            {isManageJobOpen && isOpen && (
              <ul className="ml-8 transition-all duration-300">
                <li className="p-2 text-white cursor-pointer hover:bg-primary">
                  <Link to="/company/jobPost">Go to Manage Job Post</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Manage Company */}
          <li className="group">
            <div
              className={`flex items-center p-4 cursor-pointer text-white hover:bg-primary transition-colors duration-200`}
              onClick={() => setIsManageCompanyOpen(!isManageCompanyOpen)}
            >
              <FaBuilding className="mr-4" />
              {isOpen && <span>Manage Company</span>}
            </div>
            {/* Dropdown */}
            {isManageCompanyOpen && isOpen && (
              <ul className="ml-8 transition-all duration-300">
                <li className="p-2 text-white cursor-pointer hover:bg-primary">
                  <Link to="/company/manageCompany">Go to Manage Company</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Find Candidate */}
          <li className="group">
            <Link
              to="/company/candidate"
              className={`flex items-center p-4 text-white hover:bg-primary transition-colors duration-200`}
            >
              <FaUsers className="mr-4" />
              {isOpen && <span>Find Candidate</span>}
            </Link>
          </li>

          {/* Transaction History */}
          <li className="group">
            <Link
              to="/company/transaction"
              className={`flex items-center p-4 text-white hover:bg-primary transition-colors duration-200`}
            >
              <FaHistory className="mr-4" />
              {isOpen && <span>Transaction History</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Content */}

   {/*  */}
      {/* <CompanyHeader /> */}
      {/* <div className="flex-1 p-10">
          <Outlet />
        </div> */}
    </div>
  );
};

export default SideBar;
