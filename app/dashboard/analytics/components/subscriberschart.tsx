"use client";
import React from "react";
import { CartesianGrid, XAxis, LineChart, Line, LabelList } from "recharts";
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
import { TrendingUp } from "lucide-react";
import { BsFiletypeCsv } from "react-icons/bs";

type NewsletterSubscribers = {
  totalSubscribers: number;
  monthlySubscribers: {};
};
const subsConfig = {
  subscribers: {
    label: "Subscribers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const SubscribersChart = ({
  fetchLoading,
  newsletterSubscribers,
  monthlySubscribers,
}: {
  fetchLoading: boolean;
  newsletterSubscribers: NewsletterSubscribers;
  monthlySubscribers: any;
}) => {
  return (
    <Card className="col-span-8 lg:col-span-4 rounded-lg">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-4 lg:mb-0">
        <div className="flex w-full items-center justify-between">
          <div className="w-1/2 relative flex flex-col items-start justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
            <CardTitle className="text-lg leading-none text-lightprimary-text dark:text-primary-text">
              Newsletter Subscribers
            </CardTitle>
            <CardDescription className="text-lightprimary-text/60 dark:text-primary-text/60">
              Analyse and export subscribers
            </CardDescription>
          </div>
          {fetchLoading ? (
            <div className="w-1/2 flex">
              <div className="relative w-1/2 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-[#c4b59f] dark:bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c4b59f] via-[#928878] to-[#c4b59f] dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                </div>
              </div>
              <div className="relative w-1/2 flex flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                <div className="w-full h-12 bg-[#c4b59f] dark:bg-secondary-bg  relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c4b59f] via-[#928878] to-[#c4b59f] dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
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
                  {newsletterSubscribers.totalSubscribers}
                </span>
              </div>
              <div className="w-1/2 relative  flex flex-col items-center justify-center gap-2 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-secondary-selection sm:border-l sm:border-t-0 sm:px-8 sm:py-6 data-[active=true]:border-secondary-strongerborder last:rounded-tr-lg">
                <span className="text-xs text-muted-foreground">Export as</span>
                <div className="flex  items-center justify-center cursor-pointer">
                  <p className="py-1 px-2 flex text-primarytext items-center justify-center gap-1 text-xs bg-[#c1aa89] dark:bg-secondary-bg rounded-md border border-lightsecondary-border dark:border-secondary-border">
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
                className="w-[40px] lg:w-[80px] bg-[#c4b59f] dark:bg-secondary-bg rounded-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#c4b59f] via-[#928878] to-[#c4b59f] dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          <ChartContainer config={subsConfig}>
            <LineChart
              accessibilityLayer
              data={monthlySubscribers}
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
                dataKey="subscribers"
                type="natural"
                stroke="var(--color-subscribers)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-subscribers)",
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
              Trending up by{" "}
              <span className="text-lightsuccess-border dark:text-success-border">
                5.2%
              </span>{" "}
              this month{" "}
              <TrendingUp className="h-4 w-4 text-lightsuccess-border dark:text-success-border" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscribersChart;
