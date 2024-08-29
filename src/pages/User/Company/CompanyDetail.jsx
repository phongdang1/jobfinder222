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
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PlaceIcon from "@mui/icons-material/Place";
import MapSharpIcon from "@mui/icons-material/MapSharp";

function CompanyDetail() {
  const companyDetail = [
    {
      name: "FPT Software",
      numberOfEmployees: "100",
      aboutus:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, dicta illum alias possimus consequatur maxime voluptatem aspernatur doloremque nesciunt nemo dolore explicabo soluta ipsam quasi blanditiis harum velit obcaecati tempora.",
      link: "https://fptsoftware.com/",
      address:
        "FPT Cau Giay Building, Duy Tan Street, Dich Vong Hau Ward, Cau Giay District, Hanoi City, Vietnam",
    },
  ];
  return (
    <div className="flex flex-col mx-36 ">
      <div className="my-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Company name</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="">
        <div
          className="w-full h-80 bg-cover bg-center rounded-t-xl"
          style={{
            backgroundImage: `url(
                "https://imgcdn.tapchicongthuong.vn/tcct-media/24/6/19/lai-tang-vot--von-hoa-cua-tap-doan-fpt-len-muc-cao-ky-luc_6672e333a42c2.jpg"
              )`,
          }}
        >
          <div
            className="h-40 w-40 bg-cover bg-center bg-white rounded-full absolute
                lg:top-[400px] lg:left-72
                md:top-[340px] md:left-1/2 md:transform md:-translate-x-1/2
                sm:top-[400px] sm:left-1/2 sm:transform sm:-translate-x-1/2"
            style={{
              backgroundImage: `url(
                "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FPT.png"
              )`,
            }}
          ></div>
        </div>

        <div
          className="flex text-secondary bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90
                     lg:h-[150px] md:h-[200px] sm:h-[300px] shadow-lg mb-8 rounded-b-xl"
        >
          {companyDetail.map((company, index) => (
            <div
              key={index}
              className="flex flex-col mx-auto my-auto w-[600px]"
            >
              <div className="text-3xl font-medium mb-4 lg:text-left md:text-center sm:text-center">
                {company.name}
              </div>
              <div className="flex gap-10 md:gap-4 sm:gap-2 lg:flex-row md:flex-col sm:flex-col md:items-center sm:items-center">
                <div className="flex gap-2">
                  <LanguageIcon />
                  <div>
                    <a href={company.link}>{company.link}</a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <LanguageIcon />
                  <div>
                    <a href={company.link}>{company.link}</a>
                  </div>
                </div>

                <div className="flex gap-2">
                  <PeopleIcon />
                  <div className="flex gap-1">
                    {company.numberOfEmployees} <div>employees</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* company info */}
      <div className="lg:grid lg:grid-cols-3 md:flex md:flex-col gap-8 lg:mb-8 md:mb-[600px] sm:mb-[600px]">
        {/* left */}
        <div className="col-span-2 ">
          {/* aboutus */}
          <div>
            <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
              <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
                <p>Company Description</p>
              </div>
            </div>
            {companyDetail.map((company, index) => (
              <div
                key={index}
                className="px-6 h-60 pt-4 shadow-xl rounded-b-lg pb-4"
              >
                {company.aboutus}
              </div>
            ))}
          </div>
          {/* Recruitment */}
          <div className="mt-8 shadow-xl">
            <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
              <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
                <p>Job Recruitment</p>
              </div>
            </div>
            {/* card */}
            <div>
              {/* Search */}
              <div className="flex justify-center items-center p-4">
                <div className="flex w-full max-w-7xl items-center gap-0">
                  <div className="relative flex flex-1 items-center">
                    <Input
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-r-none"
                      type="text"
                      placeholder="What position are you looking for?"
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <SearchIcon sx={{ color: "gray" }} />
                    </div>
                  </div>
                  <div className="relative flex flex-1 items-center">
                    <Input
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-l-none rounded-r-none"
                      type="text"
                      placeholder="Location"
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FmdGoodOutlinedIcon sx={{ color: "gray" }} />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="p-3 bg-third hover: text-white rounded-md rounded-l-none flex-shrink-0"
                  >
                    <p className="text-white">Search Job</p>
                  </Button>
                </div>
              </div>
              {/* card */}
              <div className="p-4">
                {companyDetail.map((company, index) => (
                  <div
                    key={index}
                    className="bg-slate-200 w-full shadow-md rounded-b-lg p-4 pr-3 flex flex-col space-y-4"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={company.link}
                        alt="Job"
                        className="w-16 h-16 mr-3 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-black font-medium text-sm mb-1">
                          FPT Software.
                        </p>
                        <div className="flex items-center">
                          <h4 className="text-lg font-semibold">
                            Software Developer
                          </h4>
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs font-semibold rounded-full ml-4">
                            Full-time
                          </span>
                        </div>
                        <div className="flex flex-row items-center text-gray-700 text-sm mt-2 space-x-4">
                          <div className="flex items-center space-x-1">
                            <WorkOutlineOutlinedIcon
                              className="text-gray-600"
                              fontSize="small"
                            />
                            <p>Senior</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FmdGoodOutlinedIcon
                              className="text-gray-600"
                              fontSize="small"
                            />
                            <p>Hanoi</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <AttachMoneyIcon
                              className="text-gray-600"
                              fontSize="small"
                            />
                            <p>20-30 million</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <AccessTimeOutlinedIcon
                              className="text-gray-600"
                              fontSize="small"
                            />
                            <p>2 days ago</p>
                          </div>
                        </div>
                        <div className="text-gray-700 text-sm mt-2">
                          <p>
                            This role involves developing, testing, and
                            maintaining software solutions for clients. You will
                            work closely with cross-functional teams.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="col-span-1">
          <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
            <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
              <p>Contact Information</p>
            </div>

            <div>
              {companyDetail.map((company, index) => (
                <div
                  key={index}
                  className="px-6 h-full pt-4 shadow-xl rounded-b-lg"
                >
                  <div className="mb-2 font-medium flex gap-2">
                    <PlaceIcon className="text-primary" />
                    Address
                  </div>
                  <p className="text-sm">{company.address}</p>
                  <Separator className="my-4 h-[2px]" />
                  <div className="">
                    <div className="flex gap-2 mb-4">
                      <MapSharpIcon className="text-primary" />
                      <p className="font-medium">Watch on Map</p>
                    </div>
                    <div className="pb-4 mx-auto md:w-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0463016466124!2d105.7802028750315!3d21.030833280619014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b355336d23%3A0xb337376aa7a9622f!2zVG_DoCBuaMOgIEZQVCBD4bqndSBHaeG6pXk!5e0!3m2!1svi!2s!4v1724638248739!5m2!1svi!2s"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
