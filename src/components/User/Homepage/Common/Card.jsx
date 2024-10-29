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
import {
  Favorite,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function JobCard({ expand, data }) {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    console.log(id);
    navigate(`job-detail/${id}`);
  };

  return (
    <>
      {data?.map((card, index) => (
        <div key={index}>
          <Card
            className="border-none bg-white w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer"
            shadow=""
          >
            <CardBody>
              <div className="flex gap-8 items-center justify-start w-full ">
                <div
                  onClick={() => handleNavigate(card.id)}
                  className="relative bg-transparent  shrink-0"
                >
                  <Image
                    alt="Album cover"
                    className="object-cover rounded-lg"
                    height={90}
                    shadow="md"
                    src="https://nextui.org/images/album-cover.png"
                    width={90}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <TooltipProvider>
                    <Tooltip className="">
                      <TooltipTrigger className="text-start">
                        <p
                          onClick={() => handleNavigate(card.id)}
                          className="text-base font-medium group-hover:text-primary w-fit"
                        >
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
                  <div className="flex mt-2 -ml-1 items-center relative w-full space-x-2">
                    <Badge
                      variant="outline"
                      className="bg-white w-fit text-nowrap rounded-lg"
                    >
                      {card.postDetailData.salaryTypePostData.value}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-white w-fit text-nowrap rounded-lg"
                    >
                      {card.postDetailData.provincePostData.value}
                    </Badge>

                    {expand === "" ? (
                      ""
                    ) : (
                      <div className="flex gap-2 items-center ml-auto absolute -right-1">
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
}

export default JobCard;
