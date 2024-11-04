import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/JobFinder_logoText.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuIcon from "@mui/icons-material/Menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@mui/material";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { getCompanyById } from "@/fetchData/Company";

const CompanyHeader = () => {
  const companyData = JSON.parse(localStorage.getItem("company"));
  const companyId = companyData?.data.id;
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("company");
    fetchCompany();
  };

  const fetchCompany = async (companyId) => {
    try {
      const response = await getCompanyById(companyId);
      console.log(companyId);
      console.log("Response ", response);

      if (response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Lưu thông tin người dùng vào localStorage
        console.log("User data set in Redux and localStorage:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchCompany(companyId);
  }, []);

  return (
    <>
      <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-white  min-h-[70px] tracking-wide sticky top-0 z-50">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full mx-16">
          <div className="max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
              </svg>
            </button>

            <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/company/dashboard"
                  className="hover:text-primary text-third block font-semibold text-[15px]"
                >
                  Dashboard
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/company/jobPost"
                  className="hover:text-primary text-third block font-semibold text-[15px]"
                >
                  Job Post
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/company/candidate"
                  className="hover:text-primary text-third block font-semibold text-[15px]"
                >
                  Candidate
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to=""
                  className="hover:text-primary text-third block font-semibold text-[15px]"
                >
                  Transaction
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/company/createJobPost"
                  className="hover:text-primary text-third block font-semibold text-[15px]"
                >
                  Create New Post
                </Link>
              </li>
            </ul>
          </div>
          {/* logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/company/dashboard">
              <img src={logo} alt="logo" className="w-40" />
            </Link>
          </div>

          {/* user chỗ ni */}
          {companyId === null || companyId === undefined ? (
            <div className="hidden lg:flex items-center ml-auto space-x-6">
              <Button
                className="font-semibold text-primary hover:text-white hover:bg-primary"
                variant="ghost"
              >
                <Link to="/signup">Sign up</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full lg:w-auto border border-primary text-primary bg-white hover:bg-primary hover:text-white"
              >
                Login
              </Button>
            </div>
          ) : (
            <li className="flex items-center space-x-4 relative">
              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ring-0 border-0">
                  <div className="flex active:opacity-60">
                    <Avatar
                      alt={user?.data?.phoneNumber}
                      src={user?.data?.image}
                      className="cursor-pointer"
                    />
                    <button className="absolute -right-2 bottom-0   bg-background rounded-full">
                      <IoMdArrowDropdown className="w-5 h-5" />
                    </button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuLabel>
                    Hello, {user?.data?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/companyProfile/profile"
                      className="cursor-pointer"
                    >
                      Company Profile
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </div>

        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="text-primary" />
            </SheetTrigger>
            <SheetContent className="pt-16 space-y-4">
              {/* login, register */}
              {/* {(user != null || user != undefined) && (
                <SheetHeader>
                  <Link to="/userProfile">
                    <p className="text-center text-lg font-medium">
                      Hello, {user?.data?.firstName} !
                    </p>
                  </Link>
                </SheetHeader>
              )} */}
              {/* những component còn lại
              <SheetHeader>
                <SheetClose asChild>
                  <Link
                    className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                    to="/"
                  >
                    Dashboard
                  </Link>
                </SheetClose>
              </SheetHeader>
              <SheetHeader>
                <SheetClose asChild>
                  <Link
                    className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                    to="/jobPost"
                  >
                    Job Post
                  </Link>
                </SheetClose>
              </SheetHeader>
              <SheetHeader>
                <SheetClose asChild>
                  <Link
                    className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                    to="/companypage"
                  >
                    Candidate
                  </Link>
                </SheetClose>
              </SheetHeader>

              <SheetHeader>
                <SheetClose asChild>
                  <Link
                    className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                    to="/companypage"
                  >
                    Transaction
                  </Link>
                </SheetClose>
              </SheetHeader>

              {/* nút logout */}
              {/* {user === null || user === undefined ? ( */}
              <>
                <SheetHeader>
                  <SheetClose asChild>
                    <Link
                      className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                      to="/signup"
                    >
                      Register
                    </Link>
                  </SheetClose>
                </SheetHeader>
                <SheetHeader>
                  <SheetClose asChild>
                    <Link
                      className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                      to="/login"
                    >
                      Login
                    </Link>
                  </SheetClose>
                </SheetHeader>
              </>
              {/* ) : ( */}
              <SheetHeader>
                <button
                  // onClick={handleLogout}
                  className="text-center text-red-600 hover:text-red-700 text-lg font-medium"
                >
                  Logout
                </button>
              </SheetHeader>
              {/* )} */}
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default CompanyHeader;
