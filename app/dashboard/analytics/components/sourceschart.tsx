"use client";
import React from "react";
import { CartesianGrid, XAxis, Bar, BarChart, YAxis } from "recharts";
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

const sourcesData = [
  { browser: "facebook", visitors: 275, fill: "var(--color-facebook)" },
  { browser: "twitter_x", visitors: 200, fill: "var(--color-twitter_x)" },
  { browser: "instagram", visitors: 187, fill: "var(--color-instagram)" },
  { browser: "linkedin", visitors: 173, fill: "var(--color-linkedin)" },
  { browser: "whatsapp", visitors: 120, fill: "var(--color-whatsapp)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const sourcesConfig = {
  visitors: {
    label: "Visitors",
  },
  facebook: {
    label: "Facebook",
    color: "hsl(var(--chart-1))",
  },
  twitter_x: {
    label: "Twitter(x)",
    color: "hsl(var(--chart-2))",
  },
  instagram: {
    label: "Instagram",
    color: "hsl(var(--chart-3))",
  },
  linkedin: {
    label: "Linkedin",
    color: "hsl(var(--chart-4))",
  },
  whatsapp: {
    label: "WhatsApp",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const SourcesChart = ({ fetchLoading }: { fetchLoading: boolean }) => {
  return (
    <Card className="col-span-8 lg:col-span-4 rounded-lg">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-4 lg:mb-0">
        <div className="flex w-full items-center justify-between">
          <div className="w-1/2 relative flex flex-col items-start justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-secondary-selection border-l-0 sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
            <CardTitle className="text-lg leading-none text-primary-text">
              Vistor Sources
            </CardTitle>
            <CardDescription className="text-primary-text/60">
              Sources of vistors of page
            </CardDescription>
          </div>
          {fetchLoading ? (
            <div className="w-1/2 flex">
              <div className="relative w-1/2 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
              <div className="relative w-1/2 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-1/2 flex items-center justify-end">
              <div className="w-1/2 relative  flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                <span className="text-xs text-muted-foreground">
                  Total Visitors
                </span>
                <span className="text-lg font-bold leading-none sm:text-xl">
                  34.5k
                </span>
              </div>
              <div className="w-1/2 relative  flex flex-col items-center justify-center gap-2 border-t px-6 py-4 text-left data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                <span className="text-xs text-muted-foreground">Organic</span>
                <span className="text-lg font-bold leading-none sm:text-xl">
                  4.5k
                </span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <div className="px-2 py-4">
        {fetchLoading ? (
          <div className="w-full h-[250px] flex items-end gap-4 justify-center">
            {[170, 130, 120, 180, 150].map((height, index) => (
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
            config={sourcesConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={sourcesData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="browser"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                fontSize={10}
              />
              <YAxis
                dataKey="visitors"
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
              <Bar
                dataKey="visitors"
                fill={`var(--color-visitors)`}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        )}
      </div>
    </Card>
  );
};

export default SourcesChart;
