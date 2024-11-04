import CompanyHeader from "../Company/common/CompanyHeader";
import CompanyFooter from "../Company/common/CompanyFooter";
import { Outlet } from "react-router-dom";
import CompanyProfilePage from "@/pages/User/Company/CompanyProfilePage";

function CompanyProfileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E6E6FA]/50">
      <CompanyHeader />
      <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-7 gap-2 px-4 lg:px-36 my-4">
        <CompanyProfilePage />
        <Outlet />
      </div>
      <CompanyFooter />
    </div>
  );
}

export default CompanyProfileLayout;
