import React from "react";
import CardDashboard from "./CardDashboard"; // Import component StatisticsCard
import { FaUsers, FaBuilding, FaBriefcase, FaHistory } from "react-icons/fa"; // Các biểu tượng ví dụ
import { Typography } from "@mui/material";

import Chart from "./Chart";
import { Component } from "./Component";
import { LineChartLabel } from "./LineChart";
import { TableDemo } from "./Table";
// import { Component } from "./Component";

const statisticsCardsData = [
  {
    icon: FaUsers,
    title: "Công nghệ thông tin",
    value: "12 bài",
    footer: {
      value: "12%",
      label: "increase since last month",
      color: "text-green-500",
    },
    color: "blue",
  },
  {
    icon: FaBuilding,
    title: "Bất động sản",
    value: "5 bài",
    footer: {
      value: "5%",
      label: "decrease since last month",
      color: "text-red-500",
    },
    color: "green",
  },
  {
    icon: FaBriefcase,
    title: "Kinh tế",
    value: "4 bài",
    footer: {
      value: "8%",
      label: "increase since last week",
      color: "text-orange-500",
    },
    color: "orange",
  },
  {
    icon: FaHistory,
    title: "Lĩnh vực khác",
    value: "5 bài",
    footer: { value: "Stable", label: "performance", color: "text-purple-500" },
    color: "purple",
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, value, footer, color }) => (
          <CardDashboard
            key={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6",
            })}
            title={title}
            value={value}
            footer={
              <Typography className={`font-normal ${footer.color}`}>
                <strong>{footer.value}</strong> &nbsp;{footer.label}
              </Typography>
            }
            color={color}
            fill={color}
          />
        ))}
      </div>
      <div className="text-xl font-bold pl-1">
        <p>Bảng thống kê doanh thu</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 w-full">
          <Component />
          <Chart />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <TableDemo />

          <LineChartLabel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
