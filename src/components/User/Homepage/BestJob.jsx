import JobCard from "./Common/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Pagination, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
  getAllCode,
  getAllCodeByType,
  getValueByCode,
} from "@/fetchData/AllCode";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getAllPost,
  getAllPostsInactive,
  getAllPostWithLimit,
} from "@/fetchData/Post";

function BestJob() {
  const [sort, setSort] = useState([]);
  const [sortValue, setSortValue] = useState([]);
  const [selectedType, setSelectedType] = useState("PROVINCE");
  const [isLoading, setIsLoading] = useState(true);
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const loadPosition = document.documentElement.scrollHeight - 2300;
    if (scrollPosition >= loadPosition) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchSort = async () => {
      try {
        const response = await getAllCode();
        const jobData = response.data.data;
        setSort(jobData);
        console.log("Job data", jobData);

        if (selectedType) {
          const response2 = await getAllCodeByType(selectedType);
          setSortValue(response2.data.data);
          console.log(response2.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (!isLoading) {
      fetchSort();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedType, isLoading]);

  const requiredTypes = [
    "SALARYTYPE",
    "EXPIERNCETYPE",
    "PROVINCE",
    "JOBTYPE",
    "WORKTYPE",
    "JOBLEVEL",
  ];
  const uniqueTypes = [...new Set(sort.map((item) => item.type))];

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await getAllPostWithLimit(9, 0);
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, []);

  const handleSortByValue = async (code) => {
    try {
      const response = await getAllPostsInactive(code);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-white pb-8 mb-24 mt-10 mx-10 sm:mx-12 md:mx-16 xl:mx-36 font-poppins rounded-lg border-[1px] border-primary">
      <div className="flex items-center justify-between text-4xl md:text-5xl font-forum mb-4 font-semibold text-start bg-[#4a3d8d] bg-opacity-70 rounded-t-lg p-6">
        <div>
          Best <span className="text-secondary">Job</span> For You
        </div>
        <div className="text-secondary text-base font-poppins font-light mr-4 hover:underline hover:underline-offset-1">
          <Link to="/jobs">See All Jobs </Link>
        </div>
      </div>
      {/* Sort and carousel */}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full mx-4 space-y-4 lg:space-y-0 mt-4">
        <Select
          className="flex items-center"
          onValueChange={(type) => setSelectedType(type)}
        >
          <SelectTrigger className="w-4/5 sm:w-4/5 md:w-4/5 lg:w-[200px] shrink basis-1/4 ">
            <FilterListIcon className="" />
            <SelectValue placeholder="Sort by" value={selectedType} />
          </SelectTrigger>
          <SelectContent>
            {uniqueTypes
              .filter((type) => requiredTypes.includes(type))
              .map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className="w-[95%] basis-1/2 px-20 flex-shrink">
          <Carousel className="w-[96%] xl:w-[600px]">
            <CarouselContent className="flex">
              {sortValue.map((value, index) => (
                <CarouselItem key={index} className="basis-1/3 items-center">
                  <Card
                    onClick={() => handleSortByValue(value.code)}
                    className="h-10 text-center text-black rounded-3xl cursor-pointer hover:bg-primary hover:text-white flex justify-center"
                  >
                    <button type="button" className="text-xs font-medium">
                      {value.value}
                    </button>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-2 border-primary text-primary bg-white hover:text-white hover:bg-primary" />
            <CarouselNext className="border-2 border-primary text-primary bg-white hover:text-white hover:bg-primary" />
          </Carousel>
        </div>
      </div>
      {/* Job cards */}
      <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-10 px-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex space-x-6">
              <Skeleton className="  w-[100px] h-[100px] shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : data && data.length > 0 ? (
          <JobCard expand="" data={data} />
        ) : (
          <div className="text-center mx-auto text-gray-500">
            No jobs available
          </div>
        )}
      </div>
    </div>
  );
}

export default BestJob;
