import Head from "@/components/User/JobDetail/Head";
import React from "react";
import avatar from "../../../assets/images/logo11.jpg";
import cover from "../../../assets/images/img3.jpg";
import RelatedJob from "@/components/User/JobDetail/RelatedJob";
const job = {
  coverImage: cover,
  avatar: avatar,
  title: "Fullstack Developer",
  company: "Company Name",
  location: "Location Name",
  type: "Intern", // or 'Senior', 'Junior'
  salary: "$5000/month",
};

const JobDetail = () => {
  return (
    <>
      <Head job={job} />
      <RelatedJob />
    </>
  );
};

export default JobDetail;
