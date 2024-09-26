import { useEffect, useState } from 'react';
import axios from "../../../fetchData/axios";
import { FmdGoodOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  const [coverImage, setCoverImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0); // State to hold the total jobs

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Fetch company details
        const response = await axios.get(`http://localhost:5000/getCompanyById?id=${company.id}`);
        if (response.data.errCode === 0) {
          const companyData = response.data.data;

          // Set total jobs from postData length
          if (companyData.postData) {
            setTotalJobs(companyData.postData.length);
          }

          // Fetch cover image
          const coverResponse = await axios.get(companyData.coverimage, { responseType: 'blob' });
          const coverImageUrl = URL.createObjectURL(coverResponse.data);
          setCoverImage(coverImageUrl);

          // Fetch logo image
          const logoResponse = await axios.get(companyData.logo, { responseType: 'blob' });
          const logoImageUrl = URL.createObjectURL(logoResponse.data);
          setLogo(logoImageUrl);
        }
      } catch (error) {
        console.error('Error fetching the company data:', error);
      }
    };

    fetchCompanyData();
  }, [company.id, company.coverimage, company.logo]);

  return (
    <Link to={`/companydetail/${company.id}`} className="block">
      {/* Cover Image */}
      <div className="relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${company.name} cover`}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <p>Loading cover image...</p>
          </div>
        )}
      </div>

      {/* Company Details */}
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-3">
          {/* Logo */}
          <div className="w-16 h-16 flex-shrink-0">
            {logo ? (
              <img
                src={logo}
                alt={`${company.name} logo`}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                <p>Loading logo...</p>
              </div>
            )}
          </div>
          {/* Company Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
            <div className="flex items-center mt-2 text-sm text-gray-700">
              <FmdGoodOutlined className="text-gray-600 mr-1" fontSize="small" />
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">Head Office: {company.address}</p>
            </div>
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{company.description}</p>
            <p className="text-sm text-gray-700 mt-2 font-medium">Total Job Recruitment: {totalJobs}</p> {/* Display total jobs */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
