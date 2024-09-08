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

function Header() {
  return (
    <div className="flex justify-between sticky top-0 px-6 md:px-16 lg:px-36 py-4 md:py-6 bg-secondary items-center font-poppins border-b-2 shadow-md z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-lg font-semibold">
          Logo
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
            </SheetContent>
          </Sheet>
        </div>
        <ul className="hidden md:hidden sm:hidden lg:flex gap-2 items-center text-third text-sm md:text-sm font-medium">
          <li className="hover:text-primary">
            <Button
              className="bg-secondary text-third hover:bg-secondary hover:text-primary"
              variant="ghost"
            >
              <Link to="/">Home</Link>
            </Button>
          </li>

          <li className="hover:text-primary">
            <Button
              className="bg-secondary text-third hover:bg-secondary hover:text-primary"
              variant="ghost"
            >
              <Link to="/jobs">Jobs</Link>
            </Button>
          </li>
          <li className="hover:text-primary">
            <Button
              className="bg-secondary text-third hover:bg-secondary hover:text-primary"
              variant="ghost"
            >
              <Link to="/companypage">Company</Link>
            </Button>
          </li>

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
        </ul>
      </div>
    </div>
  );
}

export default Header;
