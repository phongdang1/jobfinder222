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
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector((state) => state.auth.user);
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
        dispatch(setUser(response.data)); // Cập nhật thông tin người dùng vào Redux store
        localStorage.setItem("user", JSON.stringify(response.data)); // Lưu thông tin người dùng vào localStorage
        console.log("User data set in Redux and localStorage:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  useEffect(() => {
    fetchUser(userId);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
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
      <div className="flex items-center">
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
              {(user != null || user != undefined) && (
                <SheetHeader>
                  <Link to="/profile">
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
              {user === null || user === undefined ? (
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
        <ul className="hidden md:hidden sm:hidden lg:flex gap-2 items-center text-third text-sm md:text-sm font-medium">
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
          {user === null || user === undefined ? (
            <>
              <li>
                <Button
                  className="bg-secondary text-third hover:bg-secondary hover:text-primary"
                  variant="ghost"
                >
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
            <li className="flex items-center space-x-4">
              <Link className="flex items-center space-x-2" to="/profile">
                <Avatar alt={user?.phoneNumber} src={user?.image} />
                <span className="text-third">{user?.data?.firstName}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
