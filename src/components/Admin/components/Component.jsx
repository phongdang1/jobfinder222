"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, vip: 100 },
  { month: "February", desktop: 305, mobile: 200, vip: 200 },
  { month: "March", desktop: 237, mobile: 120, vip: 50 },
  { month: "April", desktop: 73, mobile: 190, vip: 120 },
  { month: "May", desktop: 209, mobile: 130, vip: 150 },
  { month: "June", desktop: 214, mobile: 140, vip: 80 },
];

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#9181F4",
  },
  mobile: {
    label: "Mobile",
    color: "#a79af6",
  },
  vip: {
    label: "Vip",
    color: "#a79af3",
  },
};

export function Component() {
  return (
    <div className="h-[24.2rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          <Bar dataKey="vip" fill="var(--color-vip)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
