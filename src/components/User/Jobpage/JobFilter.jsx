import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function JobFilter({ filter, handleFilterChange, handleResetAll }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    handleFilterChange({
      [name]: checked
        ? [...(filter[name] || []), value]
        : (filter[name] || []).filter((item) => item !== value),
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200 ease-in-out duration-300 transition-all">
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
        <div>
          {/* Job Level Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Experience Level
            </label>
            <div className="flex flex-col mt-2">
              {["Nhân viên", "Trưởng phòng"].map((level) => (
                <label key={level} className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="levels"
                    value={level}
                    checked={(filter.levels || []).includes(level)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 rounded border-gray-300"
                  />
                  <span className="ml-2">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type of Work Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Type of Work
            </label>
            <div className="flex flex-col mt-2">
              {["Toàn thời gian", "Remote"].map((typeWork) => (
                <label key={typeWork} className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="typeWorks"
                    value={typeWork}
                    checked={(filter.typeWorks || []).includes(typeWork)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 rounded border-gray-300"
                  />
                  <span className="ml-2">{typeWork}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Work Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <div className="flex flex-col mt-2">
              {["1 năm", "2 năm", "3 năm"].map((expJob) => (
                <label key={expJob} className="inline-flex items-center mt-2">
                  <input
                    type="checkbox"
                    name="expJobs"
                    value={expJob}
                    checked={(filter.expJobs || []).includes(expJob)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 rounded border-gray-300"
                  />
                  <span className="ml-2">{expJob}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleResetAll}
          className="mt-4 px-4 py-2 bg-gray-300 text-white rounded"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}

export default JobFilter;
