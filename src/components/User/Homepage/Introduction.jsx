import Bg from "../../../assets/Home/Home/bg2.png";
import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@/components/ui/button";
import image from "../../../assets/images/design.jpg";
import illustrationGIF from "../../../assets/illustration/home/blueberry-online-meeting-via-group-call.gif";
import illustrationGIF2 from "../../../assets/illustration/home/blueberry-woman-working-with-financial-analytics.gif";
import facebook from "../../../assets/illustration/home/blueberry-facebook-icon.png";
import instagram from "../../../assets/illustration/home/blueberry-instagram-icon.png";
import star from "../../../assets/illustration/home/blueberry-star-icon.png";
import fpt from "../../../assets/illustration/home/fpt.jpg";
import curved from "../../../assets/illustration/home/curved.svg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function Introduction() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration
      once: true, // Animation occurs only once
    });
  }, []);
  return (
    <>

    {/* Text Section */}
    <div className="flex flex-col justify-center items-center w-full text-center md:text-left mt-16 relative"
    data-aos="fade-up"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl pb-4 md:pb-8 text-center">
        <p className="font-roboto font-semibold">Find your top</p>
        <div className="font-roboto font-semibold gap-4 text-center">
          career opportunities at
          <p className="text-primary font-forum text-5xl md:text-6xl lg:text-7xl font-semibold">
            Job Finder
          </p>
        </div>
      </div>
      <p className="font-roboto text-sm lg:text-xl md:text-xl pb-4 md:pb-8 text-center px-8 lg:px-60 xl:px-96">
        A system that connects your career opportunities with your passions and talents, helping you thrive in a fulfilling professional journey.
      </p>
      <div className="relative flex w-full max-w-sm items-center gap-2">
        <Input
          className="border-r-2"
          type="email"
          placeholder="What service are you looking for today?"
        />
        <Button type="submit" className="p-3 bg-third absolute right-0 top-0 rounded-r-full">
          <SearchIcon  sx={{ color: "white" }} />
        </Button>
      </div>
  
      {/*  Images */}

        {/* Left */}
        <img
          src={facebook}
          className="absolute w-20 h-20 md:left-24 left-10  md:-bottom-5 sm:-bottom-14 hidden sm:block"
          data-aos="fade-up"
          data-aos-delay="200"
        />
        <img
          src={star}
          className="absolute w-20 h-20 left-56 -top-28 xl:-top-10 opacity-75 hidden sm:block"
          data-aos="fade-up"
          data-aos-delay="400"
        />
        <img
          src={illustrationGIF}
          className="absolute w-72 h-72 left-28 top-5 hidden xl:block"
          data-aos="fade-up"
          data-aos-delay="600"
        />
        <img
          src={instagram}
          className="absolute w-20 h-20 xl:left-80 right-10 md:-bottom-3 sm:-bottom-14 hidden sm:block"
          data-aos="fade-up"
          data-aos-delay="800"
        />

        {/* Right */}
        <img
          src={illustrationGIF2}
          className="absolute w-72 h-72 object-cover right-28 bottom-8 hidden xl:block"
          data-aos="fade-up"
          data-aos-delay="1000"
        />
        {/* <img
          src={fpt}
          className="absolute w-32 h-20 right-28 -top-10 rounded-full hidden xl:block"
          data-aos="fade-up"
          data-aos-delay="1200"
        /> */}
      </div>
    </>
  );
}

export default Introduction;
