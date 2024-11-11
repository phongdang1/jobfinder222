import React, { useEffect, useState } from "react";
import axios from "../../../fetchData/axios";
import { getCvByUserId } from "../../../fetchData/CvPost";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const YourApplication = () => {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState();
  const [cvData, setCvData] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);

  const [countJob, setCountJob] = useState();
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/getUserById?id=${userId}`);
      const cvResponse = await getCvByUserId(userId);
      if (response.data.errCode === 0 && cvResponse.data.errCode === 0) {
        setUser(response.data.data);
        setCvData(cvResponse.data.data);
        setCountJob(response.data.count);
        console.log("user cv", cvResponse.data.data);
      } else {
        console.log("loi roi", cvResponse);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="bg-white h-fit p-4">
        {cvData > 0 ? (
          <p className="font-poppins text-xl md:text-2xl font-medium italic mb-4">
            You can see all the jobs you have applied here
          </p>
        ) : (
          <p className="font-poppins text-xl md:text-2xl font-medium italic mb-4">
            You have not apply any jobs
          </p>
        )}

        <div className="space-y-6">
          {cvData.map((cv, index) => (
            <Card
              key={index}
              className="flex flex-col gap-y-4 border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {cv.postCvData?.postDetailData?.name || "N/A"}
                </h2>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    cv.statusCode === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : cv.statusCode === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {cv.statusCode}
                </span>
              </div>

              <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                <p>
                  <strong className="font-semibold">Description:</strong>{" "}
                  {cv.description || "No description provided."}
                </p>
                <p>
                  <strong className="font-semibold">Job Level:</strong>{" "}
                  {cv.postCvData?.postDetailData?.jobLevelPostData?.value ||
                    "N/A"}
                </p>
                <p>
                  <strong className="font-semibold">Location:</strong>{" "}
                  {cv.postCvData?.postDetailData?.provincePostData?.value ||
                    "N/A"}
                </p>
                <p>
                  <strong className="font-semibold">Salary:</strong>{" "}
                  {cv.postCvData?.postDetailData?.salaryTypePostData?.value ||
                    "Negotiable"}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Applied on: {new Date(cv.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourApplication;
