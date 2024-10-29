import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { LinkedIn, Facebook, Instagram } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Footer() {
  return (
    <div className="flex flex-col bg-white">
      <div className="lg:hidden md:hidden sm:hidden">
        <Accordion type="multiple" collapsible="true">
          <AccordionItem value="aboutus" className="mx-8">
            <AccordionTrigger>
              <p className="font-medium text-lg text-third ">About us</p>
            </AccordionTrigger>
            <AccordionContent>Careers</AccordionContent>
            <AccordionContent>Press & News</AccordionContent>
            <AccordionContent>Partnerships</AccordionContent>
            <AccordionContent>Privacy Policy</AccordionContent>
            <AccordionContent>Terms of Service</AccordionContent>
          </AccordionItem>
          <AccordionItem value="categories" className="mx-8">
            <AccordionTrigger>
              <p className="font-medium text-lg text-third ">Categories</p>
            </AccordionTrigger>
            <AccordionContent>Graphics & Design</AccordionContent>
            <AccordionContent>Digital Marketing</AccordionContent>
            <AccordionContent>Writing & Translation</AccordionContent>
            <AccordionContent>Video & Animation</AccordionContent>
            <AccordionContent>Music & Audio</AccordionContent>
            <AccordionContent>Logo Maker</AccordionContent>
            <AccordionContent>Programming & Tech</AccordionContent>
            <AccordionContent>Data</AccordionContent>
            <AccordionContent>Business</AccordionContent>
          </AccordionItem>
          <AccordionItem value="employer" className="mx-8">
            <AccordionTrigger>
              <p className="font-medium text-lg text-third ">For Employer</p>
            </AccordionTrigger>
            <AccordionContent>Post a Job</AccordionContent>
            <AccordionContent>Search Resumes</AccordionContent>
            <AccordionContent>Other Products & Services</AccordionContent>
            <AccordionContent>Contact Us</AccordionContent>
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
          </AccordionItem>
        </Accordion>
      </div>

      <div className="hidden lg:grid md:grid sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:mx-36 md:mx-20 sm:mx-12 py-8 gap-10">
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
