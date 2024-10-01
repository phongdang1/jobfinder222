import Header from "../User/Common/Header";
import Footer from "../User/Common/Footer";
import { Outlet } from "react-router-dom";
import UserProfilePage from "@/pages/User/UserProfilePage";

function UserProfileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E6E6FA]/50">
      <Header />
      <div className="w-full h-full flex flex-col lg:flex-row gap-4 px-4 lg:px-36 my-4">
        <UserProfilePage />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserProfileLayout;
