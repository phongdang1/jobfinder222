import { Button } from "@/components/ui/button";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ConnectLogo from "../../../assets/JobsPage/Logo1.png";
import DigiflexLogo from "../../../assets/JobsPage/Logo2.png";
import EsportLogo from "../../../assets/JobsPage/Logo3.png";
import TechLogo from "../../../assets/JobsPage/Logo4.png";
import FptLogo from "../../../assets/JobsPage/Logo5.png";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function FilterAndSearch() {
  return (
    <div>
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4">
        {/* Filter Column */}
        <div className="w-full md:w-1/4  p-4 rounded-lg mb-4 md:mb-0 to-purple-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <FilterListIcon />
            <span>Filter</span>
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Field
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
              <option>IT</option>
              <option>Engineering</option>
              <option>Marketing</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type of employment
            </label>
            <div className="flex flex-col">
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Full-time</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Part-time</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Work experience
            </label>
            <div className="flex flex-col">
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">0-1 Year</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">1-3 Year</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <div className="flex flex-col">
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Staff</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Manager</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Senior</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <div className="flex flex-col">
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Under 10 million</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">10-20 million</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">20-30 million</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Day of posting
            </label>
            <div className="flex flex-col">
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">All time</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Last 24 hours</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Last 2 days</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Last 3 days</span>
              </label>
              <label className="inline-flex items-center mt-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Last 7 days</span>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4 pl-0 md:pl-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Results (5 Jobs Found)</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-lg p-5 pr-3 flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={ConnectLogo}
                  alt="Job"
                  className="w-16 h-16 mr-3 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-black font-medium text-sm mb-1">
                    FPT Software.
                  </p>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold">
                      Software Developer
                    </h4>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs font-semibold rounded-full ml-4">
                      Full-time
                    </span>
                  </div>
                  <div className="flex flex-row items-center text-gray-700 text-sm mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <WorkOutlineOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Senior</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FmdGoodOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Hanoi</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AttachMoneyIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>20-30 million</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AccessTimeOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>2 days ago</p>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    <p>
                      This role involves developing, testing, and maintaining
                      software solutions for clients. You will work closely with
                      cross-functional teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-5 pr-3 flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={DigiflexLogo}
                  alt="Job"
                  className="w-16 h-16 mr-3 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-black font-medium text-sm mb-1">
                    FPT Software.
                  </p>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold">
                      Software Developer
                    </h4>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs font-semibold rounded-full ml-4">
                      Full-time
                    </span>
                  </div>
                  <div className="flex flex-row items-center text-gray-700 text-sm mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <WorkOutlineOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Senior</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FmdGoodOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Hanoi</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AttachMoneyIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>20-30 million</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AccessTimeOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>2 days ago</p>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    <p>
                      This role involves developing, testing, and maintaining
                      software solutions for clients. You will work closely with
                      cross-functional teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-5 pr-3 flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={EsportLogo}
                  alt="Job"
                  className="w-16 h-16 mr-3 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-black font-medium text-sm mb-1">
                    FPT Software.
                  </p>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold">
                      Software Developer
                    </h4>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs font-semibold rounded-full ml-4">
                      Full-time
                    </span>
                  </div>
                  <div className="flex flex-row items-center text-gray-700 text-sm mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <WorkOutlineOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Senior</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FmdGoodOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Hanoi</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AttachMoneyIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>20-30 million</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AccessTimeOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>2 days ago</p>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    <p>
                      This role involves developing, testing, and maintaining
                      software solutions for clients. You will work closely with
                      cross-functional teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-5 pr-3 flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={TechLogo}
                  alt="Job"
                  className="w-16 h-16 mr-3 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-black font-medium text-sm mb-1">
                    FPT Software.
                  </p>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold">
                      Software Developer
                    </h4>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs font-semibold rounded-full ml-4">
                      Full-time
                    </span>
                  </div>
                  <div className="flex flex-row items-center text-gray-700 text-sm mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <WorkOutlineOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Senior</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FmdGoodOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Hanoi</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AttachMoneyIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>20-30 million</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AccessTimeOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>2 days ago</p>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    <p>
                      This role involves developing, testing, and maintaining
                      software solutions for clients. You will work closely with
                      cross-functional teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-5 pr-3 flex flex-col space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={FptLogo}
                  alt="Job"
                  className="w-16 h-16 mr-3 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-black font-medium text-sm mb-1">
                    FPT Software.
                  </p>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold">
                      Software Developer
                    </h4>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs font-semibold rounded-full ml-4">
                      Full-time
                    </span>
                  </div>
                  <div className="flex flex-row items-center text-gray-700 text-sm mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                      <WorkOutlineOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Senior</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FmdGoodOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>Hanoi</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AttachMoneyIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>20-30 million</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AccessTimeOutlinedIcon
                        className="text-gray-600"
                        fontSize="small"
                      />
                      <p>2 days ago</p>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    <p>
                      This role involves developing, testing, and maintaining
                      software solutions for clients. You will work closely with
                      cross-functional teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 mb-5">
            <nav className="flex items-center space-x-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterAndSearch;
