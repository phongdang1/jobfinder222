import React, { useState } from "react";
import { Link, useMatch, useParams } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

const CompanyHeader = () => {
  const { path } = useParams();
  const matchJobPost = useMatch("/company/jobPost");
  const matchManageCompany = useMatch("/company/manageCompany");
  const matchCandidate = useMatch("/company/candidate");
  const matchTransaction = useMatch("/company/transaction");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine title and breadcrumb based on current path
  const getTitle = () => {
    if (matchJobPost) return "Manage Job Post";
    if (matchManageCompany) return "Manage Company";
    if (matchCandidate) return "Find Candidate";
    if (matchTransaction) return "Transaction History";
    return "Dashboard";
  };

  const title = getTitle();

  return (
    <div className="flex justify-between w-full">
    <div className="flex flex-col px-10 py-20">
      {/* Breadcrump */}
      <nav className="text-gray-600 text-sm">
        <Link to="/company" className="hover:text-primary">
          Company
        </Link>
        {(matchJobPost ||
          matchManageCompany ||
          matchCandidate ||
          matchTransaction) && (
          <>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </>
        )}
      </nav>

      <h1 className="text-2xl font-bold text-primary">{title}</h1>  
    </div>
     {/* Avatar and Dropdown */}
  
     <div
     className="flex cursor-pointer m-20 h-10 justify-center items-center"
     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
   >
     <img
       src="https://via.placeholder.com/40"
       alt="Company Avatar"
       className="rounded-full w-10 h-10"
     />
     <FaCaretDown className="ml-2 text-gray-600" />
   </div>

   {isDropdownOpen && (
     <ul className="absolute right-0 top-10 mt-2 w-48 bg-white border rounded-lg shadow-lg transition-all duration-300 z-50">
       <li className="p-2 hover:bg-primary hover:text-white cursor-pointer">
         <Link to="/signup">Sign Up</Link>
       </li>
       {/* Additional items can be added here */}
     </ul>
   )}
   </div>
  );
};

export default CompanyHeader;
