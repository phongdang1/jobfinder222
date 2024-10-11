import React, { useEffect, useState } from "react";
import axios from "../../../fetchData/axios";
import { getCvByUserId } from "../../../fetchData/CvPost";

const YourApplication = () => {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState();
  const [cvData, setCvData] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/getUserById?id=${userId}`);
      const cvResponse = await getCvByUserId(userId);
      if (response.data.errCode === 0 && cvResponse.data.errCode === 0) {
        setUser(response.data.data);
        setCvData(cvResponse.data.data);
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
      <div className="bg-white h-fit rounded-lg font-poppins text-xl md:text-2xl font-medium px-4 py-6">
        Welcome, {user?.firstName}
      </div>

      <div className="bg-white h-fit p-4">
        <h1 className="text-xl">Your Application :</h1>

        {/* card  */}
        {cvData.map((cv, index) =>{
          return (
            <div key={index} className="flex flex-col gap-y-2">
              <h2 className="text-lg font-medium">{cv.postCvData?.postDetailData?.name}</h2>
              <p>{cv.postCvData?.postDetailData?.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default YourApplication;
