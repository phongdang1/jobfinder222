import { useEffect, useState } from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipBox from "./TooltipBox";
import { getAllPostWithLimit } from "@/fetchData/Post";

function JobCard() {
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

  return (
    <>
      {data.map((card, index) => (
        <Card
          key={index}
          className="border-none bg-white w-full rounded-lg hover:bg-[#E6E6FA]/50  hover:outline-2 hover:outline-primary cursor-pointer"
          shadow=""
        >
          <CardBody>
            <div className="flex gap-4 items-center justify-center w-full -ml-8">
              <div className="relative bg-transparent w-1/4 shrink-0">
                <Image
                  alt="Album cover"
                  className="object-cover rounded-lg"
                  height={90}
                  shadow="md"
                  src="https://nextui.org/images/album-cover.png"
                  width={90}
                />
              </div>

              <div className="flex flex-col w-2/4">
                <TooltipProvider>
                  <Tooltip className="">
                    <TooltipTrigger className="text-start">
                      <p className="text-base font-medium">
                        {card.userPostData.userCompanyData.name}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent side={index % 3 === 0 ? "right" : "left"}>
                      <TooltipBox id={card.id} />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <p className="font-normal text-base text-gray-500">
                  {card.postDetailData.name}
                </p>
                <div className="flex gap-2 mt-2 -ml-1">
                  <Badge
                    variant="outline"
                    className="bg-white w-fit text-nowrap"
                  >
                    {card.postDetailData.salaryTypePostData.value}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white w-fit text-nowrap"
                  >
                    {card.postDetailData.provincePostData.value}
                  </Badge>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default JobCard;
