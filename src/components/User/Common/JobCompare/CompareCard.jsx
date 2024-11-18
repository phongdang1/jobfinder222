import { ChartTooltipContent } from "@/components/ui/chart";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import TooltipBox from "../../Homepage/Common/TooltipBox";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

function CompareCard({ data }) {
  const [id, setId] = useState();
  const navigate = useNavigate();
  const handleId = (id) => {
    setId(id);
    // navigate(`/jobsComparison/`)
  };
  return (
    <>
      {data.map((job, index) => (
        <Card
          key={index}
          className="border-none bg-white w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer"
          onClick={() => handleId(index)}
        >
          <CardBody>
            <div className="flex gap-6 items-center">
              <div className="relative bg-transparent shrink-0">
                <Image
                  alt="Job cover"
                  className="object-cover rounded-lg"
                  height={90}
                  shadow="md"
                  src= {
                    job.userPostData?.userCompanyData?.thumbnail
                      ? job.userPostData?.userCompanyData?.thumbnail
                      : "https://nextui.org/images/album-cover.png"
                  } // Replace with actual image URL
                  width={90}
                />
              </div>
              <div className="flex flex-col w-full">
                <p className="text-base font-medium group-hover:text-primary">
                  {job.userPostData.userCompanyData.name}
                </p>

                <p className="font-normal text-base text-gray-500">
                  {job.postDetailData.name}
                </p>
                <div className="flex mt-2 -ml-1 items-center relative w-full space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-white w-fit text-nowrap rounded-lg"
                  >
                    {job.postDetailData.salaryTypePostData.value}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-white w-fit text-nowrap rounded-lg"
                  >
                    {job.postDetailData.provincePostData.value}
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

export default CompareCard;
