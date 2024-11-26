import { TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllPost } from "../../../fetchData/Post";
import { getAllCodeByType } from "../../../fetchData/AllCode";
import { useEffect, useState } from "react";

// Move chartConfig outside the component and export it if needed
export const chartConfig = {
  posts: {
    label: "Posts",
  },
  it: {
    label: "Technology",
    color: "hsl(var(--chart-1))",
  },
  business: {
    label: "Business",
    color: "hsl(var(--chart-2))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-3))",
  },
  estate: {
    label: "Real Estate",
    color: "hsl(var(--chart-4))",
  },
  hr: {
    label: "HR",
    color: "hsl(var(--chart-5))",
  },
  law: {
    label: "Law",
    color: "#4B0082",
  },
  media: {
    label: "Media",
    color: "#00B8D4",
  },
  other: {
    label: "Other",
    color: "#9181F4",
  },
};

function Chart() {
  const [jobTypeData, setJobTypeData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [jobTypeCount, setJobTypeCount] = useState({
    congNgheThongTin: 0,
    kinhTe: 0,
    giaoVien: 0,
    batDongSan: 0,
    quanLyNhanSu: 0,
    luat: 0,
    truyenThong: 0,
    other: 0,
  });

  useEffect(() => {
    // Fetch job types and posts
    const fetchData = async () => {
      try {
        const [jobTypeResponse, postResponse] = await Promise.all([
          getAllCodeByType("JOBTYPE"),
          getAllPost(),
        ]);

        if (jobTypeResponse.data.errCode === 0) {
          setJobTypeData(jobTypeResponse.data.data);
          console.log("jobtype", jobTypeResponse);
        }
        if (postResponse.data.errCode === 0) {
          setPostData(postResponse.data.data);
          console.log("post data", postResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updatedJobTypeCount = { ...jobTypeCount };

    postData.forEach((post) => {
      const jobType = post?.postDetailData?.jobTypePostData?.code;
      if (jobType && updatedJobTypeCount[jobType] !== undefined) {
        updatedJobTypeCount[jobType] = (updatedJobTypeCount[jobType] || 0) + 1;
      } else {
        updatedJobTypeCount.other = (updatedJobTypeCount.other || 0) + 1;
      }
    });

    setJobTypeCount(updatedJobTypeCount);
  }, [postData]);

  const chartData = [
    {
      category: "Technology",
      posts: jobTypeCount.congNgheThongTin,
      fill: "var(--color-it)",
    },
    {
      category: "Business",
      posts: jobTypeCount.kinhTe,
      fill: "var(--color-business)",
    },
    {
      category: "Education",
      posts: jobTypeCount.giaoVien,
      fill: "var(--color-education)",
    },
    {
      category: "Real Estate",
      posts: jobTypeCount.batDongSan,
      fill: "var(--color-estate)",
    },
    {
      category: "HR",
      posts: jobTypeCount.quanLyNhanSu,
      fill: "var(--color-hr)",
    },
    {
      category: "Law",
      posts: jobTypeCount.luat,
      fill: "var(--color-law)",
    },
    {
      category: "Media",
      posts: jobTypeCount.truyenThong,
      fill: "var(--color-media)",
    },
    {
      category: "Other",
      posts: jobTypeCount.other,
      fill: "#9181F4",
    },
  ];

  // Calculate total posts
  const totalPosts = postData.length;

  const currentDate = format(new Date(), "MMMM dd, yyyy");

  return (
    <div>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>{currentDate}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="posts"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalPosts.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Posts
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            <strong>Total Posts</strong>
          </div>
          <div className="leading-none text-muted-foreground">
            {totalPosts.toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Chart;
