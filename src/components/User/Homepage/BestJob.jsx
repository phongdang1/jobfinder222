import JobCard from "./Card";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";

function BestJob() {
  return (
    <div className="flex flex-col pb-8 mb-24 mt-10 mx-10 sm:mx-12 md:mx-16 lg:mx-28 font-poppins rounded-lg border-[1px] border-primary">
      <div className="flex items-center justify-between text-4xl md:text-5xl font-forum mb-4 font-semibold text-start bg-[#4a3d8d] bg-opacity-70 rounded-t-lg p-4">
        <div>
          Best <span className="text-secondary">Job</span> For You
        </div>
        <div className="text-secondary text-base font-poppins font-light mr-4">
          <Link to="/jobs">See All Jobs </Link>
        </div>
      </div>
      {/* sort and carousel */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-4 md:space-y-0 mt-4">
        <div className="w-full md:w-auto ">
          <Select>
            <SelectTrigger className="w-full md:w-80 shrink basis-1/4">
              <FilterListIcon className="mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Location</SelectItem>
              <SelectItem value="dark">Wage</SelectItem>
              <SelectItem value="system">Experience</SelectItem>
              <SelectItem value="occupation">Occupation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto basis-1/2 pr-12 flex-shrink">
          <Carousel className="w-full sm:w-[300px] md:w-[600px]">
            <CarouselContent className="">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className=" basis-1/3">
                  <div className="">
                    <Card className="h-10 text-center rounded-3xl">
                      <CardContent className="flex mt-2 items-center justify-center text-center">
                        <div className="text-base font-medium">{index + 1}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      {/* job cards */}
      <div className="w-full px-4">
        <JobCard />
      </div>
      <div className="items-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default BestJob;
