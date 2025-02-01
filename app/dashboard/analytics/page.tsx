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
  YAxis,
  LineChart,
  Line,
  LabelList,
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
import { TrendingUp } from "lucide-react";
import { BsFiletypeCsv } from "react-icons/bs";

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
          <div className="flex w-full lg:w-[45%] flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle className="text-lg leading-none text-primary-text">
              Visitor Clicks
            </CardTitle>
            <CardDescription className="text-primary-text/60">
              Showing total clicks of visitors
            </CardDescription>
          </div>
          {fetchLoading ? (
            <div className="w-full lg:w-[55%] flex">
              <div className="relative w-1/3 z-30 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
              <div className="relative w-1/3 z-30 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
              <div className="relative w-1/3 z-30 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
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
                    className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection border-l border-t lg:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder lg:last:rounded-tr-lg"
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
                <div className="relative w-1/2 z-30 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                  </div>
                </div>
                <div className="relative w-1/2 z-30 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
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
      <Card className="col-span-8 lg:col-span-4 rounded-lg">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-4 lg:mb-0">
          {fetchLoading ? (
            <>
              <div className="relative z-30 w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
              <div className="relative z-30 w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
              <div className="relative z-30 w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-between">
              <div className="relative z-30 w-1/3 flex flex-col items-center justify-center gap-1 first:border-l-0 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                <span className="text-xs text-muted-foreground">
                  Page Views
                </span>
                <span className="text-lg font-bold leading-none sm:text-xl">
                  345
                </span>
              </div>
              <div className="relative z-30 w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                <span className="text-xs text-muted-foreground">
                  Unique Visitors
                </span>
                <span className="text-lg font-bold leading-none sm:text-xl">
                  345
                </span>
              </div>
              <div className="relative z-30 w-1/3 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                <span className="text-xs text-muted-foreground">
                  Live Visitors
                </span>
                <span className="text-lg font-bold leading-none sm:text-xl relative">
                  345
                  <span className="absolute top-1/2 -translate-y-1/2 -right-4 w-2 h-2 flex items-center justify-center">
                    <span className="absolute w-full h-full bg-green-500 rounded-full"></span>
                    <span className="absolute w-full h-full bg-green-500 rounded-full opacity-75 animate-ping"></span>
                  </span>
                </span>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
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
            <ChartContainer config={chartConfig3}>
              <LineChart
                accessibilityLayer
                data={chartData3}
                margin={{
                  top: 20,
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by <span className="text-success-border">5.2%</span>{" "}
                this month{" "}
                <TrendingUp className="h-4 w-4 text-success-border" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card className="col-span-8 lg:col-span-4 rounded-lg">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-4 lg:mb-0">
          <div className="flex w-full items-center justify-between">
            <div className="w-1/2 relative flex flex-col items-start justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
              <CardTitle className="text-lg leading-none text-primary-text">
                Newsletter Subscribers
              </CardTitle>
              <CardDescription className="text-primary-text/60">
                Analyse and export subscribers
              </CardDescription>
            </div>
            {fetchLoading ? (
              <div className="w-1/2 flex">
                <div className="relative w-1/2 z-30 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                  </div>
                </div>
                <div className="relative w-1/2 z-30 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                  <div className="w-full h-12 bg-secondary-bg  relative overflow-hidden rounded-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-1/2 flex items-center justify-end">
                <div className="w-1/2 relative  flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                  <span className="text-xs text-muted-foreground">
                    Subscribers
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-xl">
                    345
                  </span>
                </div>
                <div className="w-1/2 relative  flex flex-col items-center justify-center gap-2 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                  <span className="text-xs text-muted-foreground">
                    Export as
                  </span>
                  <div className="flex  items-center justify-center cursor-pointer">
                    <p className="py-1 px-2 flex text-primarytext items-center justify-center gap-1 text-xs bg-secondary-bg rounded-md border border-secondary-border">
                      <BsFiletypeCsv size={15} /> CSV
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
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
            <ChartContainer config={chartConfig3}>
              <LineChart
                accessibilityLayer
                data={chartData3}
                margin={{
                  top: 20,
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by <span className="text-success-border">5.2%</span>{" "}
                this month{" "}
                <TrendingUp className="h-4 w-4 text-success-border" />
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
