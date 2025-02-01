import { formatEarnings } from "@/lib/format-earnings";
import React from "react";
import StatusBadge from "./statusbadge";
import CategoryBadge from "./categorybadge";
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
  { month: "January", revenue: 126 },
  { month: "February", revenue: 235 },
  { month: "March", revenue: 187 },
  { month: "April", revenue: 143 },
  { month: "May", revenue: 179 },
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

const StartupPreviewRender = ({
  startup,
  theme,
}: {
  startup: any;
  theme?: any;
}) => {
  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: theme ? hexToRgba(theme.primary_text, 0.6) : hexToRgba("#ededed", 0.6),
    },
  } satisfies ChartConfig;
  return (
    <div key={startup.id} className="relative">
      <div className="absolute top-5 right-2 flex items-center">
        <div className="text-primary-text flex items-center justify-between">
          <div className="flex items-center justify-center">
            {startup.status === "discontinued" ? (
              <span className="text-[0.6rem] bg-red-200 font-bold pl-1 rounded-l-full">
                🚫
              </span>
            ) : (
              <span className="text-[0.5rem] bg-violet-500 font-bold pl-1.5 pr-1 rounded-l-full">
                ₹
              </span>
            )}
            {startup.status === "discontinued" ? (
              <span className="text-[0.55rem] text-red-700 bg-red-200 rounded-r-lg pr-1 p-[0.055rem]">
                discontinued
              </span>
            ) : (
              <span className="text-[0.5rem] bg-primary-text text-black rounded-r-lg pl-0.5 pr-0.5 ">
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
        className="w-60 rounded-md mt-2 p-4 border-[0.5px]"
      >
        <div className="flex items-center">
          <div
            style={{
              borderColor: theme ? theme.strongerborder : "#4d4d4d",
            }}
            className="w-[2.4rem] h-[2.4rem] p-0.5 rounded-full border border-dashed mr-2"
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
              <p className="hover:underline font-semibold text-sm -mb-1.5">
                {startup.name}
              </p>
            </a>
            {startup.show_status && startup.status !== "discontinued" && (
              <StatusBadge startup={startup} size={"sm"} theme={theme} />
            )}
            <CategoryBadge object={startup} size={"sm"} theme={theme} />
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
              className="mt-2 text-mx markdown_content"
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

export default StartupPreviewRender;
