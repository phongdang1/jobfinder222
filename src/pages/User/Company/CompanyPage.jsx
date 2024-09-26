// import React, { useState, useEffect } from 'react';
// import axios from "../../../fetchData/axios";
// import Hero from "@/components/User/Company/Hero";
// import CompanyList from "@/components/User/Company/CompanyList";

// const URL = '/getAllCompanies';

// function CompanyPage() {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [filter, setFilter] = useState({ company: '', typeCompany: 'All' });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const numberRcdisinPage = 13;

//   const fetchCompanies = async (searchKey = '', typeCompany = 'All') => {
//     try {
//       setLoading(true);
//       const response = await axios.get(URL, {
//         params: {
//           limit: numberRcdisinPage,
//           offset: (currentPage - 1) * numberRcdisinPage,
//           searchKey
//         }
//       });
//       if (response.data.errCode === 0) {
//         setCompanies(response.data.data);
//         setFilteredCompanies(filterCompanies(response.data.data, typeCompany));

      
//         const uniqueTypes = [...new Set(response.data.data.map(company => company.typeCompany))];
//         setTypes(uniqueTypes.map(type => ({ name: type })));
//       } else {
//         setError(response.data.errMessage);
//       }
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//       setError("Error fetching data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCompanies = (companies, typeCompany) => {
//     return companies.filter(company => 
//       typeCompany === 'All' || company.typeCompany === typeCompany
//     );
//   };

//   useEffect(() => {
//     fetchCompanies(filter.company, filter.typeCompany);
//   }, [currentPage, filter.company, filter.typeCompany]);


//   const totalPages = Math.ceil(filteredCompanies.length / numberRcdisinPage);
//   const indexOfLastCompany = currentPage * numberRcdisinPage;
//   const indexOfFirstCompany = indexOfLastCompany - numberRcdisinPage;
//   const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

//   return (
//     <div>
//       <div className="flex items-center justify-center bg-opacity-80 mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-8 rounded-2xl">
//         <div className="flex flex-col w-full max-w-7xl">
//           <Hero
//             filter={filter}
//             handleSearch={(searchTerm) => {
//               setFilter({ ...filter, company: searchTerm });
//               setCurrentPage(1); 
//             }}
//             setFilteredCompanies={setFilteredCompanies}
//           />
//           <div className="relative w-full flex justify-end pr-16 mt-4">
//             <select
//               id="typeFilter"
//               className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
//               value={filter.typeCompany}
//               onChange={(e) => {
//                 setFilter({ ...filter, typeCompany: e.target.value });
//                 setCurrentPage(1);
//               }}
//             >
//               <option value="All">All Types</option>
//               {types.map((type, index) => (
//                 <option key={index} value={type.name}>
//                   {type.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : filteredCompanies.length === 0 ? (
//           <p>No companies match your search criteria.</p>
//         ) : (
//           <CompanyList filteredCompanies={currentCompanies} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default CompanyPage;


import React, { useState, useEffect } from 'react';
import axios from "../../../fetchData/axios";
import Hero from "@/components/User/Company/Hero";
import CompanyList from "@/components/User/Company/CompanyList";

const URL = '/getAllCompanies';

function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState({ company: '', typeCompany: 'Categories' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const numberRcdisinPage = 13;

  const fetchCompanies = async (searchKey = '', typeCompany = 'Categories') => {
    try {
      setLoading(true);
      const response = await axios.get(URL, {
        params: {
          limit: numberRcdisinPage,
          offset: (currentPage - 1) * numberRcdisinPage,
          searchKey
        }
      });
      if (response.data.errCode === 0) {
        setCompanies(response.data.data);
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

  const filterCompanies = (companies, typeCompany) => {
    const upperCaseType = typeCompany.toUpperCase();
    return companies.filter(company => 
      upperCaseType === 'CATEGORIES' || company.typeCompany.toUpperCase() === upperCaseType
    );
  };

  useEffect(() => {
    fetchCompanies(filter.company, filter.typeCompany);
  }, [currentPage, filter.company, filter.typeCompany]);

  const totalPages = Math.ceil(filteredCompanies.length / numberRcdisinPage);
  const indexOfLastCompany = currentPage * numberRcdisinPage;
  const indexOfFirstCompany = indexOfLastCompany - numberRcdisinPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  return (
    <div className="p-2 sm:p-4 lg:p-8"> {/* Adjusted padding for smaller screens */}
      <div className="flex items-center justify-center bg-opacity-80 mx-2 sm:mx-4 my-4 sm:my-6 rounded-2xl">
        <div className="flex flex-col w-full max-w-7xl">
          <Hero
            filter={filter}
            handleSearch={(searchTerm) => {
              setFilter({ ...filter, company: searchTerm });
              setCurrentPage(1); 
            }}
            setFilteredCompanies={setFilteredCompanies}
          />
          <div className="relative w-full flex justify-end pr-2 sm:pr-4 mt-2 sm:mt-4"> {/* Adjusted padding for smaller screens */}
            <select
              id="typeFilter"
              className="p-1 sm:p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
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
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-2 sm:px-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredCompanies.length === 0 ? (
          <p className="text-center text-gray-600">No companies match your search criteria.</p>
        ) : (
          <CompanyList filteredCompanies={currentCompanies} />
        )}
      </div>
    </div>
  );
}

export default CompanyPage;
