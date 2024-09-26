import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";

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
      className={`transition-all duration-500 fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-7xl bg-white border-l-8 border border-primary flex justify-between items-center p-2 lg:p-4 ${
        isSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex flex-col">
        <span className="font-medium text-lg md:text-xl">
          {job.data.postDetailData?.name}
        </span>
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaBuilding /> {job.data.companyData?.name}
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />{" "}
            {job.data.postDetailData?.provincePostData?.value}
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase /> {job.data.postDetailData?.jobLevelPostData?.value}
          </div>
          <div className="flex items-center gap-2">
            <FaDollarSign />{" "}
            {job.data.postDetailData?.salaryTypePostData?.value}
          </div>
        </div>
      </div>

      <Button className="bg-white border border-primary text-primary hover:bg-primary hover:border-white hover:text-white ease-in-out duration-300 py-2 px-4 lg:py-3 lg:px-6">
        Apply Now
      </Button>
    </div>
  );
};

export default StickyBanner;
