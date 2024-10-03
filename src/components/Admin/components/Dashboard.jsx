import React from "react";
import StatisticsCard from "./StatisticsCard"; // Import component StatisticsCard
import { FaUsers, FaBuilding, FaBriefcase, FaHistory } from "react-icons/fa"; // Các biểu tượng ví dụ
import { Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

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
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, value, footer, color }) => (
          <StatisticsCard
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
          />
        ))}
      </div>
      <p>Bảng thống kê doanh thu</p>
      <div className="border border-blue-gray-100 shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">STT</TableHead>
              <TableHead>Tên gói</TableHead>
              <TableHead>Mã gói</TableHead>
              <TableHead>Loại gói</TableHead>
              <TableHead>Số lượng đã bán</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
