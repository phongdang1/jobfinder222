import { useState } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { Button } from "@/components/ui/button";
import { Card, CardBody, Image } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipBox from "../Homepage/Common/TooltipBox";
import { Favorite } from "@mui/icons-material";

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
            <Card className="border-none bg-white w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer">
              <CardBody>
                <div className="flex gap-8 items-center justify-start w-full ">
                  <div className="relative bg-transparent shrink-0">
                    <Image
                      alt="Job cover"
                      className="object-cover rounded-lg"
                      height={90}
                      shadow="md"
                      src="https://nextui.org/images/album-cover.png" // Replace with actual image URL
                      width={90}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <p className="text-base font-medium group-hover:text-primary">
                            {job.userPostData.userCompanyData.name}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <TooltipBox id={job.id} />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="font-normal text-base text-gray-500">
                      {job.postDetailData.name}
                    </p>
                    <div className="flex mt-2 -ml-1 items-center relative w-full space-x-2">
                      <Badge
                        variant="outline"
                        className="bg-white w-fit text-nowrap rounded-lg"
                      >
                        {job.postDetailData.salaryTypePostData.value}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-white w-fit text-nowrap rounded-lg"
                      >
                        {job.postDetailData.provincePostData.value}
                      </Badge>
                      {/* <div className="flex gap-2 items-center ml-auto absolute -right-1">
                        <Button
                          className="bg-secondary border-1 h-9 rounded-md border-primary text-primary hover:bg-primary hover:text-secondary "
                          variant="outline"
                        >
                          Apply
                        </Button>
                        <Button
                          className="bg-secondary border-1 h-9 rounded-md border-primary text-primary hover:bg-primary hover:text-secondary "
                          variant="outline"
                        >
                          <Favorite />
                        </Button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
