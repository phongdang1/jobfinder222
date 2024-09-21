import Hat from "../../../assets/Home/UserProfileUpdate/hat.png";
import Work from "../../../assets/Home/UserProfileUpdate/work.png";

import Paginition from "./Common/Paginition";

function Experience() {
  return (
    <div className="h-full 2xl:h-[600px] lg:mx-40 md:mx-10 pb-16  my-10 bg-white shadow-xl rounded-2xl">
      <p className="text-center pt-8 text-xl font-semibold">
        Have you got any experience yet?
      </p>
      <div className="flex gap-8 h-[270px] 2xl:h-[350px] mt-12 2xl:mt-24 mx-2 justify-center">
        <div
          className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-1/2 lg:h-full md:h-full sm:h-80 rounded-2xl border-2 border-gray-300 p-2
                         flex flex-col items-center justify-center
                         hover:border-2 hover:border-primary hover:cursor-pointer hover:text-primary"
        >
          <div
            className="bg-center bg-cover w-3/5 h-3/5"
            style={{ backgroundImage: `url(${Hat})` }}
          ></div>
          <p className="text-center mt-4 text-base font-medium">
            I am just graduated
          </p>
        </div>
        <div
          className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-1/2 lg:h-full md:h-full sm:h-80 rounded-2xl border-2 border-gray-300 p-2
                          flex flex-col items-center justify-center
                          hover:border-2 hover:border-primary hover:cursor-pointer hover:text-primary"
        >
          <div
            className="bg-center bg-cover w-4/5 h-3/5"
            style={{ backgroundImage: `url(${Work})` }}
          ></div>
          <p className="text-center mt-4 text-base font-medium">
            I have work experience
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
