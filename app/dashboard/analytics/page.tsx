"use client";
import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  XAxis,
  Bar,
  BarChart,
  Label,
  Pie,
  PieChart,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { createClient } from "@/utils/supabase/client";
import { Loader, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

function genRandom(base: number) {
  return Math.round(Math.random() * base);
}

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

const Component = () => {
  const supabase = createClient();
  const [activeChart, setActiveChart] = useState<
    "startups" | "projects" | "links"
  >("startups");
  const [fetchLoading, setFetchLoading] = useState(true);
  const [clicks, setClicks] = useState<{
    startups: { name: string; clicks: number }[];
    projects: { name: string; clicks: number }[];
    links: { name: string; clicks: number }[];
  }>({
    startups: [],
    projects: [],
    links: [],
  });

  const total = {
    startups: clicks.startups.reduce((acc, curr) => acc + curr.clicks, 0),
    projects: clicks.projects.reduce((acc, curr) => acc + curr.clicks, 0),
    links: clicks.links.reduce((acc, curr) => acc + curr.clicks, 0),
  };

  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];

  const chartData3 = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];
  const chartConfig3 = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  const chartConfig2 = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;
        if (!userId) return;

        // Fetch data from all three tables in parallel
        const [{ data: startups }, { data: projects }, { data: links }] =
          await Promise.all([
            supabase
              .from("startups")
              .select("name, clicks")
              .eq("user_id", userId),
            supabase
              .from("projects")
              .select("name, clicks")
              .eq("user_id", userId),
            supabase
              .from("links")
              .select("title, clicks")
              .eq("user_id", userId),
          ]);

        setClicks({
          startups: startups || [],
          projects: projects || [],
          links:
            links?.map(({ title, clicks }) => ({ name: title, clicks })) || [],
        });

        setFetchLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchLoading(false);
      }
    };

    fetchClicks();
  }, []);

  return (
    <div className="grid grid-cols-8 gap-4 p-4">
      <Card className="col-span-8 lg:col-span-4 rounded-lg">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-4 lg:mb-0">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle className="text-lg leading-none text-primary-text">
              Visitor Clicks
            </CardTitle>
            <CardDescription className="text-primary-text/60">
              Showing total clicks of visitors
            </CardDescription>
          </div>
          {fetchLoading ? (
            <>
              <div className="relative z-30 flex flex-1">
                <div className="w-full h-full bg-secondary-bg  relative overflow-hidden rounded-tr-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex">
              {["startups", "projects", "links"].map((key) => {
                const chart = key as keyof typeof mapConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg"
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
        <CardContent className="px-2 sm:p-6">
          {fetchLoading ? (
            <div className="w-full h-[250px] flex items-end gap-4 justify-center">
              {[150, 110, 170, 120, 150].map((height, index) => (
                <div
                  key={index}
                  style={{
                    height: `${height}px`,
                  }}
                  className="w-[80px] bg-secondary-bg rounded-lg relative overflow-hidden" // Animate height up and down
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
              <BarChart
                accessibilityLayer
                data={clicks[activeChart]}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
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
        </CardContent>
      </Card>
      <Card className="col-span-8 lg:col-span-4 rounded-lg">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig2}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-8 lg:col-span-4 rounded-lg">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-4 lg:mb-0">
          <div className="flex w-full items-center justify-between">
            <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
              <span className="text-xs text-muted-foreground">Page Views</span>
              <span className="text-lg font-bold leading-none sm:text-xl">
                345
              </span>
            </div>
            <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
              <span className="text-xs text-muted-foreground">
                Unique Visitors
              </span>
              <span className="text-lg font-bold leading-none sm:text-xl">
                345
              </span>
            </div>
            <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
              <span className="text-xs text-muted-foreground">
                Live Visitors
              </span>
              <span className="text-lg font-bold leading-none sm:text-xl relative">
                345
                <span className="absolute top-0 right-0 w-2 h-2 flex items-center justify-center">
                  <span className="absolute w-full h-full bg-green-500 rounded-full"></span>
                  <span className="absolute w-full h-full bg-green-500 rounded-full opacity-75 animate-ping"></span>
                </span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer config={chartConfig3}>
            <AreaChart
              accessibilityLayer
              data={chartData3}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Component;
