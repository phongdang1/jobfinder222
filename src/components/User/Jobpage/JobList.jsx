import React from "react";
import JobCard from "./JobCard";

const JobList = ({ currentJobs, totalJobs, currentPage }) => {
  return (
    <div className="mt-8">
      <div className="flex justify-start items-center mb-4">
        <div className="text-left text-gray-600 text-xl font-semibold">
          {totalJobs} jobs found
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {currentJobs.map((job) => (
          <div key={job.id} className="w-full">
            <JobCard job={job} currentPage={currentPage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
