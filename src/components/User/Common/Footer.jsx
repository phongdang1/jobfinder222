import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { LinkedIn, Facebook, Instagram } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex flex-col bg-white">
      <div className="lg:hidden md:hidden sm:hidden">
        <Accordion type="multiple" collapsible="true">
          <AccordionItem value="categories" className="mx-8">
            <AccordionTrigger>
              <p className="font-medium text-lg text-third ">Categories</p>
            </AccordionTrigger>
            <AccordionContent>Information Technology</AccordionContent>
            <AccordionContent>Law</AccordionContent>
            <AccordionContent>Human Resource Management</AccordionContent>
            <AccordionContent>Communication</AccordionContent>
            <AccordionContent>Tech</AccordionContent>
            <AccordionContent>Other</AccordionContent>
          </AccordionItem>
          <AccordionItem value="employer" className="mx-8">
            <AccordionTrigger>
              <p className="font-medium text-lg text-third ">For Company</p>
            </AccordionTrigger>
            <AccordionContent>FPT</AccordionContent>
            <AccordionContent>Thegioididong</AccordionContent>
            <AccordionContent>Viettel</AccordionContent>
            <AccordionContent>Giaohangnhanh</AccordionContent>
            <AccordionContent>Giaohangtietkiem</AccordionContent>
            <AccordionContent>Other Products & Services</AccordionContent>
          </AccordionItem>
          <AccordionItem value="regions" className="mx-8">
            <AccordionTrigger>
              <p className="font-medium text-lg text-third ">Jobs by Region</p>
            </AccordionTrigger>
            <AccordionContent>Ho Chi Minh City</AccordionContent>
            <AccordionContent>Hanoi</AccordionContent>
            <AccordionContent>Hai Phong</AccordionContent>
            <AccordionContent>Da Nang</AccordionContent>
            <AccordionContent>Can Tho</AccordionContent>
            <AccordionContent>Other</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="hidden lg:grid md:grid sm:grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 lg:mx-36 md:mx-20 sm:mx-12 py-8 gap-10">

        <div className="font-poppins ">
          <p className="font-semibold text-xl text-third mb-4">For Company</p>
          <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
            <Link to="/jobs" className="hover:text-primary">FPT</Link>
            <Link to="/jobs" className="hover:text-primary">Thegioididong</Link>
            <Link to="/jobs" className="hover:text-primary">Viettel</Link>
            <Link to="/jobs" className="hover:text-primary" >Giaohangnhanh</Link>
            <Link to="/jobs" className="hover:text-primary">Other</Link>
          </ul>

        </div>
        <div className="font-poppins ">
          <p className="font-semibold text-xl text-third mb-4">
            Jobs by Region
          </p>
          <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
            <Link to="/jobs" className="hover:text-primary">Ho Chi Minh City</Link>
            <Link to="/jobs" className="hover:text-primary">Hanoi</Link>
            <Link to="/jobs" className="hover:text-primary">Hai Phong</Link>
            <Link to="/jobs" className="hover:text-primary">Da Nang</Link>
            <Link to="/jobs" className="hover:text-primary">Can Tho</Link>
          </ul>
          <div className="flex gap-2 w-2/3 mt-10 text-sm text-third/60 font-semibold items-center cursor-pointer hover:text-primary">
            <Link to="/jobs" className="hover:text-primary">Become an Employer?</Link>
            <ArrowForwardIosIcon fontSize="10px" />
          </div>
        </div>
        <div className="font-poppins ">
          <p className="font-semibold text-xl text-third mb-4">Categories</p>
          <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
            <Link to="/jobs" className="hover:text-primary">Information Technology</Link>
            <Link to="/jobs" className="hover:text-primary">Economics</Link>
            <Link to="/jobs" className="hover:text-primary">Human Resource Management</Link>
            <Link to="/jobs" className="hover:text-primary">Communication</Link>
            <Link to="/jobs" className="hover:text-primary">Tech</Link>
            <Link to="/jobs" className="hover:text-primary">Other</Link>
          </ul>
        </div>
      </div>
      <div className="lg:mx-36 md:mx-20 sm:mx-12 lg:flex md:flex sm:flex hidden">
        <Separator />
      </div>
      <div className="lg:mx-36 md:ml-20 sm:ml-12 ml-8 ">
        <div className="lg:flex lg:justify-between md:block sm:block py-4 ">
          {/* left */}
          <div className="flex gap-4 md:mb-4 sm:mb-4 mb-2">
            <div>Logo</div>
            <p>© 2024 JobFinder. All rights reserved.</p>
            <p>
              Illustration by{" "}
              <a href="https://icons8.com/illustrations/author/ZQDZn9ZZj5aQ">
                Violetta Barsuk
              </a>{" "}
              from <a href="https://icons8.com/illustrations">Ouch!</a>
            </p>
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
