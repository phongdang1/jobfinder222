import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../fetchData/axios"; // Adjust the import path if needed
import Head from "@/components/User/JobDetail/Head";
import RelatedJob from "@/components/User/JobDetail/RelatedJob";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`/getDetailPostById?id=${id}`);
        if (response.data) {
          setJob(response.data);
          console.log("job", response.data);
        } else {
          setError("Job details not found.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Error fetching job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col bg-white pb-8 mb-24 mt-10 mx-10 sm:mx-12 md:mx-16 xl:mx-36 font-poppins rounded-lg border-[1px] border-primary">
        {/* Skeleton Loader for the Head Section */}
        <div className="flex items-center justify-between text-4xl md:text-5xl font-forum mb-4 font-semibold text-start bg-[#4a3d8d] bg-opacity-70 rounded-t-lg p-6">
          <div>
            <Skeleton className="h-8 w-40" /> {/* Job Title Skeleton */}
          </div>
          <div className="text-secondary text-base font-poppins font-light mr-4 hover:underline hover:underline-offset-1">
            <Skeleton className="h-4 w-32" /> {/* Link Skeleton */}
          </div>
        </div>
        {/* Skeletons for other Head details */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4 sm:w-[250px] lg:w-[300px]" />{" "}
          {/* Job Description Skeleton */}
          <Skeleton className="h-4 w-2/4 sm:w-[150px] lg:w-[200px]" />{" "}
          {/* Company Name Skeleton */}
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return <>{job && <Head job={job} />}</>;
};

export default JobDetail;
