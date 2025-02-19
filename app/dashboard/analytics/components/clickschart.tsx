"use client";
import React, { useState } from "react";
import {
  CartesianGrid,
  XAxis,
  Bar,
  BarChart,
  YAxis,
} from "recharts";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const mapConfig = {
  startups: {
    label: "Startups",
    color: "hsl(var(--chart-1))",
  },
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-1))",
  },
  links: {
    label: "Links",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const clicksConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ClicksChart = ({
  fetchLoading,
  clicks,
}: {
  fetchLoading: boolean;
  clicks: {
    startups: {
      name: string;
      clicks: number;
    }[];
    projects: {
      name: string;
      clicks: number;
    }[];
    links: {
      name: string;
      clicks: number;
    }[];
  };
}) => {
  const [activeChart, setActiveChart] = useState<
    "startups" | "projects" | "links"
  >("startups");

  const total = {
    startups: clicks.startups.reduce((acc, curr) => acc + curr.clicks, 0),
    projects: clicks.projects.reduce((acc, curr) => acc + curr.clicks, 0),
    links: clicks.links.reduce((acc, curr) => acc + curr.clicks, 0),
  };
  return (
    <Card className="col-span-8 lg:col-span-4 rounded-lg">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-4 lg:mb-0">
        <div className="flex w-full lg:w-[45%] flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-lg leading-none text-lightprimary-text dark:text-primary-text">
            Visitor Clicks
          </CardTitle>
          <CardDescription className="text-lightprimary-text/60 dark:text-primary-text/60">
            Showing total clicks of visitors
          </CardDescription>
        </div>
        {fetchLoading ? (
          <div className="w-full lg:w-[55%] flex">
            <div className="relative w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
              </div>
            </div>
            <div className="relative w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
              </div>
            </div>
            <div className="relative w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full lg:w-[55%]">
            {["startups", "projects", "links"].map((key) => {
              const chart = key as keyof typeof mapConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l data-[active=true]:bg-[#c1aa89] dark:data-[active=true]:bg-secondary-selection border-l border-t lg:border-t-0 sm:px-8 sm:py-6 dark:data-[active=true]:border-secondary-strongerborder lg:last:rounded-tr-lg"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {mapConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </CardHeader>
      <div className="px-2 py-4">
        {fetchLoading ? (
          <div className="w-full h-[250px] flex items-end gap-4 justify-center">
            {[150, 110, 170, 120, 150].map((height, index) => (
              <div
                key={index}
                style={{
                  height: `${height}px`,
                }}
                className="w-[40px] lg:w-[80px] bg-secondary-bg rounded-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <ChartContainer
            config={clicksConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={clicks[activeChart]}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                fontSize={10}
              />
              <YAxis
                dataKey="clicks"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                fontSize={10}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent className="w-[150px]" nameKey="name" />
                }
              />
              <Bar dataKey="clicks" fill={`var(--color-clicks)`} radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </Card>
  );
};

export default ClicksChart;
