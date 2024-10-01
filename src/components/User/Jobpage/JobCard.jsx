// JobCard.jsx
import {
  FmdGoodOutlined,
  AccessTimeOutlined,
  WorkOutline,
  SchoolOutlined,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const JobCard = ({ job, currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    navigate(`/job-detail/${job.id}`, {
      state: { job, fromPage: currentPage, prevLocation: location.pathname },
    });
  };

  return (
    <div
      key={job.id}
      className="bg-white shadow-md rounded-lg p-5 pr-3 flex space-x-4 border border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
      {/* Company logo */}
      <div className="w-16 h-16 flex items-center justify-center p-4">
        <img
          src={
            job.userPostData?.userCompanyData?.thumbnail ||
            "/default-company-logo.png"
          }
          alt={job.userPostData?.userCompanyData?.name}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>

      <div className="flex-1">
        {/* Job name, company name, and work type */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h3 className="text-lg font-semibold text-gray-900 mt-1">
              {job.postDetailData?.name}
            </h3>
            <span className="px-4 py-1 flex justify-center items-center text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
              {job.postDetailData?.workTypePostData?.value}
            </span>
          </div>

          {/* Company name */}
          <p className="text-sm text-gray-600">
            {job.userPostData?.userCompanyData?.name}
          </p>
        </div>

        {/* Job details (level, location, and posted on) */}
        <div className="flex gap-4 mt-2 text-sm text-gray-700">
          <div className="flex items-center">
            <WorkOutline className="text-gray-600 mr-1" fontSize="small" />
            <p>{job.postDetailData?.jobLevelPostData?.value}</p>
          </div>

          <div className="flex items-center">
            <FmdGoodOutlined className="text-gray-600 mr-1" fontSize="small" />
            <p>{job.postDetailData?.provincePostData?.value}</p>
          </div>

          <div className="flex items-center">
            <SchoolOutlined className="text-gray-600 mr-1" fontSize="small" />
            <p>{job.postDetailData?.expTypePostData?.value}</p>
          </div>

          <div className="flex items-center">
            <AccessTimeOutlined
              className="text-gray-600 mr-1"
              fontSize="small"
            />
            <p>{new Date(job.timePost).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Job description */}
        <p className="text-sm text-gray-700 mt-2">
          {job.postDetailData?.description}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
