import React from "react";

// Define the statusInfo array
const statusInfo = [
  {
    status: "active",
    text: "Active",
    icon: "✅",
    color: "bg-green-100/80 text-green-800",
  },
  {
    status: "discontinued",
    text: "Discontinued",
    icon: "❌",
    color: "bg-red-100/80 text-red-800",
  },
  {
    status: "pending",
    text: "Pending",
    icon: "⏳",
    color: "bg-yellow-100/80 text-yellow-800",
  },
  {
    status: "break",
    text: "On Hold",
    icon: "⏸️",
    color: "bg-blue-100/80 text-blue-800",
  },
  {
    status: "building",
    text: "Building",
    icon: "🏗️",
    color: "bg-gray-100/80 text-gray-800",
  },
  {
    status: "for-sale",
    text: "For Sale",
    icon: "🤝",
    color: "bg-purple-100/80 text-purple-800",
  },
  {
    status: "acquired",
    text: "Acquired",
    icon: "💰",
    color: "bg-indigo-200/80 text-indigo-800",
  },
  // Add more statuses as needed
];

const StatusBadge = ({
  startup,
  size,
  theme,
}: {
  startup: any;
  size: string;
  theme?: any;
}) => {
  // Find the corresponding status info object
  const statusInfoItem = statusInfo.find(
    (item) => item.status === startup.status
  );

  if (statusInfoItem) {
    const { text, icon, color } = statusInfoItem;
    return (
      <span
        style={{
          borderColor: theme ? theme.strongerborder : "#4d4d4d",
        }}
        className={`inline-flex items-center ${
          size === "sm"
            ? "text-[0.4rem] lg:text-[0.5rem] mr-1"
            : "text-[0.5rem] lg:text-[0.7rem]"
        }  px-0.5 py-[0.0625rem] rounded border ${color}`}
      >
        {icon} {text}
      </span>
    );
  } else {
    return null; // Handle unknown status
  }
};

export default StatusBadge;
