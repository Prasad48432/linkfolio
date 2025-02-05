import { formatEarnings } from "@/lib/format-earnings";
import React from "react";
import StatusBadge from "@/app/dashboard/contents/components/statusbadge";
import CategoryBadge from "@/app/dashboard/contents/components/categorybadge";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", revenue: 26 },
  { month: "February", revenue: 235 },
  { month: "March", revenue: 124 },
  { month: "April", revenue: 156 },
  { month: "May", revenue: 190 },
  { month: "June", revenue: 184 },
];

const hexToRgba = (hex: string, opacity: number) => {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Extract RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const StartupRenderCard = ({
  startup,
  theme,
}: {
  startup: any;
  theme?: any;
}) => {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: theme
        ? hexToRgba(theme.primary_text, 0.6)
        : hexToRgba("#ededed", 0.6),
    },
  } satisfies ChartConfig;
  return (
    <div key={startup.id} className="relative col-span-2 lg:col-span-1">
      <div className="absolute top-5 right-2 flex items-center">
        <div className="text-primary-text flex items-center justify-between">
          <div className="flex items-center justify-center">
            {startup.status === "discontinued" ? (
              <span className="text-mx bg-red-200 font-bold pl-1 rounded-l-full">
                🚫
              </span>
            ) : (
              <span
                style={{
                  background: theme ? theme.primary_bg : "#262626",
                  color: theme ? theme.primary_text : "#ededed",
                  borderColor: theme ? hexToRgba(theme.border,0.5) : "#4d4d4d",
                }}
                className="text-mx font-bold pl-1.5 pr-1 py-0.5 rounded-l-full border-r"
              >
                ₹
              </span>
            )}
            {startup.status === "discontinued" ? (
              <span className="text-mx text-red-700 bg-red-200 rounded-r-lg pr-1 p-[0.055rem]">
                discontinued
              </span>
            ) : (
              <span
                style={{
                  background: theme ? theme.primary_bg : "#262626",
                  color: theme ? theme.primary_text : "#ededed",
                }}
                className="text-mx rounded-r-lg pl-1 pr-1 py-0.5"
              >
                {formatEarnings(startup.estimated_revenue)}/m
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          background: theme ? theme.secondary_bg : "#262626",
          borderColor: theme ? theme.strongerborder : "#4d4d4d",
        }}
        className={`w-full rounded-md mt-2 p-4 border ${
          startup.status === "discontinued" ? "h-[6rem]" : "h-[12rem]"
        }`}
      >
        <div className="flex items-center">
          <div
            style={{
              borderColor: theme ? theme.strongerborder : "#4d4d4d",
            }}
            className="w-[3.5rem] h-[3.5rem] p-1 rounded-full border lg:border-2 border-dashed mr-2"
          >
            <Image
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.website}`}
              title={startup.name}
              alt={startup.name}
              width={600}
              height={600}
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="">
            <a
              style={{
                color: theme ? theme.primary_text : "#ededed",
              }}
              target="_blank"
              href={`${startup.website}`}
            >
              <p className="hover:underline font-semibold text-base">
                {startup.name}
              </p>
            </a>
            {startup.show_status && startup.status !== "discontinued" && (
              <StatusBadge startup={startup} size={"lg"} theme={theme} />
            )}
            <CategoryBadge object={startup} size={"lg"} theme={theme} />
          </div>
        </div>
        {startup.status !== "discontinued" &&
          startup.show_toggle !== "none" && (
            <hr
              style={{
                borderColor: theme ? theme.strongerborder : "#4d4d4d",
              }}
              className="border-t  my-2 w-full"
            />
          )}
        {startup.status !== "discontinued" &&
          startup.show_toggle !== "none" && (
            <span
              style={{
                color: theme ? theme.primary_text : "#ededed",
              }}
              className="mt-2 text-xs lg:text-sm markdown_content"
            >
              {startup.status !== "discontinued" &&
                startup.show_toggle !== "none" && (
                  <>
                    {startup.show_toggle === "revenue" ? (
                      <ChartContainer
                        config={chartConfig}
                        className="h-20 w-full"
                      >
                        <AreaChart
                          accessibilityLayer
                          data={chartData}
                          margin={{
                            left: 12,
                            right: 12,
                          }}
                        >
                          <CartesianGrid vertical={false} horizontal={false} />

                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                          />
                          <defs>
                            <linearGradient
                              id="fillRevenue"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="var(--color-revenue)"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="var(--color-revenue)"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            dataKey="revenue"
                            type="natural"
                            fill="url(#fillRevenue)"
                            fillOpacity={0.4}
                            stroke="var(--color-revenue)"
                            stackId="a"
                          />
                        </AreaChart>
                      </ChartContainer>
                    ) : (
                      <ReactMarkdown>{startup.description}</ReactMarkdown>
                    )}
                  </>
                )}
            </span>
          )}
      </div>
    </div>
  );
};

export default StartupRenderCard;
