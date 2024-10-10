import { useState } from "react";
import JobCard from "./JobCard";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Button } from "@/components/ui/button";

const JobList = ({ currentJobs, totalJobs, currentPage, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationInputChange = (e) => {
    setLocationTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    handleSearch({ searchTerm, locationTerm });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col justify-start text-right mb-4">
        <div className="flex w-full max-w-7xl items-center gap-0">
          <div className="relative flex flex-1 items-center">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-r-none"
              type="text"
              placeholder="What position are you looking for?"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon className="text-primary" />
            </div>
          </div>
          <div className="relative flex flex-1 items-center">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-l-none rounded-r-none"
              type="text"
              placeholder="Location"
              value={locationTerm}
              onChange={handleLocationInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FmdGoodOutlinedIcon className="text-primary" />
            </div>
          </div>
          <Button
            className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1 rounded-l-none"
            variant="outline"
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </div>
        <div className="flex justify-end text-gray-600 text-sm font-normal my-2 mr-2 ">
          Found <p className="text-primary mx-1">{totalJobs}</p> jobs match your
          search
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {currentJobs.map((job) => (
          <div key={job.id} className="w-full">
            <JobCard job={job} currentPage={currentPage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
