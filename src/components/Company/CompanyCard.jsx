import React from 'react';

const CompanyCard = ({ company }) => (
  <div key={company.id} className="bg-white shadow-md rounded-lg overflow-hidden flex border border-gray-200">
    <div className="w-32 h-32 flex items-center justify-center p-4"> {/* Điều chỉnh padding tại đây */}
      <img
        src={company.image}
        alt={company.name}
        className="mr-3 object-cover rounded-lg"
      />
    </div>
    <div className="p-6 flex flex-col justify-between flex-1">
      <div>
        <p className="text-sm text-gray-600">Currently recruiting {company.positions} positions</p>
        <h3 className="text-xl font-bold text-gray-900 mt-2">{company.name}</h3>
        <p className="text-sm text-gray-600 mt-1">Head office: {company.location}</p>
        <p className="mt-4 text-xs text-gray-600">{company.description}</p>
      </div>
    </div>
  </div>
);

export default CompanyCard;