import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  getRevenueViewByMonth,
  getRevenuePostByMonth,
  getRevenueVipByMonth,
} from "../../../fetchData/Package";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  view: {
    label: "View",
    color: "#9181F4",
  },
  post: {
    label: "Post",
    color: "#a79af6",
  },
  vip: {
    label: "Vip",
    color: "#a79af3",
  },
};

export function Component() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Get the current date
    const today = new Date();

    // Set endDate to today's date in YYYY-MM-DD format
    const end = today.toISOString().split("T")[0];
    setEndDate(end);

    // Calculate the startDate, 10 days before the endDate
    const start = new Date(today);
    start.setDate(today.getDate() - 10); // subtract 10 days

    // Ensure start date is correctly adjusted (month will auto-handle if crossing into previous month)
    const startDateFormatted = start.toISOString().split("T")[0];
    setStartDate(startDateFormatted);
  }, []);

  // Handle date selection
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  useEffect(() => {
    if (startDate && endDate) {
      // Fetch revenue data for View, Post, and VIP within the selected date range
      getRevenueViewByMonth(startDate, endDate).then((response) => {
        const viewData = response.data.data || 0;
        console.log("viewData", viewData.data);
        getRevenuePostByMonth(startDate, endDate).then((response) => {
          const postData = response.data.data || 0;
          getRevenueVipByMonth(startDate, endDate).then((response) => {
            const vipData = response.data.data || 0;

            // Create chart data for the selected month (assuming month is the same for all packages)
            const selectedMonth = new Date(startDate).toLocaleString(
              "default",
              { month: "long", year: "numeric" }
            );

            setChartData([
              {
                month: selectedMonth,
                view: viewData,
                post: postData,
                vip: vipData,
              },
            ]);
          });
        });
      });
    }
  }, [startDate, endDate]);

  return (
    <div className="h-[24.2rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className="mb-4">
        <label htmlFor="startDate" className="mr-2">
          Start Date:
        </label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
          className="border p-2 rounded"
        />
        <label htmlFor="endDate" className="ml-4 mr-2">
          End Date:
        </label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
          className="border p-2 rounded"
        />
      </div>

      <ChartContainer config={chartConfig} className="min-h-[200px]">
        <BarChart
          className="w-[100px]"
          width={100}
          height={250}
          accessibilityLayer
          data={chartData}
        >
          <CartesianGrid vertical={false} />
          {/* <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 20)}
          /> */}
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            barSize={50}
            dataKey="view"
            fill={chartConfig.view.color}
            radius={4}
          />
          <Bar
            barSize={50}
            dataKey="post"
            fill={chartConfig.post.color}
            radius={4}
          />
          <Bar
            barSize={50}
            dataKey="vip"
            fill={chartConfig.vip.color}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
