import { Link } from "react-router-dom";

function UserProfileUpdateHeader() {
  return (
    <div className="flex justify-between sticky top-0 px-6 md:px-16 lg:px-36 py-4 md:py-6 bg-secondary items-center font-poppins border-b-2 shadow-md z-50">
      <div className="mx-auto">
        <Link to="/" className="text-lg font-semibold">
          Logo
        </Link>
      </div>
    </div>
  );
}

export default UserProfileUpdateHeader;
