import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function JobCard() {
  const data = [
    {
      occupation: "Design Manager",
      companyName: "FPT Software Da Nang",
      wage: "500$",
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FPT.png",
      location: "Da Nang",
      time: "Part time",
    },
    {
      occupation: "Design Manager",
      companyName: "FPT Software Da Nang",
      wage: "500$",
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FPT.png",
      location: "Da Nang",
      time: "Part time",
    },
    {
      occupation: "Design Manager",
      companyName: "FPT Software Da Nang",
      wage: "500$",
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FPT.png",
      location: "Da Nang",
      time: "Part time",
    },
    {
      occupation: "Design Manager",
      companyName: "FPT Software Da Nang",
      wage: "500$",
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FPT.png",
      location: "Da Nang",
      time: "Part time",
    },
    {
      occupation: "Design Manager",
      companyName: "FPT Software Da Nang",
      wage: "500$",
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FPT.png",
      location: "Da Nang",
      time: "Part time",
    },
    {
      occupation: "Design Manager",
      companyName: "FPT Software Da Nang",
      wage: "500$",
      image: "https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-FPT.png",
      location: "Da Nang",
      time: "Part time",
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <div className="grid grid-cols-3 gap-4 mx-20 py-10">
      {data.map((card, index) => (
        <div
          key={index}
          className="flex bg-white border-2 border-gray-200 rounded-lg h-28 w-full gap-4 cursor-pointer  hover:text-primary hover:border hover:border-2 hover:border-primary"
        >
          {loading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="flex-1/3 h-24 w-24 bg-contain my-auto ml-3 rounded-lg" />
              <div className="space-y-4 flex-2/3 flex-2 mt-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <>
              <div
                className="flex-1/3 h-24 w-24 bg-contain my-auto ml-3 rounded-lg  "
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="flex-2/3 flex-2 mt-4">
                <div className="block">
                  <div className="font-poppins text-base font-medium ">
                    {card.occupation}
                  </div>
                  <div className="font-poppins text-sm text-third font-normal mt-1">
                    {card.companyName}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="bg-secondary">
                    {card.wage}
                  </Badge>
                  <Badge variant="outline" className="bg-secondary">
                    {card.location}
                  </Badge>
                  <Badge variant="outline" className="bg-secondary">
                    {card.time}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default JobCard;
