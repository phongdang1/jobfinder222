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
import { Link } from "react-router-dom";
import WhatshotIcon from "@mui/icons-material/Whatshot";
// import GlobalLoading from "@/components/GlobalLoading/GlobalLoading";

const JobList = ({ currentJobs, totalJobs, currentPage, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false); // New state to control loading
  const date = new Date();

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleLocationInputChange = (e) => {
  //   setLocationTerm(e.target.value);
  // };

  const handleSearchSubmit = async () => {
    // setIsSubmitting(true); // Start loading when search is submitted
    handleSearch({ searchTerm, locationTerm });
    // try {
    //   await handleSearch({ searchTerm, locationTerm });
    // } catch (error) {
    //   console.error("Search failed:", error);
    // } finally {
    //   setIsSubmitting(false); // Stop loading after the search is complete
    // }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* <GlobalLoading isSubmiting={isSubmitting} />{" "} */}
      {/* Display loading animation */}
      <div className="flex flex-col justify-start text-right mb-4">
        <div className="flex w-full max-w-7xl items-center gap-0">
          <div className="relative flex flex-1 items-center">
            <Input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-r-none"
              type="text"
              placeholder="Search by post name..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon className="text-primary" />
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
        {currentJobs.map(
          (job) =>
            date < new Date(job.timeEnd) && (
              <div key={job.id} className="w-full">
                <Card
                  className={`border-none w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer ${
                    job.isHot === 1
                      ? "bg-primary/20 hover:bg-violet-200"
                      : "bg-white"
                  }`}
                >
                  {job.isHot === 1 && (
                    <span className="absolute top-2 right-0 bg-orange-600 text-white text-sm font-semibold px-2 py-1 rounded-tl-md rounded-bl-md">
                      <WhatshotIcon className="text-[#ffdd85] mr-2" />
                      SUPER HOT
                      <span className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-orange-600 transform rotate-90 translate-x-1 translate-y-1"></span>
                    </span>
                  )}

                  <CardBody>
                    {/* sửa lại thẻ Link bằng thẻ div  */}
                    <div
                      // to={`/job-detail/${job.id}`}
                      className="flex gap-8 items-center justify-start w-full "
                    >
                      <div className="relative bg-transparent shrink-0">
                        <Image
                          alt="Job cover"
                          className="object-cover rounded-lg"
                          height={90}
                          shadow="md"
                          src={
                            job.userPostData?.userCompanyData?.thumbnail
                              ? job.userPostData?.userCompanyData?.thumbnail
                              : "https://nextui.org/images/album-cover.png"
                          } // Replace with actual image URL
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
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default JobList;
