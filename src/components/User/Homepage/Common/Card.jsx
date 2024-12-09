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
import WhatshotIcon from "@mui/icons-material/Whatshot";

function JobCard({ expand, data }) {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    console.log(id);
    navigate(`job-detail/${id}`);
  };
  const date = new Date();

  return (
    <>
      {data && data.length > 0 ? (
        // Lọc các card có statusCode !== "BANNED"
        data
          .filter((card) => card.statusCode !== "BANNED")
          .map((card, index) =>
            card.isHot === 1 && date < new Date(card.timeEnd) ? ( // Đặt điều kiện đúng cách
              <div key={card.id}>
                <Card
                  className={`border-none w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer ${
                    card.isHot === 1
                      ? "bg-primary/20 hover:bg-violet-200"
                      : "bg-white"
                  }`}
                >
                  {card.isHot === 1 && (
                    <span className="absolute top right-0 bg-orange-600 text-white text-sm font-semibold px-2 py-1 rounded-tl-md rounded-bl-md">
                      <WhatshotIcon className="text-[#ffdd85] mr-2" />
                      SUPER HOT
                      <span className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-orange-600 transform rotate-90 translate-x-1 translate-y-1"></span>
                    </span>
                  )}
                  <CardBody>
                    <div className="flex gap-8 items-center justify-start w-full">
                      <div
                        onClick={() => handleNavigate(card.id)}
                        className="relative bg-transparent shrink-0"
                      >
                        <Image
                          alt="Album cover"
                          className="object-cover rounded-lg"
                          height={90}
                          shadow="md"
                          src={
                            card.userPostData?.userCompanyData?.thumbnail
                              ? card.userPostData?.userCompanyData?.thumbnail
                              : "https://nextui.org/images/album-cover.png"
                          }
                          width={90}
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-start">
                              <p
                                onClick={() => handleNavigate(card.id)}
                                className="text-base font-medium group-hover:text-primary w-3/5 max-w-xs whitespace-nowrap hover:underline hover:underline-offset-2 text-ellipsis overflow-hidden"
                              >
                                {card.userPostData.userCompanyData.name}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent
                              side={index % 3 === 0 ? "right" : "left"}
                            >
                              <TooltipBox id={card.id} />
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <p className="font-normal text-base text-gray-500 w-3/5 max-w-xs text-ellipsis overflow-hidden whitespace-nowrap">
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
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ) : null
          )
      ) : (
        <p>No data available</p> // Trường hợp không có dữ liệu
      )}
    </>
  );
}

export default JobCard;
