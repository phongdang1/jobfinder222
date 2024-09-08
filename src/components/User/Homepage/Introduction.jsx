import Bg from "../../../assets/Home/bg2.png";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";

function Introduction() {
  return (
    <div className="flex items-center justify-center bg-[#4a3d8d] bg-opacity-80 mb-16 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center">
        {/* Text Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left px-4">
          <div className="text-white text-4xl md:text-5xl lg:text-6xl pb-4 md:pb-8">
            <p className="font-poppins">One Step Closer To</p>
            <p className="inline-flex gap-4">
              Your
              <span className="text-primary font-forum text-5xl md:text-6xl lg:text-7xl font-[550]">
                Dream Job
              </span>
            </p>
          </div>
          <div className="font-poppins text-white text-lg md:text-xl pb-4 md:pb-8">
            Let Us Help You Find A Job That Suits You Best!
          </div>
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input
              className="border-r-2"
              type="email"
              placeholder="What service are you looking for today?"
            />
            <Button type="submit" className="p-3 bg-third">
              <SearchIcon sx={{ color: "white" }} />
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <div
          className="w-full md:w-2/5 h-[300px] md:h-[550px] bg-cover bg-center rounded-2xl mt-8 md:mt-0 md:ml-8"
          style={{ backgroundImage: `url(${Bg})` }}
        ></div>
      </div>
    </div>
  );
}

export default Introduction;
