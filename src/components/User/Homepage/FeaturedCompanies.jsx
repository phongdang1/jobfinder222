import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { getAllCompanies } from "@/fetchData/Company";
import image from "../../../assets/Home/Company/fpt1.png";
import { getAllPostHomePage } from "@/fetchData/Job";
const FeaturedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCompanies();
        const res2 = await getAllPostHomePage();
        if (res.status === 200 && res2.status === 200) {
          const companyData = res.data.data;
          const postData = res2.data.data;
          setCompanies(companyData);
          setPosts(postData);
          console.log("company ne", companyData);
          console.log("post ne", postData);
          const companiesWithTotalPosts = companyData.map((company) => {
            const totalPost = postData.filter(
              (post) => post.userId === company.id
            ).length;
            return {
              ...company,
              totalPost, // Add totalPost to the company object
            };
          });
          setCompanies(companiesWithTotalPosts);
        } else {
          console.log("loi fetch roi");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mx-20 p-4">
      <div className="text-4xl md:text-5xl font-forum mb-8 font-semibold text-start">
        Featured
        <span className="text-primary"> Companies</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {Array.isArray(companies) && companies.length > 0 ? (
          companies.map((company, index) => (
            <Card key={index} className="h-[300px]">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                {/* <span>  (Total Posts: {company.totalPost})</span> */}
                <h4 className="text-white font-medium text-large">
                  {company.name}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt={company.name}
                className="z-0 w-1/2 h-1/2"
                src={image}
              />
            </Card>
          ))
        ) : (
          <p>No companies available</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedCompanies;
