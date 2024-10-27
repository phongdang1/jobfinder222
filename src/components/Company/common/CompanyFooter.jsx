import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { LinkedIn, Facebook, Instagram } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import logo from "../../../assets/images/JobFinder_logoText.png";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
function CompanyFooter() {
  return (
    <div className="flex flex-col bg-white w-full mt-4">
      <div className="mx-36">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:mb-4 sm:mb-4 mb-2 w-full">
          <img src={logo} className="w-52" />

          <div className="flex lg:mx-36 md:mx-20 sm:mx-12 py-8 gap-10">
            <div className="font-poppins ">
              <p className="font-semibold text-xl text-third mb-4 text-center md:text-left">
                Contact
              </p>
              <ul className="text-sm flex flex-col gap-4 text-third/60 font-semibold">
                <li className="flex gap-2 items-center justify-center md:justify-normal">
                  <FaPhoneAlt /> 0905291089
                </li>
                <li className="flex gap-2 items-center justify-center md:justify-normal">
                  <CiMail /> jobfinder256@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:w-full  lg:flex md:flex sm:flex hidden">
          <Separator />
        </div>
        <div className="md:flex gap-4 justify-between my-4">
          <div>© 2024 JobFinder. All rights reserved.</div>
          <div>
            Illustration by{" "}
            <a href="https://icons8.com/illustrations/author/ZQDZn9ZZj5aQ">
              Violetta Barsuk
            </a>{" "}
            from <a href="https://icons8.com/illustrations">Ouch!</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyFooter;
