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
import { useNavigate, useLocation } from "react-router-dom";
import {
  AccessTimeRounded,
  CategoryRounded,
  EmojiEventsRounded,
  ExploreRounded,
  GroupsRounded,
  OpenInNewRounded,
  PaidRounded,
  PeopleAltRounded,
  ScheduleSendRounded,
  WorkHistoryRounded,
} from "@mui/icons-material";
import Card from "../Homepage/Common/Card";

const Head = ({ job }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromPage, prevLocation } = location.state || {};

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

  return (
    <div className="flex flex-col mx-36 ">
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

      <div className="grid grid-cols-3 gap-6">
        {/* left */}
        <div className="col-span-2">
          <div className="flex flex-col text-third bg-white shadow-lg mb-8 rounded-lg p-6">
            <div className="flex gap-2 text-2xl font-medium mb-4 lg:text-left md:text-center sm:text-center text-center">
              <div className="border-3 border-primary"></div>
              <p className="font-semibold">
                Position: {job.data.postDetailData?.name}
              </p>
            </div>

            <div className="flex justify-start gap-3 md:gap-24 sm:gap-2 lg:flex-row md:flex-col sm:flex-col flex-col md:items-center sm:items-center items-center">
              <div className="flex gap-4 items-center justify-center text-center ">
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

            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="flex gap-2 items-center mt-6 border-2 w-fit p-1 bg-gray-200 text-sm">
                  <ScheduleSendRounded className="text-gray-600" />
                  <p>Application deadline: {job.data.timeEnd}</p>
                </div>

                <div className="mt-2">
                  <Countdown endTime={job.data.timeEnd} />
                </div>
              </div>

              <Button
                className="bg-secondary text-primary mt-auto mr-2 hover:bg-primary hover:text-secondary border-primary items-center gap-1"
                variant="outline"
              >
                Apply
              </Button>
            </div>
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

          <div className="flex flex-col text-third bg-white shadow-lg mb-8 rounded-lg p-6 mt-4">
            <div className="flex gap-2 text-2xl font-medium mb-4 lg:text-left md:text-center sm:text-center text-center">
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
          <div className="flex flex-col text-third bg-white shadow-lg mb-8 rounded-lg p-6 space-y-4 ">
            <div className="flex gap-2">
              <div className="p-8 bg-gray-300">Logo</div>
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
                <div className="flex gap-20 items-start">
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

            <div className="flex gap-1 items-center cursor-pointer hover:underline text-primary mx-auto">
              <p>Go to company page </p>
              <OpenInNewRounded fontSize="small" />
            </div>
          </div>

          <div className="flex flex-col text-third bg-white shadow-lg mb-8 rounded-lg p-6 space-y-4">
            <p className="font-semibold text-xl">General Information</p>

            <div className="flex flex-col gap-6 items-start">
              <div className="flex gap-4 items-center justify-center text-center ">
                <EmojiEventsRounded
                  sx={{ fontSize: 40 }}
                  className="text-primary"
                />

                <div className="block text-left">
                  <p className="text-gray-500">Job Level</p>
                  <p className="font-medium">
                    {job.data.postDetailData?.jobLevelPostData?.value}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-center text-center">
                <PeopleAltRounded
                  sx={{ fontSize: 40 }}
                  className="text-primary"
                />

                <div className="block text-left">
                  <p className="text-gray-500">Number of Vacancies</p>
                  <p className="font-medium">
                    {job.data.postDetailData?.amount} person
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

              <div className="flex gap-4 items-center justify-center text-center">
                <AccessTimeRounded
                  sx={{ fontSize: 40 }}
                  className="text-primary"
                />

                <div className="block text-left">
                  <p className="text-gray-500">Job Type</p>
                  <p className="font-medium">
                    {job.data.postDetailData?.workTypePostData?.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <StickyBanner job={job} />
      </div>
    </div>
  );
};

export default Head;
