import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompanyById } from "@/fetchData/Company";
import { FmdGoodOutlined } from "@mui/icons-material";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyCard = ({ company }) => {
  const [companyData, setcompanyData] = useState(null);

  useEffect(() => {
    const fetchcompanyData = async () => {
      try {
        const response = await getCompanyById(company.id);
        if (response.data.errCode === 0) {
          setcompanyData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching the company data:", error);
      }
    };

    fetchcompanyData();
  }, [company.id]);

  return (
    <Link
      to={`/companydetail/${company.id}`}
      className="block w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px] mx-auto bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        {companyData?.coverimage ? (
          <img
            src={companyData?.coverimage}
            alt="Cover Image"
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <p>cover image</p>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-4 mb-3">
          <div className="w-16 h-16 flex-shrink-0">
            {companyData?.thumbnail ? (
              <img
                src={companyData?.thumbnail}
                alt="Thumbnail"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                <p>logo</p>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {companyData?.name}
            </h3>
            <div className="flex items-center mt-2 text-sm text-gray-700">
              <FmdGoodOutlined
                className="text-gray-600 mr-1"
                fontSize="small"
              />
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
              <strong><i>Head Office:</i></strong>
              {companyData?.address}
              </p>
            </div>

            <p className="text-sm text-gray-700 mt-2 font-medium">
              <strong><i>Total Job Recruitment:</i></strong>{" "}
              <span className="text-primary font-semibold">
                {companyData?.postData?.length || 0}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
