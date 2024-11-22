import { Link } from "react-router-dom";
import logoText from "../../../../assets/images/JobFinder_logoText.png";
import logo from "../../../../assets/images/JobFinder_logo.png";

function UserProfileUpdateHeader() {
  return (
    <div className="flex justify-between sticky top-0 px-6 md:px-16 lg:px-36 py-4 md:py-6 bg-secondary items-center font-poppins border-b-2 shadow-md z-50">
      <div className="mx-auto">
        <img
          className="w-full h-16 hidden lg:block"
          src={logoText}
          alt="JobFinder Logo"
        />
        <img
          className="w-full h-16 lg:hidden block"
          src={logo}
          alt="JobFinder Logo"
        />
      </div>
    </div>
  );
}

export default UserProfileUpdateHeader;
