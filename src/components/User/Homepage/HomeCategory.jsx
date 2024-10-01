import { getAllCodeByType } from "@/fetchData/AllCode";
import Cate from "../../../assets/Home/Home/cate.png";
// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPost } from "@/fetchData/Post";

function HomeCategory() {
  const [data, setData] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCodeByType("JOBTYPE");
        setData(response.data.data);

        // const response2 = await getAllPost(
        //   response.data.data.postDetailData.jobTypePostData.code
        // );
        // console.log("rp2: " + response2);
      } catch (error) {
        console.log("Error fetching job categories");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col pb-20 mt-10 mx-10 sm:mx-12 md:mx-16 lg:mx-36 font-poppins ">
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
          <CarouselContent className="flex w-full">
            {Array.isArray(data) &&
              data.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="w-full flex basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex-shrink-0"
                >
                  <Card>
                    <CardHeader className="pt-6 px-4 flex-col items-start mb-2 h-20 max-h-20 overflow-hidden">
                      <h3 className="font-bold text-base whitespace-normal">
                        {item.value}
                      </h3>
                    </CardHeader>
                    <CardBody className="overflow-visible mt-2">
                      <Image
                        alt="Card background"
                        className="object-cover rounded-lg"
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={250}
                        height={200}
                      />
                    </CardBody>
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
