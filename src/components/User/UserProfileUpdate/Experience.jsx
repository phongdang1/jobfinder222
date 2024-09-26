import Hat from "../../../assets/Home/UserProfileUpdate/hat.png";
import Work from "../../../assets/Home/UserProfileUpdate/work.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { handleSetDataUserDetail } from "@/fetchData/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Experience() {
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user id:", userId);

    const dataSent = {
      userId: userId,
      data: { experienceJobCode: experience },
    };
    try {
      const response = await handleSetDataUserDetail(dataSent);
      if (response) {
        navigate("/profileUpdate/information");
        console.log(response.data);
      } else {
        console.log("k di tiep dc");
      }
    } catch (error) {
      console.log("loi roi");
    }
  };

  return (
    <div className="w-full h-full block">
      <form onSubmit={handleSubmit}>
        <div className="h-full 2xl:h-[600px] lg:mx-40 md:mx-10 pb-16  my-10 bg-white shadow-xl rounded-2xl">
          <p className="text-center pt-8 text-xl font-semibold">
            Have you got any experience yet?
          </p>
          <div className="flex gap-8 h-[270px] 2xl:h-[350px] mt-12 2xl:mt-24 mx-2 justify-center">
            <button
              onClick={() => setExperience("1Nam")}
              type="button"
              className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-1/2 lg:h-full md:h-full sm:h-80 rounded-2xl border-2 border-gray-300 p-2
                               flex flex-col items-center justify-center
                               hover:border-2 hover:border-primary hover:cursor-pointer hover:text-primary focus:border-2 focus:border-primary focus:cursor-pointer"
            >
              <div
                className="bg-center bg-cover w-3/5 h-3/5"
                style={{ backgroundImage: `url(${Hat})` }}
              ></div>
              <p className="text-center mt-4 text-base font-medium">
                I am just graduated
              </p>
            </button>
            <button
              onClick={() => setExperience("2Nam")}
              type="button"
              className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-1/2 lg:h-full md:h-full sm:h-80 rounded-2xl border-2 border-gray-300 p-2
                               flex flex-col items-center justify-center
                               hover:border-2 hover:border-primary hover:cursor-pointer hover:text-primary focus:border-2 focus:border-primary focus:cursor-pointer"
            >
              <div
                className="bg-center bg-cover w-4/5 h-3/5"
                style={{ backgroundImage: `url(${Work})` }}
              ></div>
              <p className="text-center mt-4 text-base font-medium">
                I have work experience
              </p>
            </button>
          </div>
        </div>
        <div className="h-16 lg:mx-40 md:mx-10 my-10 bg-white shadow-xl rounded-2xl flex justify-end items-center">
          <button
            type="submit"
            className="flex gap-2 pl-4 hover:bg-primary cursor-pointer rounded-2xl items-center h-full transition-all duration-300 pr-4"
            to={"/profileUpdate/information"}
          >
            <div className="flex gap-1">
              <p>Next</p>
              <ArrowForwardIcon />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Experience;
