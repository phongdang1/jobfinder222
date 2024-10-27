import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import React, { useState } from "react";
const DashboardCompany = () => {
  const jobData = []; // Mảng chứa dữ liệu công việc (hiện tại là rỗng)
  const [selectedOption, setSelectedOption] = useState("Thời gian");
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Row: Left Column with 2 Cards */}
        <div className="space-y-4">
          <Card className="relative">
            <div
              className="absolute inset-0 bg-right bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/premium-vector/male-character-working-with-laptop_967534-4.jpg?w=1380')",
                backgroundSize: "330px 300px",
                zIndex: "0",
              }}
            />
            <div className="absolute inset-0 bg-blue-100/60 z-10"></div>

            <div className="relative z-20 p-4">
              <CardHeader>
                <CardTitle className="text-xl">Xin chào,</CardTitle>
                <CardDescription className="text-xl">
                  Nguyen Tri Dong
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Đây là một số thông tin để bạn có thể bắt đầu sử dụng:</p>
              </CardContent>
              <CardFooter>
                <p>Khám phá sản phẩm</p>
              </CardFooter>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Điểm khả dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <p className="text-red-600 font-semibold text-xl">0</p>
                    <p>Điểm đăng tuyển</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardHeader></CardHeader>
                  <CardContent>
                    <p className="text-red-600 font-semibold text-xl">0</p>
                    <p>Điểm xem hồ sơ</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full relative">
            <CardHeader>
              <CardTitle className="text-lg font-normal">
                Tổng số lượng hồ sơ trong 7 ngày
              </CardTitle>
              <CardDescription className="text-black text-2xl font-semibold">
                0
              </CardDescription>
              <div className="absolute top-4 right-4 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Tất cả công việc <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-fit"
                    // Set width to match button
                  >
                    {jobData.length === 0 ? (
                      <DropdownMenuItem disabled>
                        <SdCardAlertIcon className="mr-2" />
                        No Data
                      </DropdownMenuItem>
                    ) : (
                      <>
                        {jobData.map((job, index) => (
                          <DropdownMenuItem
                            key={index}
                            onClick={() => console.log(job)}
                          >
                            {job.title}
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center">
              <img
                src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon-empty-current-status.dc7c121ad253b15972a4bb894e7084fd.svg"
                alt="No Data"
                className="mb-2" // Add margin bottom for spacing
              />
              <p className="text-sm text-gray-500">
                Không có dữ liệu cho báo cáo này
              </p>
            </CardContent>
            {/* <CardFooter>
              <p>Card 3 Footer</p>
            </CardFooter> */}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Post Status</CardTitle>
              {/* <CardDescription>Card 4 Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              {/* Grid to display 4 small cards in 2 columns */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  {/* <CardHeader>
                    <CardTitle></CardTitle>
                  </CardHeader> */}
                  <CardContent className="mt-2 ">
                    <p className="text-green-600 font-semibold text-2xl">0</p>
                    <p>Đang hiển thị</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  {/* <CardHeader>
                    <CardTitle></CardTitle>
                  </CardHeader> */}
                  <CardContent className="mt-2 ">
                    <p className="text-gray-600 font-semibold text-2xl">0</p>
                    <p>Đang ẩn</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  {/* <CardHeader>
                    <CardTitle></CardTitle>
                  </CardHeader> */}
                  <CardContent className="mt-2 ">
                    <p className="text-orange-600 font-semibold text-2xl">0</p>
                    <p>Việc làm ảo</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  {/* <CardHeader>
                    <CardTitle></CardTitle>
                  </CardHeader> */}
                  <CardContent className="mt-2 ">
                    <p className="text-red-600 font-semibold text-2xl">0</p>
                    <p>Hết hạn</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            {/* <CardFooter>
              <p>Card 4 Footer</p>
            </CardFooter> */}
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-orange-500">
                Có sản phẩm mới
              </CardTitle>
              <CardDescription className="pt-4 font-normal text-black">
                Bắt đầu tìm kiếm tài năng ngay với các sản phẩm của chúng tôi
              </CardDescription>
            </CardHeader>
            <Button className="bg-third hover:text-white text-white rounded-md ml-6 mb-4">
              Mua ngay
            </Button>
            {/* <CardContent>
              <p>Card 5 Content</p>
            </CardContent>
            <CardFooter>
              <p>Card 5 Footer</p>
            </CardFooter> */}
          </Card>
        </div>
      </div>

      <div className="mt-4 relative">
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedOption} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
              {["7 ngày", "15 ngày", "30 ngày"].map((option, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className="flex items-center"
                >
                  {option}
                  {selectedOption === option && (
                    <span className="ml-2 text-blue-500">✔</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Transaction history</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center">
            <img
              src="https://employer.vietnamworks.com/v2/dashboard/static/media/no-activity-log.ce6b25997d31d015c44e74ed61f2257f.svg"
              alt="No Activity Log"
              className="mb-2"
            />
            <p className="text-sm text-gray-500">Không có hoạt động nào</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCompany;
