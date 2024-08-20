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

const Head = ({ job }) => {
  const endTime = new Date("2024-08-31T23:59:59");
  return (
    <div className="container mx-auto p-4">
      {/* Button Back to Job List */}
      <button className="flex items-center text-blue-500 mb-4">
        <FaRegArrowAltCircleLeft className="mr-2" /> Back to Job List
      </button>

      {/* Cover Image and Avatar */}
      <div className="relative">
        <img
          src={job.coverImage}
          alt="Cover"
          className="w-full h-64  lg:h-80 object-cover rounded-lg"
        />
        <div className="absolute w-full flex flex-col lg:flex-row top-40 lg:top-48  pl-4 lg:pl-8  lg:pr-4">
          <div className="flex justify-center items-center mt-10">
            <img
              className="w-40 h-40 lg:w-44 lg:h-44 border-4 
            border-white object-cover"
              src={job.avatar}
              alt="Avatar"
            />
          </div>

          <div className="mt-0 lg:mt-32 w-full lg:pl-4 flex justify-center items-center">
            {/* title */}
            <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full">
              <div className="mb-4 mt-5 lg:mb-0">
                <h1 className="text-xl lg:text-2xl font-bold mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaBuilding /> {job.company}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt /> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBriefcase /> {job.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign /> {job.salary}
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="flex items-end w-full lg:w-max">
                <Button className="bg-white border border-primary text-primary w-full hover:bg-primary hover:border-white hover:text-white ease-in-out duration-300 py-7 px-6 lg:py-8 lg:px-10">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Button float */}
      <div>
      {/* Nội dung trang của bạn */}
      
      <StickyBanner job={job} />
    </div>
      {/* Others */}
      <div className="mt-96 lg:mt-32 lg:mt-40">
        {/* Job Details */}
        <div className="my-4">
          <h1 className="font-semibold">Job description :</h1>
          <p className="py-4">
            We are seeking a skilled Fullstack Developer to join our team. The
            ideal candidate will have experience with both front-end and
            back-end technologies, a strong problem-solving mindset, and a
            commitment to delivering high-quality software. You will work
            closely with our development team to build and maintain web
            applications, ensuring a seamless user experience and robust
            functionality.
          </p>
          <p className="py-4">
            We are seeking a skilled Fullstack Developer to join our team. The
            ideal candidate will have experience with both front-end and
            back-end technologies, a strong problem-solving mindset, and a
            commitment to delivering high-quality software. You will work
            closely with our development team to build and maintain web
            applications, ensuring a seamless user experience and robust
            functionality.
          </p>
          <p className="py-4">
            We are seeking a skilled Fullstack Developer to join our team. The
            ideal candidate will have experience with both front-end and
            back-end technologies, a strong problem-solving mindset, and a
            commitment to delivering high-quality software. You will work
            closely with our development team to build and maintain web
            applications, ensuring a seamless user experience and robust
            functionality.
          </p>
          <p className="py-4">
            We are seeking a skilled Fullstack Developer to join our team. The
            ideal candidate will have experience with both front-end and
            back-end technologies, a strong problem-solving mindset, and a
            commitment to delivering high-quality software. You will work
            closely with our development team to build and maintain web
            applications, ensuring a seamless user experience and robust
            functionality.
          </p>
        </div>
        {/* Required */}
        <div className="my-4">
          <h1 className="font-semibold">Required:</h1>
          <div className="grid grid-cols-3 gap-3 my-5">
            <span
              className="bg-white border border-primary rounded-full py-4 
            flex justify-center items-center"
            >
              ReactJS
            </span>
            <span
              className="bg-white border border-primary rounded-full py-4 
            flex justify-center items-center"
            >
              ReactJS
            </span>
            <span
              className="bg-white border border-primary rounded-full py-4 
            flex justify-center items-center"
            >
              ReactJS
            </span>
          </div>
        </div>
        {/* Countdown */}
        <div className="p-8">
      <Countdown endTime={endTime} />
    </div>
      </div>
    </div>
  );
};

export default Head;
