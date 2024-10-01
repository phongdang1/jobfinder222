// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom'; // For handling query params
// import CompanyCard from './CompanyCard';
// import PaginationComponent from "@/components/User/Company/PaginationComponent";

// const CompanyList = ({ filteredCompanies }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   // Get current page from query params, or default to 1
//   const initialPage = Number(searchParams.get('page')) || 1;
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const companiesPerPage = 6;

//   // Get the total number of companies after filtering
//   const totalCompanies = filteredCompanies.length;

//   // Calculate the index of the last and first company for pagination
//   const indexOfLastCompany = currentPage * companiesPerPage;
//   const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

//   // Get the companies to display on the current page
//   const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

//   // Calculate total pages
//   const totalPages = Math.ceil(totalCompanies / companiesPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     setSearchParams({ page: pageNumber }); // Update the URL with the current page
//   };

//   // When the component mounts or filtered companies change, check for page in URL
//   useEffect(() => {
//     const page = Number(searchParams.get('page')) || 1;
//     setCurrentPage(page);
//   }, [filteredCompanies, searchParams]);

//   return (
//     <div className="mt-8">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-left text-gray-600 text-xl font-semibold">
//           {totalCompanies} companies found
//         </div>
//         <div className="text-left text-gray-600 text-xl font-semibold">
//           {indexOfFirstCompany} indexOfFirstCompany
//         </div>
//         <div className="text-left text-gray-600 text-xl font-semibold">
//           {indexOfLastCompany} indexOfLastCompany
//         </div>
//         <div className="text-left text-gray-600 text-xl font-semibold">
//           {currentPage} currentPage
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {currentCompanies.map(company => (
//           <div
//             key={company.id}
//             className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-center border border-transparent hover:border-primary transition-all"
//           >
//             <CompanyCard company={company} />
//           </div>
//         ))}
//       </div>
//       {/* Pagination Component */}
//       <div className="flex justify-center mt-6">
//         <PaginationComponent
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default CompanyList;
