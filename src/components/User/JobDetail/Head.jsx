import { Button } from "../../ui/button";
import React from "react";
import {
  FaRegArrowAltCircleLeft,
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
} from "react-icons/fa";
import StickyBanner from "./StickyBanner";
import Countdown from "./Countdown";

import { useNavigate, useLocation } from "react-router-dom";
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
      <div className="my-5">
        <button
          onClick={handleBackClick}
          className="flex items-center text-blue-500 mb-4"
        >
          <FaRegArrowAltCircleLeft className="mr-2" /> Back to Job List
        </button>
      </div>
      {/* Cover Image and Avatar */}
      <div className="">
        <div className="w-full h-80 rounded-t-xl overflow-hidden">
          <img
            src={job.data.companyData?.coverimage || "/default-cover.jpg"}
            alt="Company Cover"
            className="w-full h-80 object-cover"
          />
        </div>
        <div
          className="h-40 w-40 bg-cover bg-center bg-white rounded-full absolute z-30
                lg:top-[450px] lg:left-72
                md:top-[360px] md:left-1/2 md:transform md:-translate-x-1/2
                sm:top-[380px] sm:left-1/2 sm:transform sm:-translate-x-1/2
                top-[380px] translate-x-1/2"
          style={{
            backgroundImage: `url(${
              job.data.companyData?.thumbnail || "/default-company-logo.png"
            })`,
          }}
        ></div>
        {/* Job info */}
        <div
          className="flex text-secondary bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90
                     lg:h-[150px] md:h-[200px] sm:h-[300px] h-[280px] shadow-lg mb-8 rounded-b-xl relative"
        >
          <div className="my-auto justify-center lg:ml-72 md:mx-auto sm:mx-auto mx-auto">
            <div className="text-3xl font-medium mb-4 lg:text-left md:text-center sm:text-center text-center">
              {job.data.postDetailData?.name}
            </div>
            <div className="flex gap-3 md:gap-4 sm:gap-2 lg:flex-row md:flex-col sm:flex-col flex-col md:items-center sm:items-center items-center">
              <div className="flex gap-2">
                <FaBuilding />
                <div>{job.data.companyData?.name}</div>
              </div>

              <div className="flex gap-2">
                <FaMapMarkerAlt />
                <div>{job.data.postDetailData?.provincePostData?.value}</div>
              </div>

              <div className="flex gap-2">
                <FaBriefcase />
                <div>{job.data.postDetailData?.jobLevelPostData?.value}</div>
              </div>

              <div className="flex gap-2">
                <FaDollarSign />
                <div>{job.data.postDetailData?.salaryTypePostData?.value}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <StickyBanner job={job} />
      </div>

      <div className="lg:grid lg:grid-cols-3 md:flex md:flex-col gap-8 lg:mb-8 md:mb-[600px] sm:mb-[600px]">
        {/* left */}
        <div className="col-span-2 ">
          {/* Job Description */}
          <div>
            <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
              <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
                <p>Job Description</p>
              </div>
            </div>
            <div className="px-6 h-60 pt-4 shadow-xl rounded-b-lg pb-4">
              <p>{job.data.postDetailData?.description}</p>
            </div>
          </div>
          {/* Required */}
          <div className="mt-7 h-60 shadow-xl">
            <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
              <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
                <p>Job Requirements</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 my-5 p-4">
              {job.data.requirements?.map((req, index) => (
                <span
                  key={index}
                  className="bg-white border border-primary rounded-full py-4 flex justify-center items-center"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-12 w-full bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 rounded-t-lg">
            <div className="flex h-full items-center pl-6 text-secondary text-xl font-medium">
              <p>Time</p>
            </div>

            <div>
              <div className="px-6 h-full pt-4 shadow-xl rounded-b-lg">
                <div className="">
                  <div className="pb-4 mx-auto md:w-full">
                    <Countdown endTime={job.data.timeEnd} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Information (Optional Section) */}
        <div className="col-span-1">
          {/* Add contact info section if needed */}
        </div>
      </div>
    </div>
  );
};

export default Head;
