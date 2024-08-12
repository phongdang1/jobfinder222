import Introduction from "@/components/User/Homepage/Introduction";
import LatestJob from "@/components/User/Homepage/LatestJob";
import HomeCategory from "@/components/User/Homepage/HomeCategory";
import Pro from "@/components/User/Homepage/Pro";

function HomePage() {
  return (
    <>
      <Introduction />
      <HomeCategory />
      <LatestJob />
      <Pro />
    </>
  );
}

export default HomePage;
