import React, { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import PaginationComponent from "@/components/User/Company/PaginationComponent";

const CompanyList = ({ filteredCompanies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  // Get the total number of companies after filtering
  const totalCompanies = filteredCompanies.length;

  // Calculate the index of the last and first company for pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  // Get the companies to display on the current page
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Calculate total pages
  const totalPages = Math.ceil(totalCompanies / companiesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredCompanies]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-left text-gray-600 text-xl font-semibold">
          {totalCompanies} companies found
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCompanies.map(company => (
          <div
            key={company.id}
            className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-center border border-transparent hover:border-primary transition-all"
          >
            <CompanyCard company={company} />
          </div>
        ))}
      </div>
      {/* Pagination Component */}
      <div className="flex justify-center mt-6">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CompanyList;
