import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between sticky top-0 px-24 py-4 bg-secondary items-center font-poppins border-b-2 shadow-lg ">
      {/* left */}
      <div className="flex gap-32 items-center">
        <div>Logo</div>
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
            <Link to="/login">Login</Link>
          </Button>
          <Button
            className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary"
            variant="outline"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
