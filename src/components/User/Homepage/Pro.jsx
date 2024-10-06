import { Link } from "react-router-dom";
import ProImage from "../../../assets/Home/Home/pro.png";
import { Button } from "@/components/ui/button";

function Pro() {
  return (
    <div className="bg-[#4a3d8d] rounded-3xl py-10 mx-auto bg-opacity-80 mb-32 w-[80%] h-full flex flex-col font-poppins text-secondary">
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center mx-auto lg:px-2 md:px-12">
        {/* Text Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left px-4">
          <div className="py-4 md:py-8 text-xl md:text-2xl lg:text-3xl font-bold">
            Jobfinder Pro.
          </div>
          <div className="text-2xl md:text-3xl lg:text-4xl pt-2 pb-6 md:pb-10 font-semibold">
            Unlock Premium Benefits
          </div>
          <div className="font-light text-base md:text-md lg:text-lg">
            <p>
              Take control of your career with features that bring you closer to
              the perfect opportunity through JobFinder VIP package.
            </p>
            <p className="mt-4"> With Jobfinder Pro, you get:</p>
            <ul className="list-disc px-5 mt-2">
              <li>
                Priority listing for job applications, increasing your
                visibility to top employers.
              </li>
              <li>
                Access to personalized job recommendations tailored to your
                skills and career goals.
              </li>
              <li>
                Detailed insights on job market trends and salary benchmarking
                to help you make informed decisions.
              </li>
            </ul>
          </div>
          <div className="my-6">
            <Button
              className="bg-third text-secondary hover:bg-third/85 hover:text-secondary border-third"
              variant="outline"
            >
             <Link to='vip'>Get Started </Link> 
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="w-full md:w-2/5 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[550px] bg-cover bg-left rounded-2xl mt-6 md:mt-0 md:ml-8"
          style={{
            backgroundImage: `url(${ProImage})`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Pro;
