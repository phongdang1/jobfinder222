import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../../../redux/features/authSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import axios from "../../../fetchData/axios";
import logoText from "../../../assets/images/JobFinder_logoText.png";
import logo from "../../../assets/images/JobFinder_logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState();
  const token = useSelector((state) => state.auth.token);
  const userId = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`/getUserById?id=${userId}`);
      console.log("Response from /getUserById:", response);

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
    fetchUser(userId);
  }, [userId , user]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`flex justify-between sticky top-0 px-6 md:px-16 lg:pr-36 lg:pl-20 py-4 md:py-6 items-center font-poppins z-50 
    transition-all duration-300 ease-in-out 
    ${isScrolled ? "bg-secondary border-b-2 shadow-md " : ""}`}
    >
      {/* Logo */}
      <div className="flex items-center ml-16">
        <Link to="/" className="text-lg font-semibold">
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
        </Link>
      </div>

      {/* nav */}
      <div className="flex gap-4 md:gap-8 items-center">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="text-primary" />
            </SheetTrigger>
            <SheetContent className="pt-16 space-y-4">
              {/* login, register */}
              {(userId != null || userId != undefined) && (
                <SheetHeader>
                  <Link to="/userProfile">
                    <p className="text-center text-lg font-medium">
                      Hello, {user?.data?.firstName} !
                    </p>
                  </Link>
                </SheetHeader>
              )}
              {/* những component còn lại */}
              <SheetHeader>
                <SheetClose asChild>
                  <Link
                    className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                    to="/"
                  >
                    Home
                  </Link>
                </SheetClose>
              </SheetHeader>
              <SheetHeader>
                <SheetClose asChild>
                  <Link
                    className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </SheetClose>
              </SheetHeader>
              <SheetHeader>
                <SheetClose asChild>
                  <Link
                    className="text-center hover:bg-secondary hover:text-primary text-lg font-medium"
                    to="/companypage"
                  >
                    Company
                  </Link>
                </SheetClose>
              </SheetHeader>

              {/* nút logout */}
              {userId === null || userId === undefined ? (
                <>
                  <SheetHeader>
                    <SheetClose asChild>
                      <Link
                        className="text-center text-primary hover:bg-secondary hover:text-primary text-lg font-medium"
                        to="/signup"
                      >
                        Register
                      </Link>
                    </SheetClose>
                  </SheetHeader>
                  <SheetHeader>
                    <SheetClose asChild>
                      <Link to="/login" className="flex items-center justify-center">
                        <Button className="text-center border border-primary bg-white hover:bg-secondary hover:text-primary text-lg font-medium">
                          Login{" "}
                        </Button>
                      </Link>
                    </SheetClose>
                  </SheetHeader>
                </>
              ) : (
                <SheetHeader>
                  <button
                    onClick={handleLogout}
                    className="text-center text-red-600 hover:text-red-700 text-lg font-medium"
                  >
                    Logout
                  </button>
                </SheetHeader>
              )}
            </SheetContent>
          </Sheet>
        </div>
        <ul className="hidden md:hidden sm:hidden lg:flex gap-8 items-center text-third text-md font-medium">
          <li className="hover:text-primary">
            <Button className=" text-third  hover:text-primary" variant="ghost">
              <Link to="/">Home</Link>
            </Button>
          </li>
          <li className="hover:text-primary">
            <Button className=" text-third  hover:text-primary" variant="ghost">
              <Link to="/jobs">Jobs</Link>
            </Button>
          </li>
          <li className="hover:text-primary">
            <Button className=" text-third hover:text-primary" variant="ghost">
              <Link to="/companypage">Company</Link>
            </Button>
          </li>
          {userId === null || userId === undefined ? (
            <>
              <li>
                <Button className="font-semibold text-primary" variant="ghost">
                  <Link to="/signup">Register</Link>
                </Button>
              </li>
              <li>
                <Button
                  className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary"
                  variant="outline"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </li>
            </>
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
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Hello, {user?.data?.firstName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/userProfile/personalInfo"
                      className="cursor-pointer"
                    >
                      User Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/userProfile/advancedSetting"
                      className="cursor-pointer"
                    >
                      Advance Setting
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      to="/userProfile/changePassword"
                      className="cursor-pointer"
                    >
                      Change Password
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-700 cursor-pointer w-full"
                    >
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
