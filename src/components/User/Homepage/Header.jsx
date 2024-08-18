import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between sticky top-0 px-32 py-6 bg-secondary items-center font-poppins border-b-2 shadow-lg z-50">
      {/* left */}
      <div className="flex items-center pl-4">
        <div>
          <Link to="/">Logo</Link>
        </div>
      </div>

      {/* right */}

      <div className="flex gap-8 items-center">
        <div>
          <ul className="flex gap-8 text-third text-sm font-medium">
            <li>Home</li>
            <li>About Us</li>
            <li>Pricing</li>
            <li>Features</li>
          </ul>
        </div>
        <div className="flex gap-4 text-lg">
          <Button
            className="bg-secondary text-third hover:bg-secondary hover:text-primary"
            variant="ghost"
          >
            <Link to="/signup">Register</Link>
          </Button>
          <Button
            className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary"
            variant="outline"
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
