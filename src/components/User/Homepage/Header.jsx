import { Button } from "@/components/ui/button";

function Header() {
  return (
    <>
      <div className="flex justify-between px-20 py-8 bg-background">
        {/* left */}
        <div className="flex gap-20">
          <div>Logo</div>
          <ul className="flex gap-8">
            <li>Home</li>
            <li>About us</li>
            <li>Pricing</li>
            <li>Features</li>
          </ul>
        </div>
        {/* right */}
        <div className="flex gap-4">
          <Button className="bg-third text-white hover:bg-[#776acc]">
            Login
          </Button>
          <Button className="bg-primary text-white hover:bg-green-600">
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
