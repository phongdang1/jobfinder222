import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { getAllCompanies, getCompanyById } from "@/fetchData/Company";
import image from "../../../assets/Home/Company/fpt1.png";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
const FeaturedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Điều chỉnh thời gian hiệu ứng (ms)
      once: false,    // Để hiệu ứng chạy lại mỗi khi cuộn đến
    });
    AOS.refresh();  // Làm mới lại AOS để đảm bảo nó hoạt động đúng
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCompanies();
        const res2 = await getCompanyById(res.data.data.id);
        if (res.status === 200 && res2.status === 200) {
          const companyData = res.data.data;
          const postData = res2.data.data;
          setCompanies(companyData);
          setTotalJobs(postData.data.data.postData.length);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div data-aos="fade-up" className="mx-4 md:mx-12 lg:mx-40 p-4">
      <div className="text-3xl sm:text-4xl md:text-5xl font-forum mb-8 font-semibold text-start">
        Featured
        <span className="text-primary"> Companies</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(companies) && companies.length > 0 ? (
          companies.map((company, index) => (
            <Link to={`/companydetail/${company.id}`} key={index} >
              <Card className="relative cursor-pointer hover:bg-[#E6E6FA]/50 hover:outline-2 hover:outline-primary">
                <CardHeader className="flex items-center justify-center flex-col">
                  <img alt={company.name} className="w-24 h-24" src={image} />
                </CardHeader>
                <CardBody className="text-center">
                  <h4 className="text-third font-semibold text-lg text-center">
                    {company.name}
                  </h4>
                  <p className="font-medium my-2">
                    <span className="text-primary">{totalJobs}</span> jobs
                    available
                  </p>
                </CardBody>
              </Card>
            </Link>
          ))
        ) : (
          <p>No companies available</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedCompanies;
