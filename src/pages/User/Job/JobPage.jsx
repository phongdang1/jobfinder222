import React, { useState, useEffect } from "react";
import axios from "../../../fetchData/axios";
import JobHero from "@/components/User/Jobpage/JobHero";
import JobFilter from "@/components/User/Jobpage/JobFilter";
import JobList from "@/components/User/Jobpage/JobList";
import JobPagination from "@/components/User/Jobpage/JobPagination";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loadingFilter, setLoadingFilter] = useState(false); // To manage filter loading
  const jobsPerPage = 4;
  const date = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(URL);
        if (Array.isArray(response.data.data)) {
          const activeJobs = response.data.data.filter(
            (job) =>
              job.statusCode.toUpperCase() === "approved".toUpperCase() &&
              date < new Date(job?.timeEnd)
          );
          const sortedJobs = activeJobs.sort((a, b) => b.isHot - a.isHot);
          setJobs(sortedJobs);
          setFilteredJobs(sortedJobs);
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

    setLoadingFilter(true); // Show filter loading skeleton
    setTimeout(() => {
      setFilteredJobs(filtered);
      setLoadingFilter(false); // Hide filter loading skeleton after filtering
    }, 1000); // Simulate delay
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
      levels: "",
      typeWorks: "",
      expJobs: "",
      postedOn: "All",
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
          {loading || loadingFilter ? (
            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-4 items-start"
                >
                  <Skeleton className="w-20 h-20 rounded-md" />
                  <Skeleton className="w-full h-6 sm:h-8 lg:h-10 rounded-md" />
                  <Skeleton className="w-3/4 h-4 sm:h-6 lg:h-8 rounded-md" />
                  <Skeleton className="w-1/2 h-4 sm:h-5 lg:h-6 rounded-md" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <JobList
              currentJobs={currentJobs}
              totalJobs={filteredJobs.length}
              currentPage={currentPage}
              handleSearch={handleSearch}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center ml-4">
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
