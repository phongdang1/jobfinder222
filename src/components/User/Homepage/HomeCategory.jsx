import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

function HomeCategory() {
  return (
    <div className="flex flex-col pb-20 mt-10 ml-20">
      <div className="text-5xl font-forum mb-8 font-semibold ml-16">
        Occupation <span className="text-5xl text-primary ">Category</span>
      </div>

      <div className="grid grid-cols-4 gap-4 px-16 font-poppins">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            className="w-72 h-60 shadow-xl cursor-pointer hover:outline hover:outline-1 hover:outline-primary group"
          >
            <CardHeader>
              <WorkOutlineIcon
                className="mx-auto mt-4 group-hover:bg-slate-100 group-hover:rounded-lg"
                sx={{ fontSize: 90 }}
              />
            </CardHeader>
            <CardContent>
              <div className="text-center -mt-2 font-medium">
                Category Name {index + 1}
              </div>
            </CardContent>
            <CardContent>
              <div className="text-center -mt-4 text-sm text-primary">
                100 jobs
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default HomeCategory;
