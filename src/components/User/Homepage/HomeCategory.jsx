import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Cate from "../../../assets/Home/cate.png";

function HomeCategory() {
  return (
    <div className="flex flex-col pb-20 mt-10 mx-20 font-poppins">
      <div className="text-5xl font-forum mb-8 font-semibold ml-16">
        Occupation <span className="text-5xl text-primary ">Category</span>
      </div>

      <div className="flex gap-4 px-16 font-poppins " data-aos="fade-right">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="w-full h-64 shadow-xl cursor-pointer hover:outline hover:outline-1 hover:outline-primary hover:bg-secondary"
          >
            <CardHeader>
              <div className="text-left text-lg font-medium text-third">
                Category Name {index + 1}
              </div>
            </CardHeader>

            <CardContent>
              <div
                style={{ backgroundImage: `url(${Cate})` }}
                className="w-46 h-32 mx-auto bg-cover bg-center rounded-lg bg-slate-500 relative -bottom-2"
              ></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomeCategory;
