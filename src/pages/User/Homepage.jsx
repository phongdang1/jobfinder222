import Introduction from "@/components/User/Homepage/Introduction";
import BestJob from "@/components/User/Homepage/BestJob";
import HomeCategory from "@/components/User/Homepage/HomeCategory";
import Pro from "@/components/User/Homepage/Pro";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import FeaturedCompanies from "./../../components/User/Homepage/FeaturedCompanies";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 3000, // Điều chỉnh thời gian hiệu ứng (ms)
      once: false,    // Để hiệu ứng chạy lại mỗi khi cuộn đến
    });
    AOS.refresh();  // Làm mới lại AOS để đảm bảo nó hoạt động đúng
  }, []);

  return (
    <div className="flex flex-col gap-y-16 min-h-screen">
      <Introduction/>
      <BestJob />
      <HomeCategory />
      <FeaturedCompanies  />
      <Pro  />

    </div>
  );
}

export default HomePage;
