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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SdCardAlertIcon from "@mui/icons-material/SdCardAlert";
import { getCompanyById } from "@/fetchData/Company";
import { getAllUserPackage } from "@/fetchData/Package";
import { getAllCvPostByCompanyId7Day } from "@/fetchData/CvPost";
import { getUsersById } from "@/fetchData/User";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPost } from "@/fetchData/Post";
import { FcFaq, FcHome } from "react-icons/fc";

const DashboardCompany = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [postCounts, setPostCounts] = useState({
    active: 0,
    pending: 0,
    inactive: 0,
    expired: 0,
  });
  const [userPackages, setUserPackages] = useState([]); // State to store user package data
  const [cvPosts, setCvPosts] = useState([]);
  const [cvPostCount, setCvPostCount] = useState(0);
  const [userNames, setUserNames] = useState({});
  const [user, setUser] = useState();
  const userId = localStorage.getItem("user_id");
  const companyId = JSON.parse(localStorage.getItem("companyId"));

  const fetchCompany = async () => {
    try {
      const res = await getCompanyById(companyId);
      const resUser = await getUsersById(userId);
      setLoading(true);
      if (res && resUser) {
        setCompanyData(res.data.data);
        setUser(resUser.data.data);
        console.log("company ne", res.data.data);
      } else {
        setError("Error fetching company data. Please try again later.");
        console.log("loi roi", companyId);
      }
    } catch (error) {
      setError("Error fetching company data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await getAllPost(); // Fetch all posts
      if (response.data.errCode === 0) {
        countPosts(response.data.data);
      } else {
        setError("Error fetching posts. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching posts. Please try again later.");
    }
  };

  const countPosts = (posts) => {
    const counts = {
      active: 0,
      pending: 0,
      inactive: 0,
      expired: 0,
    };
    const currentTime = new Date().toISOString(); // Get current time
    console.log("post ne 123", posts);
    posts.forEach((post) => {
      if (post.userId === parseInt(userId)) {
        if (post.statusCode === "ACTIVE") {
          if (post.timeEnd > currentTime) {
            counts.active++;
          } else {
            counts.expired++;
          }
        } else if (post.statusCode === "PENDING") {
          counts.pending++;
        } else if (post.statusCode === "INACTIVE") {
          if (post.timeEnd > currentTime) {
            counts.inactive++;
          } else {
            counts.expired++;
          }
        }
      }
    });

    setPostCounts(counts);
  };

  const fetchUserPackages = async () => {
    try {
      const response = await getAllUserPackage(); // Fetch all user packages
      if (response.data.errCode === 0) {
        const userPackageData = response.data.data.filter(
          (pkg) => pkg.userId === parseInt(userId)
        );
        setUserPackages(userPackageData); // Set the filtered packages for this user
      } else {
        setError("Error fetching user packages. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching user packages. Please try again later.");
    }
  };

  const fetchCvPostsIn7Days = async () => {
    try {
      const response = await getAllCvPostByCompanyId7Day(companyId);
      if (response.data.errCode === 0) {
        const posts = response.data.data;
        setCvPostCount(posts.length);
        setCvPosts(posts);

        // Fetch user names for each CV post userId
        const userIdSet = new Set(posts.map((post) => post.userId)); // Get unique userIds
        userIdSet.forEach(async (userId) => {
          try {
            const userResponse = await getUsersById(userId);
            if (userResponse.data.errCode === 0) {
              setUserNames((prevState) => ({
                ...prevState,
                [userId]: `${userResponse.data.data.firstName} ${userResponse.data.data.lastName}`,
              }));
            }
          } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
          }
        });
      } else {
        setError("Error fetching CV posts. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching CV posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompany();
    fetchUserPackages();
    fetchPosts();
    // fetchCvPostsIn7Days();
  }, []);

  const jobData = [];
  const [selectedOption, setSelectedOption] = useState("Choose time");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-8 px-4 mb-5">
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
                <CardTitle className="text-xl">Welcome,</CardTitle>
                <CardDescription className="text-xl font-medium text-orange-600">
                  {companyData?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Here's some information to get you started:</p>
              </CardContent>
              <CardFooter></CardFooter>
              <CardFooter>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FcFaq className="mr-2" />
                    <Link to="" className="text-blue-700 hover:text-black">
                      <p>FAQ/User Instructions</p>
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <FcHome className="mr-2" />
                    <Link
                      to="/company/product"
                      className="text-blue-700 hover:text-black"
                    >
                      <p>Explore products</p>
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent className="mt-2 text-center">
                    <p className="text-blue-700 font-semibold text-2xl">
                      {companyData?.allowHotPost}
                    </p>
                    <p>Job posting package</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent className="mt-2 text-center">
                    <p className="text-green-500 font-semibold text-2xl">
                      {companyData?.allowCv}
                    </p>
                    <p>Profile view package</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent className="mt-2 text-center">
                    <p className="text-primary font-semibold text-2xl">
                      {user?.point}
                    </p>
                    <p>Total Points Earned</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* list of cv post */}
        <div>
          <Card className="h-full relative">
            <CardHeader>
              <CardTitle className="text-lg font-normal">
                Total number of records in 7 days
              </CardTitle>
              <CardDescription className="text-black text-2xl font-semibold">
                {cvPostCount}
              </CardDescription>
              {/* <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      All work <ChevronDown className="ml-2 h-4 w-4" />
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
              </div> */}
            </CardHeader>
            <CardContent>
              {cvPosts.length > 0 ? (
                <Table>
                  <TableCaption></TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name Post</TableHead>
                      <TableHead>Name Employee</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cvPosts.map((cvPost) => (
                      <TableRow key={cvPost.id}>
                        <TableCell>
                          {cvPost.postCvData.postDetailData.name}
                        </TableCell>

                        <TableCell>{userNames[cvPost.userId]}</TableCell>
                        <TableCell>{cvPost.description}</TableCell>
                        <TableCell>
                          {
                            cvPost.postCvData.postDetailData.jobTypePostData
                              .value
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon-empty-current-status.dc7c121ad253b15972a4bb894e7084fd.svg"
                    alt="No Data"
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-500">
                    There is no data available for this report
                  </p>
                </div>
              )}
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
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent className="mt-2 text-center">
                    <p className="text-2xl font-semibold text-green-600">
                      {postCounts.active}
                    </p>
                    <p>Showing</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent className="mt-2 text-center">
                    <p className="text-2xl font-semibold text-gray-600">
                      {postCounts.pending}
                    </p>
                    <p>Waiting for approval</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent className="mt-2 text-center">
                    <p className="text-2xl font-semibold text-red-600">
                      {postCounts.inactive}
                    </p>
                    <p>Hidden</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100 hover:bg-primary-50 hover:border-primary">
                  <CardContent className="mt-2 text-center">
                    <p className="text-2xl font-semibold text-orange-600">
                      {postCounts.expired}
                    </p>
                    <p>Expired</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="lg:h-44">
            <CardHeader>
              <CardTitle className="text-lg text-orange-500">
                There are new products
              </CardTitle>
              <CardDescription className="pt-4 font-normal text-black">
                Start finding talent now with our products
              </CardDescription>
            </CardHeader>
            <Link to="/company/product">
              <Button className="bg-third hover:text-white text-white rounded-md ml-6 mb-4">
                Buy now
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      <div className="mt-4 relative">
        {/* <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedOption} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit">
              {["7 days", "15 days", "30 days"].map((option, index) => (
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
        </div> */}

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {userPackages.length > 0 ? (
              <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Points Earned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPackages.map((pkg) => (
                    <TableRow key={pkg.packageId}>
                      <TableCell>{pkg.PackageData.name}</TableCell>
                      <TableCell>${pkg.PackageData.price}</TableCell>
                      <TableCell>{pkg.PackageData.type}</TableCell>
                      <TableCell>{pkg.poinEarned}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon-empty-current-status.dc7c121ad253b15972a4bb894e7084fd.svg"
                  alt="No Data"
                  className="mb-2"
                />
                <p className="text-sm text-gray-500">There are no activities</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCompany;
