import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  ExploreRounded,
  PaidRounded,
  WorkHistoryRounded,
} from "@mui/icons-material";

const StickyBanner = ({ job }) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const offset = 200;

    setIsSticky(scrollY >= offset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!job) return null;

  return (
    <div
      className={`transition-all z-30 duration-500 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-7xl bg-white border-l-8 border border-primary flex flex-col p-2 lg:p-4 ${
        isSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <p className="text-xl font-semibold pb-4">
        Role: {job.data.postDetailData?.name}
      </p>
      <div className="flex justify-start gap-3 md:gap-24 sm:gap-2 lg:flex-row md:flex-col sm:flex-col flex-col md:items-center sm:items-center items-center">
        <div className="flex gap-4 items-center justify-center text-center ">
          <ExploreRounded sx={{ fontSize: 40 }} className="text-primary" />

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
          <WorkHistoryRounded sx={{ fontSize: 40 }} className="text-primary" />

          <div className="block text-left">
            <p className="text-gray-500">Years of experience</p>
            <p className="font-medium">
              {job.data.postDetailData?.expTypePostData?.value}
            </p>
          </div>
        </div>
        <Button className="ml-auto bg-white border border-primary text-primary hover:bg-primary hover:border-white hover:text-white ease-in-out duration-300 py-2 px-4 lg:py-3 lg:px-6">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default StickyBanner;
