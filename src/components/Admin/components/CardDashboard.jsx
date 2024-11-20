import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardDashboard = ({
  color = "blue", // Default parameter for color
  icon,
  title,
  value,
  footer = null, // Default parameter for footer
}) => {
  return (
    <div className="relative">
      {/* Icon Header */}
      <div
        className={`absolute grid h-12 w-12 place-items-center bg-gradient-to-tr from-${color}-400 to-${color}-600 rounded-full -translate-y-1/ translate-x-1/4 shadow-md`}
      >
        {icon}
      </div>

      {/* Card */}
      <Card className="shadow-sm border border-blue-gray-100 rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <CardHeader className="pl-16 text-right">
          <CardTitle className="text-2xl font-bold text-blue-gray-900">
            {value}
          </CardTitle>
          <CardDescription className="text-sm font-normal text-blue-gray-600">
            {title}
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

CardDashboard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  footer: PropTypes.node,
};

export default CardDashboard;
