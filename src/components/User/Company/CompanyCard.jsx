import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompanyById } from "@/fetchData/Company";
import { FmdGoodOutlined } from "@mui/icons-material";
import { Skeleton } from "@/components/ui/skeleton";

const CompanyCard = ({ company }) => {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await getCompanyById(company.id);
        if (response.data.errCode === 0) {
          setCompanyData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching the company data:", error);
      }
    };

    fetchCompanyData();
  }, [company.id]);

  if (!companyData) {
    return (
      <div className="w-full bg-white shadow rounded-lg overflow-hidden">
        <Skeleton className="w-full h-40 object-cover" />
        <div className="p-4">
          <Skeleton className="w-16 h-16 rounded-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  return (
    <Link to={`/companydetail/${company.id}`} className="block" target="_blank">
      <div className="relative">
        {companyData.coverimage ? (
          <img
            src={companyData.coverimage}
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
            {companyData.thumbnail ? (
              <img
                src={companyData.thumbnail}
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
            <h3 className="text-lg font-semibold text-gray-900">
              {companyData.name}
            </h3>
            <div className="flex items-center mt-2 text-sm text-gray-700">
              <FmdGoodOutlined
                className="text-gray-600 mr-1"
                fontSize="small"
              />
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                Head Office: {companyData.address}
              </p>
            </div>
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
              {companyData.description}
            </p>
            <p className="text-sm text-gray-700 mt-2 font-medium">
              Total Job Recruitment: {companyData.totalJobs || 0}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
