import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Cate from "../../../assets/Home/cate.png";

function HomeCategory() {
  return (
    <div className="flex flex-col pb-20 mt-10 mx-4 sm:mx-6 md:mx-10 lg:mx-20 font-poppins">
      <div className="text-4xl md:text-5xl font-forum mb-8 font-semibold text-center ">
        Occupation <span className="text-primary">Category</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-2 md:mx-6 lg:mx-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="w-full h-64 shadow-xl cursor-pointer hover:outline hover:outline-1 hover:outline-primary hover:bg-secondary rounded-lg flex flex-col items-center"
          >
            <CardContent className="flex flex-col items-center justify-center mt-6 text-center absolute">
              <div className="text-lg font-medium text-third ">
                Category Name {index + 1}
              </div>

              <div
                style={{ backgroundImage: `url(${Cate})` }}
                className="w-full h-32 bg-cover bg-center rounded-lg relative top-16 bg-slate-500"
              ></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomeCategory;
