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
    <div className="flex flex-col mx-16 pt-10">
      <div className="text-5xl font-forum mb-4 font-semibold ml-20">
        Best <span className="text-5xl text-primary ">Job</span> For You
      </div>
      {/* sort */}
      <div className="mb-4 mx-20 flex justify-between">
        <div>
          <Select>
            <SelectTrigger className="w-80 flex">
              <FilterListIcon className="" />
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
        <div>
          <Carousel className="w-full max-w-md mr-32">
            <CarouselContent className="-ml-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index} className="pl-1 basis-1/3">
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
      {/* card */}
      <div className="-mt-10">
        <JobCard />
      </div>
    </div>
  );
}

export default BestJob;
