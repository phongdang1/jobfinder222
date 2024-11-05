import React, { useState, useEffect } from "react";
import axios from "../../../fetchData/axios";
import JobHero from "@/components/User/Jobpage/JobHero";
import JobFilter from "@/components/User/Jobpage/JobFilter";
import JobList from "@/components/User/Jobpage/JobList";
import JobPagination from "@/components/User/Jobpage/JobPagination";

const URL = "/getAllPost";

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  const [filter, setFilter] = useState({
    jobName: "",
    location: "",
    levels: [],
    typeWorks: [],
    expJobs: [],
    postedOn: "All",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        if (Array.isArray(response.data.data)) {
          const activeJobs = response.data.data.filter(job => job.statusCode.toUpperCase() === "active".toUpperCase());
          setJobs(activeJobs);
          setFilteredJobs(activeJobs);
        } else {
          console.error("Unexpected data format:", response.data);
          setError("Error fetching data. Please try again later.");
          setJobs([]);
          setFilteredJobs([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Error fetching data. Please try again later.");
        setJobs([]);
        setFilteredJobs([]);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const jobNameMatch =
        filter.jobName === "" ||
        job.postDetailData.name
          .toLowerCase()
          .includes(filter.jobName.toLowerCase());
      const locationMatch =
        filter.location === "" ||
        job.postDetailData.provincePostData.value
          .toLowerCase()
          .includes(filter.location.toLowerCase());
      const levelMatch =
        filter.levels.length === 0 ||
        filter.levels.includes(job.postDetailData.jobLevelPostData.value);
      const typeWorkMatch =
        filter.typeWorks.length === 0 ||
        filter.typeWorks.includes(job.postDetailData.workTypePostData.value);
      const expJobMatch =
        filter.expJobs.length === 0 ||
        filter.expJobs.includes(job.postDetailData.expTypePostData.value);
      const postedOnMatch = filter.postedOn === "All";

      return (
        jobNameMatch &&
        locationMatch &&
        levelMatch &&
        typeWorkMatch &&
        expJobMatch &&
        postedOnMatch
      );
    });

    setFilteredJobs(filtered);
  }, [filter, jobs]);

  const handleFilterChange = (newFilter) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  };

  const handleSearch = ({ searchTerm, locationTerm }) => {
    setFilter({
      ...filter,
      jobName: searchTerm,
      location: locationTerm,
    });
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleResetAll = () => {
    setFilter({
      jobName: "",
      location: "",
      levels: "", // Set as a string for single value selection in RadioGroup
      typeWorks: "", // Reset to an empty string
      expJobs: "", // Reset to an empty string
      postedOn: "All", // Reset to default value
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-opacity-80 rounded-2xl mb-6">
        <div className="flex flex-col w-full">
          <JobHero />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4">
        <div className="w-full md:w-1/4  rounded-lg mb-4 md:mb-0">
          <JobFilter
            filter={filter}
            handleFilterChange={handleFilterChange}
            handleResetAll={handleResetAll}
          />
        </div>
        <div className="w-full md:w-3/4 pl-0 md:pl-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <JobList
                    currentJobs={currentJobs}
                    totalJobs={filteredJobs.length}
                    currentPage={currentPage}
                    handleSearch={handleSearch}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center ml-4">
        {" "}
        {/* Add this wrapper for indentation */}
        <JobPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default JobPage;
