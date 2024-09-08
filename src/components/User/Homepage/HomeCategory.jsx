import Cate from "../../../assets/Home/cate.png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function HomeCategory() {
  return (
    <div className="flex flex-col pb-20 mt-10 mx-10 sm:mx-12 md:mx-16 lg:mx-28 font-poppins ">
      <div className="text-4xl md:text-5xl font-forum mb-8 font-semibold text-start">
        Occupation <span className="text-primary">Category</span>
      </div>

      <div className="flex">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-screen-2xl mx-auto flex"
        >
          <CarouselContent className="flex w-full ">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="w-full basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex-shrink-0"
              >
                <Card className="h-dull text-center p-4">
                  <div className="text-xl font-medium mb-8">
                    Category {index + 1}
                  </div>

                  <div
                    style={{ backgroundImage: `url(${Cate})` }}
                    className="w-full h-48 bg-cover bg-center bg-slate-100 mx-auto"
                  ></div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-9 top-1/2 z-30 h-12 w-12" />
          <CarouselNext className="absolute -right-5 top-1/2 z-30 h-12 w-12" />
        </Carousel>
      </div>
    </div>
  );
}

export default HomeCategory;
