import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleIcon from "@mui/icons-material/People";
import PlaceIcon from "@mui/icons-material/Place";
import MapSharpIcon from "@mui/icons-material/MapSharp";
import { Separator } from "@/components/ui/separator";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipBox from "@/components/User/Homepage/Common/TooltipBox";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { getCompanyById } from "@/fetchData/Company";
import JobCard from "@/components/User/Homepage/Card";

function CompanyDetail() {
  const { id } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleNavigate = (id) => {
    console.log(id);
    navigate(`/job-detail/${id}`);
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        const response = await getCompanyById(id);
        if (response.data.errCode === 0) {
          setCompanyDetail(response.data.data);
        } else {
          setError(response.data.errMessage);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!companyDetail) {
    return <div>No company data available.</div>;
  }

  return (
    <div className="flex flex-col lg:mx-36 md:mx-20 sm:mx-10 mx-4 mb-12">
      <div className="my-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/companypage">Company Page</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary">
                {companyDetail.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-6">
        <div
          className="w-full h-60 sm:h-72 md:h-80 lg:h-96 bg-cover bg-center rounded-t-xl"
          style={{
            backgroundImage: `url(${companyDetail.coverimage})`,
          }}
        ></div>
        <div
          className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 bg-cover bg-center bg-white rounded-full absolute z-30
                lg:top-[500px] lg:left-72
                md:top-[390px] md:left-1/2 md:transform md:-translate-x-1/2
                sm:top-[400px] sm:left-1/2 sm:transform sm:-translate-x-1/2
                top-[370px] left-1/2 transform -translate-x-1/2"
          style={{
            backgroundImage: `url(${companyDetail.thumbnail})`,
          }}
        ></div>

        <div className="flex text-secondary bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 lg:h-[150px] md:h-[200px] sm:h-[300px] h-[280px] shadow-lg mb-8 rounded-b-xl relative">
          <div className="my-auto justify-center lg:ml-72 md:mx-auto sm:mx-auto mx-auto">
            <div className="text-2xl md:text-3xl font-medium mb-4 lg:text-left md:text-center sm:text-center text-center">
              {companyDetail.name}
            </div>
            <div className="flex gap-3 md:gap-4 sm:gap-2 lg:flex-row md:flex-col sm:flex-col flex-col md:items-center sm:items-center items-center">
              <div className="flex gap-2">
                <LanguageIcon />
                <div>
                  <a href={companyDetail.website}>{companyDetail.website}</a>
                </div>
              </div>

              <div className="flex gap-2">
                <PeopleIcon />
                <div className="flex gap-1">
                  {companyDetail.amountEmployer} <div>employees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="lg:grid lg:grid-cols-3 md:flex md:flex-col lg:mb-8 md:mb-12 sm:mb-12 mb-12">
        {/* Left */}
        <div className="col-span-2 px-4 sm:px-6">
          {" "}
          {/* Added padding for small screens */}
          {/* About Us */}
          <div>
            <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
              <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
                <p>Company Description</p>
              </div>
            </div>
            <div className="px-6 pt-4 shadow-xl rounded-b-lg pb-4 overflow-y-auto bg-white">
              {companyDetail.description}
            </div>
          </div>
          {/* Job Recruitment Section */}
          <div className="mt-8 shadow-xl">
            <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
              <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
                <p>Job Recruitment</p>
              </div>
            </div>
          </div>
          {/* Job Listings */}
          <div className="px-6 pt-4 shadow-xl rounded-b-lg pb-4 overflow-y-auto bg-white space-y-4">
            <div>
              <Card
                className="border-none bg-white w-full rounded-lg hover:bg-[#E6E6FA]/50 group hover:outline-2 hover:outline-primary cursor-pointer"
                shadow=""
              >
                <CardBody>
                  <div className="flex gap-8 items-center justify-start w-full ">
                    <div
                      onClick={() => handleNavigate(companyDetail.id)}
                      className="relative bg-transparent shrink-0"
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
                              onClick={() =>
                                handleNavigate(companyDetail.postData[0]?.id)
                              }
                              className="text-base font-medium group-hover:text-primary w-fit hover:underline hover:underline-offset-2"
                            >
                              {companyDetail.postData[0]?.postDetailData?.name}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent side={"right"}>
                            <TooltipBox id={companyDetail.postData[0]?.id} />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <p className="font-normal text-base text-gray-500">
                        {companyDetail.name}
                      </p>
                      <div className="flex mt-2 -ml-1 items-center relative w-full space-x-2">
                        <Badge
                          variant="outline"
                          className="bg-white w-fit text-nowrap rounded-lg"
                        >
                          {
                            companyDetail.postData[0]?.postDetailData
                              ?.salaryTypePostData?.value
                          }
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white w-fit text-nowrap rounded-lg"
                        >
                          {
                            companyDetail.postData[0]?.postDetailData
                              ?.provincePostData?.value
                          }
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="col-span-1 px-4 sm:px-6">
          <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
            <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
              <p>Contact Information</p>
            </div>
          </div>
          <div className="px-6 py-6 h-full shadow-xl rounded-b-lg bg-white">
            <div className="mb-2 font-medium flex gap-2">
              <PlaceIcon className="text-primary" />
              Address
            </div>
            <p className="text-sm">{companyDetail.address}</p>
            <Separator className="my-4 h-[2px]" />
            <div>
              <div className="flex gap-2 mb-4">
                <MapSharpIcon className="text-primary" />
                <p className="font-medium">Watch on Map</p>
              </div>
              <div className="pb-4 mx-auto md:w-full w-full">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0463016466124!2d105.7802028750315!3d21.030833280619014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b355336d23%3A0xb337376aa7a9622f!2zVG_DoCBuaMOgIEZQVCBD4bqndSBHaeG6pXk!5e0!3m2!1svi!2s!4v1724638248739!5m2!1svi!2s`}
                  width="100%"
                  height="350"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
