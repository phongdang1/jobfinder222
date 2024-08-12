import Bg from "../../../assets/Home/bg2.png";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";

function Introduction() {
  return (
    <div className="flex items-center justify-center bg-[#4a3d8d] bg-opacity-80 mx-24 my-8 rounded-2xl">
      <div className="flex w-full max-w-7xl ">
        {/* Text Section */}
        <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left px-4">
          <div className="">
            <div className="text-white text-6xl pb-8 justify-center ">
              <p className="font-poppins">One Step Closer To</p>
              <p className="inline-flex gap-4">
                Your
                <span className="text-primary font-forum text-7xl font-medium">
                  Dream Job
                </span>
              </p>
            </div>
            <div className="font-poppins text-white text-xl pb-8">
              Let Us Help You Find A Job That Suits You Best!
            </div>
            <div className="flex w-full max-w-sm items-center gap-2">
              <Input
                className=" border-r-2"
                type="email"
                placeholder="What service are you looking for today?"
              />
              <Button type="submit" className="p-3 bg-third hover:">
                <SearchIcon sx={{ color: "white" }} />
              </Button>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div
          className="w-2/5 h-[550px] bg-cover bg-center my-4 rounded-2xl ml-20"
          style={{ backgroundImage: `url(${Bg})` }}
        ></div>
      </div>
    </div>
  );
}

export default Introduction;
