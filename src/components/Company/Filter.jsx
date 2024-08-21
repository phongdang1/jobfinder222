import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Filter() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <FilterListIcon />
                    <span>Filter</span>
                </h3>
                <IconButton onClick={toggleFilter} className="text-gray-600">
                    {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </div>

            {isOpen && (
                <div>
                    {/* Location Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <div className="flex flex-col mt-2">
                            {['All', 'Near me', 'Within 10km', 'Within 30km', 'Within 50km'].map((location) => (
                                <label key={location} className="inline-flex items-center mt-2">
                                    <input type="checkbox" name="location" value={location} className="form-checkbox h-5 w-5 rounded border-gray-300" />
                                    <span className="ml-2">{location}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Status Recruiting Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <div className="flex flex-col mt-2">
                            {['All', 'Not recruiting', 'Still recruiting'].map((status) => (
                                <label key={status} className="inline-flex items-center mt-2">
                                    <input type="checkbox" name="status" value={status} className="form-checkbox h-5 w-5 rounded border-gray-300" />
                                    <span className="ml-2">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Categories Filter */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Categories</label>
                        <div className="flex flex-col mt-2">
                            {['All', 'Technology', 'E-commerce', 'Banking and Finance', 'Tourism and Hospitality'].map((category) => (
                                <label key={category} className="inline-flex items-center mt-2">
                                    <input type="checkbox" name="category" value={category} className="form-checkbox h-5 w-5 rounded border-gray-300" />
                                    <span className="ml-2">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filter;