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

function BestJob() {
  return (
    <div className="flex flex-col mx-4 md:mx-20 pt-10 items-center justify-center">
      <div className="text-4xl md:text-5xl font-forum mb-4 font-semibold text-center">
        Best <span className="text-primary">Job</span> For You
      </div>
      {/* sort and carousel */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:space-y-0">
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

        <div className="w-full md:w-auto basis-1/2 pl-12">
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
      <div className="w-full">
        <JobCard />
      </div>
    </div>
  );
}

export default BestJob;
