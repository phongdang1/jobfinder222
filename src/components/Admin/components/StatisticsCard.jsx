import React from "react";
import PropTypes from "prop-types";

const StatisticsCard = ({ color, icon, title, value, footer }) => {
  return (
    <div className="border border-blue-gray-100 shadow-sm rounded-lg overflow-hidden bg-white">
      {/* Icon header */}
      <div
        className={`absolute grid h-12 w-12 place-items-center bg-gradient-to-tr from-${color}-400 to-${color}-600 rounded-full -translate-y-1/ translate-x-1/4 shadow-md`}
      >
        {icon}
      </div>

      {/* Body */}
      <div className="p-4 pl-16 text-right">
        <p className="text-sm font-normal text-blue-gray-600">{title}</p>
        <h4 className="text-2xl font-bold text-blue-gray-900">{value}</h4>
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-blue-gray-50 p-4">
          <p className="text-sm text-blue-gray-600">{footer}</p>
        </div>
      )}
    </div>
  );
};

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
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

export default StatisticsCard;
