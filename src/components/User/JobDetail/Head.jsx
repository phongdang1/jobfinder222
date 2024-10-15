import { Button } from "../../ui/button";
import StickyBanner from "./StickyBanner";
import Countdown from "./Countdown";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  AccessTimeRounded,
  CategoryRounded,
  EmojiEventsRounded,
  ExploreRounded,
  FavoriteRounded,
  GroupsRounded,
  OpenInNewRounded,
  PaidRounded,
  PeopleAltRounded,
  ScheduleSendRounded,
  WorkHistoryRounded,
} from "@mui/icons-material";
import Card from "../Homepage/Common/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "../../../fetchData/axios";
import { useEffect, useState } from "react";
import { RiFileUserFill } from "react-icons/ri";
import { FaPenFancy } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { getCvByUserId, handleApplyJob } from "../../../fetchData/CvPost";
import { MdOutlineDoubleArrow } from "react-icons/md";
import toast from "react-hot-toast";

const Head = ({ job }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromPage, prevLocation } = location.state || {};
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [cvData, setCvData] = useState();
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleBackClick = () => {
    if (prevLocation) {
      navigate(prevLocation, { state: { page: fromPage } });
    } else {
      navigate("/jobs");
    }
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/getUserById?id=${userId}`);
      const cvResponse = await getCvByUserId(userId);
      if (response.data.errCode === 0 && cvResponse.data.errCode === 0) {
        setUser(response.data.data);
        setCvData(cvResponse.data.count);
        console.log("user cv",cvResponse.data.count);
      } else {
        console.log("loi roi", cvResponse)
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (event) => {
    setDescription(event.target.value);
  };

  const applyJobSubmit = async () => {
    const jobId = job.data.id;
    try {
      const response = await handleApplyJob(userId, jobId, description);
      if (response.data.errCode === 0) {
        setIsOpen(false);
        toast.success(response.data.errMessage);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error applying job:", error);
    }
  };

  return (
    <div className="flex flex-col mx-4 lg:mx-36">
      {/* button back to job list */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/jobs">Job Page</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary">
              Hire {job.data.postDetailData?.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left */}
        <div className="col-span-2">
          <div className="flex flex-col text-third bg-white shadow-lg mb-8 rounded-lg p-6">
            <div className="flex gap-2 text-2xl font-medium mb-4 lg:text-left text-center">
              <div className="border-3 border-primary"></div>
              <p className="font-semibold">
                Position: {job.data.postDetailData?.name}
              </p>
            </div>

            <div className="flex flex-wrap justify-start gap-3 flex-row md:items-center sm:items-center items-center">
              <div className="flex gap-4 items-center justify-center text-center">
                <ExploreRounded
                  sx={{ fontSize: 40 }}
                  className="text-primary"
                />

                <div className="block text-left">
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">
                    {job.data.postDetailData?.provincePostData?.value}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-center text-center">
                <PaidRounded sx={{ fontSize: 40 }} className="text-primary" />

                <div className="block text-left">
                  <p className="text-gray-500">Salary</p>
                  <p className="font-medium">
                    {job.data.postDetailData?.salaryTypePostData?.value}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-center text-center">
                <WorkHistoryRounded
                  sx={{ fontSize: 40 }}
                  className="text-primary"
                />

                <div className="block text-left">
                  <p className="text-gray-500">Years of experience</p>
                  <p className="font-medium">
                    {job.data.postDetailData?.expTypePostData?.value}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
              <div className="flex flex-col">
                <div className="flex gap-2 justify-center items-center border-2 w-fit p-1 bg-gray-200 text-sm">
                  <ScheduleSendRounded className="text-gray-600" />
                  <p>Application deadline: {job.data.timeEnd}</p>
                </div>
              </div>

              {/* nút nộp CV chỗ này */}
              <div className="flex items-center justify-center">
                {cvData === 0 ? (
                  <Dialog open={isOpen}>
                  <DialogTrigger>
                    <Button
                      className="w-full lg:w-auto bg-secondary text-primary mr-2 px-6 lg:px-12 hover:bg-primary hover:text-secondary border-primary items-center gap-1"
                      variant="outline"
                      onClick={() => setIsOpen(true)}
                    >
                      Apply
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Apply for{" "}
                        <span className="text-primary">
                          {job.data.postDetailData?.name}
                        </span>
                      </DialogTitle>
                      <DialogDescription>
                        <div className="flex flex-col gap-y-4">
                          {/* CV */}
                          <div>
                            <div className="flex items-center gap-x-2 my-3 font-medium">
                              <RiFileUserFill className="w-5 h-5" /> Your CV :
                            </div>
                            <iframe
                              width={"100%"}
                              height={"500px"}
                              src={user?.UserDetailData?.file}
                            ></iframe>
                          </div>

                          {/* giới thiệu */}
                          <div>
                            <div className="flex items-center gap-x-2 my-3 font-medium">
                              <FaPenFancy className="w-5 h-5" /> Introduction :
                            </div>
                            <textarea
                              value={description}
                              onChange={handleInputChange}
                              placeholder="Write a brief introduction of yourself ( strength, weakness ) and your desire as well as your reason of choosing this job"
                              className="w-full max-h-80 h-full border border-gray-200 p-3 focus:border-primary"
                            />
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="bg-white border border-primary text-primary hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={applyJobSubmit}
                        className="bg-primary border border-primary text-white hover:text-white"
                      >
                        Apply
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                ) : (
                <Button
                  className="w-full flex gap-2 py-4 mr-3  lg:w-auto px-6 text-center bg-white text-primary hover:bg-primary hover:text-white border-primary text-base font-medium"
                  variant="outline"
                  onClick={() => { console.log(cvData)}}
                ><MdOutlineDoubleArrow/><span>View Applied Status</span></Button>
                )}
                

                <Button className="w-1/5 lg:w-auto px-6 text-center bg-primary text-white hover:bg-primary/70 text-base font-medium">
                  <FavoriteRounded />
                </Button>
              </div>
            </div>
          </div>

          {/* countdown */}
          <div className="my-5 bg-white rounded-md shadow-md py-5">
            <Countdown endTime={job.data.timeEnd} />
          </div>

          {/* Job Description */}
          <div className="flex flex-col bg-white p-6 rounded-lg">
            <div className="flex gap-2 h-full items-center text-third text-2xl font-medium mb-4">
              <div className="border-3 border-primary h-7"></div>
              <p className="font-semibold">Job Detail</p>
            </div>
            <div className="flex flex-col mb-2">
              <p className="text-md font-semibold">Job Description</p>
              <p className="list-item list-inside">
                {job.data.postDetailData?.description}
              </p>
              <p className="list-item list-inside">{job.data.note}</p>
              <p className="list-item list-inside">
                Wage: {job.data.postDetailData?.salaryTypePostData.value}
              </p>
            </div>

            <div className="flex flex-col mb-2">
              <p className="text-md font-semibold">Employee Requirements</p>
              <p className="list-item list-inside">
                Gender: {job.data.postDetailData?.genderPostData.value}
              </p>
              <p className="list-item list-inside">
                Years of experience:{" "}
                {job.data.postDetailData?.expTypePostData.value}
              </p>
              <p className="list-item list-inside">
                Requirements: {job.data.postDetailData?.requirement}
              </p>
              <p className="list-item list-inside">
                Benefits: {job.data.postDetailData?.benefit}
              </p>
            </div>

            <div className="flex flex-col mb-2">
              <p className="text-md font-semibold">Work Location</p>
              <p className="list-item list-inside">
                {job.data.companyData?.address}
              </p>
            </div>
          </div>

          {/* Related Jobs */}
          <div className="flex flex-col text-third bg-white shadow-lg mb-8 rounded-lg p-6 mt-4">
            <div className="flex gap-2 text-2xl font-medium mb-4 lg:text-left text-center">
              <div className="border-3 border-primary"></div>
              <p className="font-semibold">Related Jobs</p>
            </div>
            <div className="space-y-4">
              <Card expand="expand" />
            </div>
          </div>
        </div>

        {/* right */}
        <div className="col-span-1">
          <div className="flex flex-col text-third bg-white shadow-lg mb-8 rounded-lg p-6 space-y-4">
            <div className="flex gap-2">
              <div className="p-8 lg:p-8 md:p-6 sm:p-4 bg-gray-300 text-center">
                Logo
              </div>
              <p className="font-semibold text-xl">
                {job.data.companyData?.name}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <CategoryRounded className="text-gray-500" />
                <div className="flex gap-3 items-start">
                  <p className="text-gray-500 ">Business Field:</p>
                  <p className="font-medium text-wrap">
                    {job.data.companyData?.typeCompany}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <GroupsRounded className="text-gray-500" />
                <div className="flex gap-3 items-start">
                  <p className="text-gray-500">Scale:</p>
                  <p className="font-medium text-wrap">
                    {job.data.companyData?.amountEmployer} employees
                  </p>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <ExploreRounded className="text-gray-500" />
                <div className="flex gap-12 items-start">
                  <p className="text-gray-500">Address:</p>
                  <p className="font-medium text-wrap ">
                    {job.data.companyData?.address}
                  </p>
                </div>
              </div>
            </div>
            {/* Company Contact Information */}
            <div className="flex gap-2 items-center">
              <AccessTimeRounded className="text-gray-500" />
              <div className="flex gap-3 items-start">
                <p className="text-gray-500">Working Time:</p>
                <p className="font-medium text-wrap">
                  {job.data.companyData?.workingTime}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <PeopleAltRounded className="text-gray-500" />
              <div className="flex gap-3 items-start">
                <p className="text-gray-500">Contact:</p>
                <p className="font-medium text-wrap">
                  {job.data.companyData?.contact}
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Banner */}
          <StickyBanner />
        </div>
      </div>
    </div>
  );
};

export default Head;
