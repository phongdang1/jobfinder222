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

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { getAllCode, getAllCodeByType } from "@/fetchData/AllCode";

function BestJob() {
  const [sort, setSort] = useState([]);
  const [sortValue, setSortValue] = useState([]);
  const [selectedType, setSelectedType] = useState("PROVINCE");

  useEffect(() => {
    const fetchSort = async () => {
      try {
        const response = await getAllCode();
        const jobData = response.data.data;
        setSort(jobData);

        if (selectedType) {
          const response2 = await getAllCodeByType(selectedType);
          setSortValue(response2.data.data);
          console.log("type  " + selectedType);
          console.log(
            "sort value ",
            JSON.stringify(response2.data.data, null, 2)
          );
        } else {
          console.log("Error!!!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSort();
  }, [selectedType]);

  const requiredTypes = [
    "SALARYTYPE",
    "EXPTYPE",
    "PROVINCE",
    "JOBTYPE",
    "WORKTYPE",
    "JOBLEVEL",
  ];
  const uniqueTypes = [...new Set(sort.map((item) => item.type))];

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
      {/* sort and carousel */}
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
                  <Card className="h-10 text-center text-black rounded-3xl cursor-pointer hover:bg-primary hover:text-white flex justify-center">
                    <button className="text-xs font-normal ">
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
      {/* job cards */}
      <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-10 px-4">
        <JobCard expand="" />
      </div>
      {/* pagination */}
      {/* <div className="flex flex-col gap-5 mx-auto">
        <Pagination
          variant="border"
          showControls
          total={10}
          initialPage={1}
          color="secondary"
        />
      </div> */}
    </div>
  );
}

export default BestJob;
