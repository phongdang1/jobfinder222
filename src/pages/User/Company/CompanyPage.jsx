import React, { useState, useEffect } from 'react';
import Hero from "@/components/User/Company/Hero";
import PaginationComponent from "@/components/User/Company/PaginationComponent";
import CompanyCard from '@/components/User/Company/CompanyCard';
import { useSearchParams } from 'react-router-dom';
import { getAllCompanies } from '@/fetchData/User';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const URL = "/getAllCompanies";
function CompanyPage() {
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState({ company: '', typeCompany: 'Categories' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setCounts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const companiesPerPage = 6;
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const tol = Math.ceil(totalCount / companiesPerPage);


  const filterCompanies = (companies, typeCompany) => {
    const upperCaseType = typeCompany.toUpperCase();
    return companies.filter(company => 
      upperCaseType === 'CATEGORIES' || company.typeCompany.toUpperCase() === upperCaseType
    );
  };
  const fetchCompanies = async (searchKey = '', typeCompany = 'Categories') => {
  const [count, setCount] = useState();
    try {
      setLoading(true);
      const limit = companiesPerPage;
      const offset = (currentPage-1)*companiesPerPage;
      const response = await getAllCompanies(limit, offset, searchKey);
      const length = filterCompanies(response.data.data, typeCompany).length;
      if (response.data.errCode === 0) {
        setCounts(length);
        setCompanies(response.data.data);
        setCount(response.data);
        setFilteredCompanies(filterCompanies(response.data.data, typeCompany));
        const uniqueTypes = [...new Set(response.data.data.map(company => company.typeCompany.toUpperCase()))];
        setTypes(uniqueTypes.map(type => ({ name: type })));
      } else {
        setError(response.data.errMessage);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCompanies(filter.company, filter.typeCompany);
  }, [filter.company, filter.typeCompany]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);
 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* Adjusted padding for smaller screens */}
      <div className="flex flex-col w-full ">
        <Hero
          filter={filter}
          handleSearch={(searchTerm) => {
            setFilter({ ...filter, company: searchTerm });
            setCurrentPage(1);
          }}
          setFilteredCompanies={setFilteredCompanies}
        />
      </div>
      <div className="border-2 border-gray-200 mx-72 flex-grow pb-4 bg-white">
        <div className="flex justify-between items-center">
          <p className="text-nowrap font-semibold text-3xl ml-10">
            <p> All companies ({filteredCompanies.length})</p>
          </p>
          <div className="relative w-full flex justify-end pr-2 sm:pr-4 mt-8 mb-10 right-6 ">
            <select
              id="typeFilter"
              className="p-1 sm:p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primary transition duration-200 cursor-pointer"
              value={filter.typeCompany}
              onChange={(e) => {
                setFilter({ ...filter, typeCompany: e.target.value });
                setCurrentPage(1);
              }}
            >
              <option value="Categories">Categories</option>
              {types.map((type, index) => (
                <option key={index} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-2 sm:px-4">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredCompanies.length === 0 ? (
            <p className="text-center text-gray-600">
              No companies match your search criteria.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="w-full bg-white p-4 rounded-lg shadow-lg border-t-1 border-slate-200 flex items-center justify-center border border-transparent hover:border-primary transition-all"
                  >
                    <CompanyCard company={company} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Pagination Component */}
      <div className="flex justify-center mt-6">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={tol}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default CompanyPage;
