import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../fetchData/axios"; // Adjust the import path if needed
import Head from "@/components/User/JobDetail/Head";
import RelatedJob from "@/components/User/JobDetail/RelatedJob";

const JobDetail = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`/getDetailPostById?id=${id}`);
        if (response.data) {
          setJob(response.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {job && <Head job={job} />}
      <RelatedJob />
    </>
  );
};

export default JobDetail;
