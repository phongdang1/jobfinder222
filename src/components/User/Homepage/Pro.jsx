import ProImage from "../../../assets/Home/pro.png";
import { Button } from "@/components/ui/button";

function Pro() {
  return (
    <div className="bg-[#4a3d8d] bg-opacity-80 mb-8 w-full h-full flex flex-col font-poppins text-secondary">
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center mx-auto lg:px-2 md:px-12">
        {/* Text Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left px-4">
          <div className="py-4 md:py-8 text-2xl md:text-3xl lg:text-4xl font-bold">
            Jobfinder Pro.
          </div>
          <div className="text-4xl md:text-5xl lg:text-6xl pt-2 pb-6 md:pb-10 font-semibold">
            Introduce
          </div>
          <div className="font-light text-base md:text-lg lg:text-xl">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              quis, assumenda esse reprehenderit error nulla corrupti. Dicta
              exercitationem dolore quod quae. Libero pariatur alias blanditiis,
              minus necessitatibus recusandae consequatur asperiores!
            </p>
            <p className="mt-4"> We have:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
            </ul>
          </div>
          <div className="my-6">
            <Button
              className="bg-third text-secondary hover:bg-third/85 hover:text-secondary border-third"
              variant="outline"
            >
              Get Started
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
