import React, { useState } from 'react';
import Hero from "@/components/User/Company/Hero";
import Filter from "@/components/User/Company/Filter";
import CompanyList from "@/components/User/Company/CompanyList";
import fptLogo from '@/assets/Home/Company/fpt1.png';
import fptTele from '@/assets/Home/Company/fpt_tele.png';

export function CompanyPage() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Company One', location: 'New York', status: 'Still recruiting', description: 'Description for Company One', image: fptLogo, category: 'Tech' },
    { id: 2, name: 'Company Two', location: 'San Francisco', status: 'Not recruiting', description: 'Description for Company Two', image: fptTele, category: 'Finance' },
    // Add more companies as needed
  ]);
  const [filter, setFilter] = useState({
    company: '',
    location: 'All',
    status: 'All',
    category: 'All'
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSearch = () => {
    // Trigger the search and update the company list
  };

  const handleResetAll = () => {
    setFilter({
      company: '',
      location: 'All',
      status: 'All',
      category: 'All'
    });
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(filter.company.toLowerCase()) &&
    (filter.location === 'All' || company.location === filter.location)
  );

  return (
    <div>
      <div className="flex items-center justify-center bg-opacity-80 mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-8 rounded-2xl">
        <div className="flex flex-col w-full max-w-7xl">
          <Hero filter={filter} handleFilterChange={handleFilterChange} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4">
          <div className="w-full md:w-1/4  p-4 rounded-lg mb-4 md:mb-0 to-purple-100">
            <Filter filter={filter} handleFilterChange={handleFilterChange} handleResetAll={handleResetAll} />
          </div>
          <div className="w-full md:w-3/4 pl-0 md:pl-4">
            <CompanyList filteredCompanies={filteredCompanies} />
          </div>
        </div>
    </div>

  );
}

export default CompanyPage;