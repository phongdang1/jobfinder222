import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPosts } from "../../../fetchData/Job";

function JobCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllPosts();
      console.log("abc", result);
      // Kiểm tra nếu kết quả là mảng trước khi gán vào state
      if (Array.isArray(result)) {
        setData(result);
      }
      setLoading(false);
    }

    if (hasScrolled) {
      fetchData();
    }
  }, [hasScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const triggerPosition = document.documentElement.offsetHeight - 50;
      if (scrollPosition >= triggerPosition && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]);

  return (
    <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-10">
      {loading && (!Array.isArray(data) || data.length === 0)
        ? Array(6) // Render 6 skeletons cho đến khi dữ liệu được tải
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex bg-white border-2 border-gray-200 rounded-lg h-28 w-full gap-4"
              >
                <div className="flex items-center space-x-4">
                  <Skeleton className="flex-1/3 h-24 w-24 bg-contain my-auto ml-3 rounded-lg" />
                  <div className="space-y-4 flex-2/3 flex-2 mt-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            ))
        : Array.isArray(data) &&
          data.map((card, index) => (
            <div
              key={index}
              className="flex bg-white border-2 border-gray-200 rounded-lg h-28 w-full gap-4 cursor-pointer hover:text-primary hover:border-primary "
            >
              <div className="flex gap-8 shadow-lg w-full">
                <div
                  className="w-24 h-24 bg-contain my-auto ml-3 rounded-lg"
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="max-w-screen-xl mt-4">
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
            </div>
          ))}
    </div>
  );
}

export default JobCard;
