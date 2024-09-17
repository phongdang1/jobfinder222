import UserProfileUpdateHeader from "../User/UserProfileUpdate/Common/UserProfileUpdateHeader";
import { Outlet } from "react-router-dom";

function UserProfileUpdateLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E6E6FA]/50">
      <UserProfileUpdateHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default UserProfileUpdateLayout;
