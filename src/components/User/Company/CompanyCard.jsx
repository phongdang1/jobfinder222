import { FmdGoodOutlined } from '@mui/icons-material';

const CompanyCard = ({ company }) => (
  <div key={company.id} className="bg-white shadow-md rounded-lg p-5 pr-3 flex space-x-4 border border-gray-200">
    <div className="w-16 h-16 flex items-center justify-center p-4">
      <img
        src={company.image}
        alt={company.name}
        className="object-cover rounded-lg w-full h-full"
      />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-700 mb-1">Currently recruiting {company.positions} positions</p>
      <div className='flex gap-2'>
        <h3 className="text-lg font-semibold text-gray-900 mt-1">{company.name}</h3>

        <span
          className={`px-4 py-1  flex justify-center items-center text-xs font-semibold rounded-full ${
            company.status === 'Hiring'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {company.status}
        </span>
      </div>
      
      <div className="flex items-center mt-2">
        <FmdGoodOutlined className="text-gray-600 mr-1" fontSize="small" />
        <p className="text-sm text-gray-700">Head Office: {company.location}</p>
      </div>
      
      <p className="text-sm text-gray-700 mt-2">{company.description}</p>
    </div>
  </div>
);

export default CompanyCard;
