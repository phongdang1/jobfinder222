import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function JobHero({ handleSearch }) {
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
    <div>
      {/* Search Section */}
      <div className="flex flex-col justify-center w-full max-w-7xl text-center md:text-left px-4">
        <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left px-4">
          <div className="text-black text-4xl sm:text-5xl md:text-6xl pb-4 sm:pb-6 md:pb-8">
            <p className="font-poppins whitespace-nowrap">
              Explore
              <span className="text-primary font-forum text-5xl sm:text-6xl md:text-7xl font-medium ml-2">
                100,000+
              </span>
              <span className="font-poppins ml-2 text-black">Featured</span>
              <span className="text-primary font-forum text-5xl sm:text-6xl md:text-7xl font-medium ml-2">
                Companies
              </span>
            </p>
          </div>
          <div className="font-poppins text-gray-500 text-lg sm:text-xl pb-4 sm:pb-6 md:pb-8 md:whitespace-nowrap">
            Thousands of jobs in the computer, engineering and technology
            sectors are waiting for you.
          </div>
        </div>
        <div className="flex justify-center items-center p-4">
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
                <SearchIcon sx={{ color: "gray" }} />
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
                <FmdGoodOutlinedIcon sx={{ color: "gray" }} />
              </div>
            </div>
            <Button
              type="button"
              onClick={handleSearchSubmit}
              className="p-3 bg-third hover:text-white rounded-md rounded-l-none flex-shrink-0"
            >
              <p className="text-white">Search Job</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobHero;
