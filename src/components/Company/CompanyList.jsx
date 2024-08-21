import React, { useState } from 'react';
import CompanyCard from './CompanyCard';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const CompanyList = ({ filteredCompanies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  // Get the companies to display on the current page
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-start items-center mb-4">
        <div className="text-left text-gray-600 text-xl font-semibold">
          {filteredCompanies.length} companies found
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {currentCompanies.map(company => (
          <div key={company.id} className="w-full">
            <CompanyCard company={company} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 mb-5">
        <nav className="flex items-center space-x-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    active={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </nav>
      </div>
    </div>
  );
};

export default CompanyList;