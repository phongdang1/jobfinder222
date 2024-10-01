import Introduction from "@/components/User/Homepage/Introduction";
import BestJob from "@/components/User/Homepage/BestJob";
import HomeCategory from "@/components/User/Homepage/HomeCategory";
import Pro from "@/components/User/Homepage/Pro";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div className="flex flex-col gap-y-32">
      <Introduction />
      <HomeCategory />
      <BestJob />
      <Pro />
    </div>
  );
}

export default HomePage;
