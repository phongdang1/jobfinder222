import { useState, useEffect } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import GlobalLoadingMain from "@/components/GlobalLoading/GlobalLoadingMain";
import { getAllCodeByType } from "@/fetchData/AllCode";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@/components/ui/button";

function JobFilter({ filter, handleFilterChange, handleResetAll }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading
  const [locations, setLocations] = useState([]); // State to store location data

  useEffect(() => {
    // Fetch all location data (PROVINCE)
    getAllCodeByType("PROVINCE")
      .then((response) => {
        if (response.data.data) {
          setLocations(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch location data", error);
      });
  }, []);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (value) => {
    setIsSubmitting(true); // Show loading
    setTimeout(() => {
      handleFilterChange({ locations: value }); // Update the filter
      setIsSubmitting(false); // Hide loading after update
    }, 1000); // Simulate delay (optional)
  };

  const handleRadioChange = (e, name) => {
    const { value } = e.target;
    setIsSubmitting(true); // Show loading
    setTimeout(() => {
      handleFilterChange({ [name]: value }); // Update the filter
      setIsSubmitting(false); // Hide loading after update
    }, 1000); // Simulate delay (optional, replace with real async process if needed)
  };

  const handleResetAllWithLoading = () => {
    setIsSubmitting(true); // Show loading
    setTimeout(() => {
      handleResetAll(); // Reset all filters
      setIsSubmitting(false); // Hide loading
    }, 1000); // Simulate delay (optional)
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 ease-in-out duration-300 transition-all relative">
      {/* Global Loading */}
      <GlobalLoadingMain isSubmiting={isSubmitting} />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <FilterListIcon />
          <span>Job Filter</span>
        </h3>
        <IconButton onClick={toggleFilter} className="text-gray-600">
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-2">
          {/* Job Level Filter */}
          <div className="mb-4">
            <RadioGroup
              label="Experience Level"
              color="primary"
              className="text-primary"
              value={filter.levels || ""} // Single value for radio group
              onChange={(e) => handleRadioChange(e, "levels")} // Specify the name for the filter
            >
              {["Nhân viên", "Trưởng phòng"].map((level, index) => (
                <Radio key={index} value={level} size="sm">
                  {level}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          {/* Type of Work Filter */}
          <div className="mb-4">
            <RadioGroup
              label="Type of Work"
              color="primary"
              className="text-primary"
              value={filter.typeWorks || ""} // Single value for type of work
              onChange={(e) => handleRadioChange(e, "typeWorks")}
            >
              {["Toàn thời gian", "Thực tập", "Remote", "Bán thời gian"].map(
                (typeWork, index) => (
                  <Radio key={index} value={typeWork} size="sm">
                    {typeWork}
                  </Radio>
                )
              )}
            </RadioGroup>
          </div>

          {/* Experience Work Filter */}
          <div className="mb-4">
            <RadioGroup
              label="Experience"
              color="primary"
              className="text-primary"
              value={filter.expJobs || ""} // Single value for experience
              onChange={(e) => handleRadioChange(e, "expJobs")}
            >
              {["1 năm", "2 năm", "3 năm"].map((expJob, index) => (
                <Radio key={index} value={expJob} size="sm">
                  {expJob}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          {/* Salary Work Filter */}
          <div className="mb-4">
            <RadioGroup
              label="Salary"
              color="primary"
              className="text-primary"
              value={filter.salarys || ""} // Single value for experience
              onChange={(e) => handleRadioChange(e, "salarys")}
            >
              {["3 - 5 triệu", "10-15 triệu", "Thoả thuận"].map(
                (salary, index) => (
                  <Radio key={index} value={salary} size="sm">
                    {salary}
                  </Radio>
                )
              )}
            </RadioGroup>
          </div>

          {/* Location Work Filter */}
          <div className="mb-4 mr-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <Select
              id="location"
              value={filter.locations || ""}
              onValueChange={handleSelectChange}
              className="w-32" // Adjust width as needed
            >
              <SelectTrigger className="py-1 px-2 text-sm">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.code} value={location.value}>
                    {location.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleResetAllWithLoading}
          className="bg-secondary text-primary hover:bg-primary hover:text-secondary border-primary items-center gap-1 w-full"
          variant="outline"
        >
          Reset All
        </Button>
      </div>
    </div>
  );
}

export default JobFilter;
