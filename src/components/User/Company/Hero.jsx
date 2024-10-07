import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import image from "../../../assets/illustration/home/blueberry-business-person-developing-strategy-and-planning.png";

function Hero({ filter, handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    handleSearch(searchTerm);
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
        <div className="flex justify-between text-black text-3xl sm:text-4xl md:text-5xl pb-4 sm:pb-6 md:pb-8">
          {/* text và thanh search*/}
          <div className="flex flex-col space-y-6">
            <p className="font-primary font-bold">
              Explore <span className="text-primary">100,000+</span> Featured
              Companies
            </p>
            <p className="text-xl text-gray-500">Search for the information of companies and find your best workplace</p>

             {/* thanh search */}
        <div className="flex justify-center items-center p-4">
          <div className="flex w-full max-w-7xl items-center gap-0">
            <div className="relative flex flex-1 items-center">
              <Input
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-r-none hover:border-primary transition ease-in-out duration-700"
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
          {/* image */}

          <img src={image} />
        </div>

       
      </div>
    </div>
  );
}

export default Hero;
