import Introduction from "@/components/User/Homepage/Introduction";
import BestJob from "@/components/User/Homepage/BestJob";
import HomeCategory from "@/components/User/Homepage/HomeCategory";
import Pro from "@/components/User/Homepage/Pro";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import FeaturedCompanies from './../../components/User/Homepage/FeaturedCompanies';

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 3000,   // Thời gian thực hiện hiệu ứng
      once: true,      // Để hiệu ứng chạy lại mỗi khi cuộn đến
     // Kích hoạt hiệu ứng khi cuộn đến gần phần tử
    });
    AOS.refresh();      // Làm mới lại AOS để chắc chắn nó hoạt động đúng
  }, []);

  return (
    <div className="flex flex-col gap-y-40">
      <Introduction data-aos="fade-up" />
      <HomeCategory data-aos="fade-right" />
      <BestJob data-aos="fade-left" />
      <FeaturedCompanies data-aos="fade-down" />
      <Pro data-aos="fade-up" />
    </div>
  );
}

export default HomePage;
