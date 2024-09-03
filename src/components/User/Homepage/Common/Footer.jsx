import { LinkedIn, Facebook, Instagram } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Footer() {
  return (
    <div className="flex flex-col bg-white">
      <Separator className="" />
      <div className="grid grid-cols-4 mx-36 py-8 gap-10">
        <div className="font-poppins ">
          <p className="font-semibold text-xl text-third mb-4">About us</p>
          <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
            <li>Careers</li>
            <li>Press & News</li>
            <li>Partnerships</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div className="font-poppins ">
          <p className="font-semibold text-xl text-third mb-4">Categories</p>
          <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
            <li>Graphics & Design</li>
            <li>Digital Marketing</li>
            <li>Writing & Translation</li>
            <li>Video & Animation</li>
            <li>Music & Audio</li>
            <li>Logo Maker</li>
            <li>Programming & Tech</li>
            <li>Data</li>
            <li>Business</li>
          </ul>
        </div>
        <div className="font-poppins ">
          <p className="font-semibold text-xl text-third mb-4">For Employer</p>
          <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
            <li>Post a Job</li>
            <li>Search Resumes</li>
            <li>Other Products & Services</li>
            <li>Contact Us</li>
          </ul>
          <div className="flex gap-2 w-2/3 mt-10 text-sm text-third/60 font-semibold items-center cursor-pointer hover:text-primary">
            <p>Become an Employer?</p>
            <ArrowForwardIosIcon fontSize="10px" />
          </div>
        </div>
        <div className="font-poppins ">
          <p className="font-semibold text-xl text-third mb-4">
            Jobs by Region
          </p>
          <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
            <li>Ho Chi Minh City</li>
            <li>Hanoi</li>
            <li>Hai Phong</li>
            <li>Da Nang</li>
            <li>Can Tho</li>
          </ul>
        </div>
      </div>
      <div className="mx-36">
        <Separator className="" />
        <div className="flex py-4 items-center justify-between ">
          {/* left */}
          <div className="flex gap-4">
            <div>Logo</div>
            <p>© 2024 JobFinder. All rights reserved.</p>
          </div>
          {/* right */}
          <div className="flex gap-2 items-center">
            <p>Find us on social media: </p>
            <ul className="flex gap-2">
              <a href="#">
                <LinkedIn />
              </a>
              <a href="#">
                <Facebook color="disabled" />
              </a>
              <a href="#">
                <Instagram />
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
