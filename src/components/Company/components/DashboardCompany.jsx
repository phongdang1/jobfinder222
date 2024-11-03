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

import { getCompanyById } from "@/fetchData/Company";
import { useEffect, useState } from "react";

const DashboardCompany = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const userId = localStorage.getItem("user_id");

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const response = await getCompanyById(userId);
      if (response.data.errCode === 0) {
        setCompanyData(response.data.data);
      } else {
        setError("Error fetching data. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const jobData = [];
  const [selectedOption, setSelectedOption] = useState("Thời gian");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Responsive styling */}
          <Card className="relative h-72 md:h-80">
            <div
              className="absolute inset-0 bg-right bg-no-repeat md:bg-center"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/premium-vector/male-character-working-with-laptop_967534-4.jpg?w=1380')",
                backgroundSize: "cover",
                zIndex: "0",
              }}
            />
            <div className="absolute inset-0 bg-blue-100/60 z-10"></div>
            <div className="relative z-20 p-4">
              <CardHeader>
                <CardTitle className="text-xl">Xin chào,</CardTitle>
                <CardDescription className="text-xl font-medium text-orange-600">
                  {companyData?.name}
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
                  <CardContent>
                    <p className="text-red-600 font-semibold text-xl">
                      {companyData?.allowHotPost}
                    </p>
                    <p>Điểm đăng tuyển</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent>
                    <p className="text-red-600 font-semibold text-xl">
                      {companyData?.allowCv}
                    </p>
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
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Tất cả công việc <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-fit">
                    {jobData.length === 0 ? (
                      <DropdownMenuItem disabled>
                        <SdCardAlertIcon className="mr-2" />
                        No Data
                      </DropdownMenuItem>
                    ) : (
                      jobData.map((job, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => console.log(job)}
                        >
                          {job.title}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center">
              <img
                src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon-empty-current-status.dc7c121ad253b15972a4bb894e7084fd.svg"
                alt="No Data"
                className="mb-2"
              />
              <p className="text-sm text-gray-500">
                Không có dữ liệu cho báo cáo này
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Post Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {["Đang hiển thị", "Đang ẩn", "Việc làm ảo", "Hết hạn"].map(
                  (status, idx) => (
                    <Card
                      key={status}
                      className="bg-gray-100 hover:bg-primary-50 hover:border-primary"
                    >
                      <CardContent className="mt-2 text-center">
                        <p className="text-2xl font-semibold text-red-600">0</p>
                        <p>{status}</p>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="lg:h-44">
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
