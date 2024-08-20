import ProImage from "../../../assets/Home/pro.png";
import { Button } from "@/components/ui/button";

function Pro() {
  return (
    <div className="bg-[#4a3d8d] bg-opacity-80 mb-8 w-full h-full flex flex-col font-poppins text-secondary">
      <div className="grid grid-cols-2 mx-36 mt-6">
        <div>
          <div className="py-8">Jobfinder Pro.</div>
          <div className="text-6xl pt-2 pb-10">Introduce </div>
          <div className="font-light text-lg">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              quis, assumenda esse reprehenderit error nulla corrupti. Dicta
              exercitationem dolore quod quae. Libero pariatur alias blanditiis,
              minus necessitatibus recusandae consequatur asperiores!
            </p>
            <p> We have:</p>
            <ul>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
            </ul>
          </div>
          <div className="mt-4">
            <Button
              className="bg-third text-secondary hover:bg-third/85 hover:text-secondary border-third"
              variant="outline"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div
          className="w-full h-[550px] bg-cover bg-center my-4 rounded-2xl "
          style={{
            backgroundImage: `url(${ProImage})`,
            backgroundPosition: "center left",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Pro;
