import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";

const jobs = [
  {
    title: "Compensation & Benefit Consultant",
    company: "Deal Jobs",
    location: "Online",
    jobType: "Freelance",
    salary: "Negotiable",
    remote: true,
    applied: false,
  },
  {
    title: "Nursing Assistant",
    company: "Deal Jobs",
    location: "Online",
    jobType: "Freelance",
    salary: "Negotiable",
    remote: true,
    applied: false,
  },
  {
    title: "Marketing Coordinator",
    company: "Deal Jobs",
    location: "Online",
    jobType: "Freelance",
    salary: "Negotiable",
    remote: true,
    applied: false,
  },
  {
    title: "Web Designer",
    company: "Deal Jobs",
    location: "Online",
    jobType: "Freelance",
    salary: "Negotiable",
    remote: true,
    applied: true,
  },
  {
    title: "Medical Assistant",
    company: "Deal Jobs",
    location: "Online",
    jobType: "Freelance",
    salary: "Negotiable",
    remote: true,
    applied: false,
  },
];

function RelatedJob() {
  return (
    <div className="shadow-md rounded-lg px-4 md:px-6 lg:px-8 xl:px-16">
  <div className="bg-primary text-white text-lg md:text-xl lg:text-2xl font-bold p-4 rounded-t-lg text-center">
    Related Jobs
  </div>
  <div className="divide-y divide-gray-200 bg-white">
    {jobs.map((job, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 hover:bg-gray-50"
      >
        {/* Left Side */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div>
            <h3 className="text-sm md:text-md font-semibold text-gray-900">
              {job.title}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">{job.company}</p>
            <div className="flex flex-row gap-2 mt-1 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-primary text-xs md:text-sm" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <FaBriefcase className="text-primary text-xs md:text-sm" />
                {job.jobType}
              </div>
              <div className="flex items-center gap-1">
                <FaDollarSign className="text-primary text-xs md:text-sm" />
                {job.salary}
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-row items-center gap-2 mt-2 md:mt-0">
          {job.remote && (
            <span className="bg-blue-100 text-blue-600 text-xs md:text-sm font-medium px-2 py-1 rounded-full">
              Remote
            </span>
          )}
          <button
            className={`text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-2 rounded-lg ${
              job.applied
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white"
            }`}
            disabled={job.applied}
          >
            {job.applied ? "Applied" : "Easy Apply"}
          </button>
          <FaCheckCircle
            className={`${
              job.applied ? "text-primary" : "text-gray-300"
            } text-lg md:text-xl`}
          />
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default RelatedJob;
