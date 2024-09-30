import React from "react";

const companies = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
  },
  {
    name: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  }
];

const FeaturedCompanies = () => {
  return (
    <div className="mx-20 p-4">
      <div className="text-4xl md:text-5xl font-forum mb-8 font-semibold text-start">Featured 
        <span className="text-primary"> Companies</span></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center transition duration-300 hover:border-primary"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-lg font-semibold">{company.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCompanies;
