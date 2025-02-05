import React from "react";

// Define the statusInfo array
const categoryInfo = [
  {
    status: "artificial-intelligence",
    text: "Artificial Intelligence",
    icon: "🤖",
    color: "bg-green-100/80 text-green-800",
  },
  {
    status: "productivity",
    text: "Productivity",
    icon: "✍️",
    color: "bg-blue-100/80 text-blue-800",
  },
  {
    status: "education",
    text: "Education",
    icon: "📚",
    color: "bg-orange-100/80 text-orange-800",
  },
  {
    status: "no-code",
    text: "No Code",
    icon: "🐲",
    color: "bg-pink-100/80 text-pink-800",
  },
  {
    status: "social-media",
    text: "Social Media",
    icon: "💬",
    color: "bg-purple-100/80 text-purple-800",
  },
  {
    status: "e-commerce",
    text: "E-Commerce",
    icon: "🛍️",
    color: "bg-teal-100/80 text-teal-800",
  },
  {
    status: "analytics",
    text: "Analytics",
    icon: "📈",
    color: "bg-yellow-100/80 text-yellow-800",
  },
  {
    status: "web3",
    text: "Web 3",
    icon: "🦇",
    color: "bg-indigo-100/80 text-indigo-800",
  },
  {
    status: "design-tools",
    text: "Design Tools",
    icon: "👓",
    color: "bg-red-100/80 text-red-800",
  },
  {
    status: "developer-tools",
    text: "Developer Tools",
    icon: "🧑‍💻",
    color: "bg-gray-100/80 text-gray-800",
  },
  {
    status: "marketing",
    text: "Marketing",
    icon: "📊",
    color: "bg-lime-100/80 text-lime-800",
  },
  {
    status: "finance",
    text: "Finance",
    icon: "💰",
    color: "bg-green-100/80 text-green-800",
  },
  {
    status: "other",
    text: "Others",
    icon: "🔮",
    color: "bg-cyan-100/80 text-cyan-800",
  },
  // Add more statuses as needed
];

const CategoryBadge = ({
  object,
  size,
  theme,
}: {
  object: any;
  size: string;
  theme?: any;
}) => {
  // Find the corresponding status info object
  const statusInfoItem = categoryInfo.find(
    (item) => item.status === object.category
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
            ? "text-[0.4rem] lg:text-[0.5rem]"
            : "text-[0.6rem] lg:text-[0.7rem]"
        } px-0.5 py-[0.0625rem] rounded border ${color}`}
      >
        {icon} {text}
      </span>
    );
  } else {
    return null; // Handle unknown status
  }
};

export default CategoryBadge;
