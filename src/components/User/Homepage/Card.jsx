import { Badge } from "@/components/ui/badge";

function Card() {
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
  return (
    <div className="grid grid-cols-3 gap-4 mx-20 py-10">
      {data.map((card, index) => (
        <div
          key={index}
          className="flex bg-white border-2 border-gray-200 rounded-lg h-28 w-full gap-4 cursor-pointer  hover:text-primary hover:border hover:border-2 hover:border-primary"
        >
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
        </div>
      ))}
    </div>
  );
}

export default Card;
