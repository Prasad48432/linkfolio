"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ClicksChart from "./components/clickschart";
import SourcesChart from "./components/sourceschart";
import ViewsChart from "./components/viewschart";
import SubscribersChart from "./components/subscriberschart";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/context/profielcontext";
import Link from "next/link";
import AnimatedSVG from "@/components/animatedloader";

const Component = () => {
  const supabase = createClient();
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
  const [views, setViews] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    monthltyViews: {},
  });

  const [newsletterSubscribers, setNewsletterSubscribers] = useState({
    totalSubscribers: 0,
    monthlySubscribers: {},
  });

  const { subscription, loading, subscriptionStatus } = useProfile();

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

    const fetchViews = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;
        if (!userId) return;

        const { data: viewsData, error: viewsError } = await supabase
          .from("pageviews")
          .select("*")
          .eq("user_id", user.id);

        if (viewsError) {
          console.log("Error fetching views:", viewsError);
          return;
        }

        // console.log(viewsData);
        const uniqueVisitors = viewsData.length; // Number of unique visitors (each object represents one visitor)
        const totalViews = viewsData.reduce((sum, item) => sum + item.views, 0); // Sum up all views

        // Merging monthly_views
        const mergedMonthlyViews = viewsData.reduce((acc, item) => {
          for (const [month, count] of Object.entries(
            item.monthly_views || {}
          )) {
            acc[month] = (acc[month] || 0) + count;
          }
          return acc;
        }, {});

        const monthMap = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        } as const;

        const formattedViewsData = Object.entries(mergedMonthlyViews)
          .map(([month, views]) => ({ month, views }))
          .sort((a, b) => {
            const [aMonth, aYear] = a.month.split("-");
            const [bMonth, bYear] = b.month.split("-");

            const yearA = parseInt(aYear, 10) + 2000; // Convert "24" -> 2024
            const yearB = parseInt(bYear, 10) + 2000;

            const monthA = monthMap[aMonth as keyof typeof monthMap]; // ✅ Fix
            const monthB = monthMap[bMonth as keyof typeof monthMap]; // ✅ Fix

            return yearA === yearB ? monthA - monthB : yearA - yearB;
          });

        setViews({
          totalViews: totalViews,
          uniqueVisitors: uniqueVisitors,
          monthltyViews: formattedViewsData,
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchNewsLetterSubscriber = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;
        if (!userId) return;

        const { data: newsletterData, error: newsletterError } = await supabase
          .from("newsletter_subscribers")
          .select("timestamp")
          .eq("user_id", user.id);

        if (newsletterError) {
          console.error("Error fetching newsletter data:", newsletterError);
          return;
        }

        const totalSubscribers = newsletterData.length;

        // Group by month
        const subscribersByMonth = newsletterData.reduce(
          (acc, { timestamp }) => {
            const date = new Date(timestamp);
            const monthKey = `${date.toLocaleString("en-US", {
              month: "short",
            })}-${date.getFullYear().toString().slice(-2)}`;

            acc[monthKey] = (acc[monthKey] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        // Convert to formatted array
        const formattedData = Object.entries(subscribersByMonth)
          .map(([month, subscribers]) => ({ month, subscribers }))
          .sort((a, b) => {
            const [aMonth, aYear] = a.month.split("-");
            const [bMonth, bYear] = b.month.split("-");

            const monthMap = {
              Jan: 0,
              Feb: 1,
              Mar: 2,
              Apr: 3,
              May: 4,
              Jun: 5,
              Jul: 6,
              Aug: 7,
              Sep: 8,
              Oct: 9,
              Nov: 10,
              Dec: 11,
            };

            const yearA = parseInt(aYear, 10) + 2000;
            const yearB = parseInt(bYear, 10) + 2000;
            const monthA = monthMap[aMonth as keyof typeof monthMap];
            const monthB = monthMap[bMonth as keyof typeof monthMap];

            return yearA === yearB ? monthA - monthB : yearA - yearB;
          });

        setNewsletterSubscribers({
          totalSubscribers: totalSubscribers,
          monthlySubscribers: formattedData,
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchClicks();
    fetchViews();
    fetchNewsLetterSubscriber();
  }, []);

  return (
    <>
      {subscription === "elite" && subscriptionStatus === "active" ? (
        <>
          <div className="grid grid-cols-8 gap-4 p-4">
            <ClicksChart fetchLoading={fetchLoading} clicks={clicks} />
            <SourcesChart fetchLoading={fetchLoading} />
            <ViewsChart
              fetchLoading={fetchLoading}
              views={views}
              monthlyviews={views.monthltyViews}
            />
            <SubscribersChart
              fetchLoading={fetchLoading}
              newsletterSubscribers={newsletterSubscribers}
              monthlySubscribers={newsletterSubscribers.monthlySubscribers}
            />
          </div>
        </>
      ) : loading ? (
        <div className="flex gap-2 h-[calc(100vh-100px)] relative items-center justify-center">
          <AnimatedSVG />
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-[calc(100vh-100px)] relative items-center justify-center">
          <p className="text-lg lg:text-xl font-bold text-lightprimary-text dark:text-primary-text">
            {subscriptionStatus === "past_due"
              ? "⚠️ Subscription Due"
              : "🔒 Feature Locked"}
          </p>
          <p className="text-sm lg:text-lg font-normal text-lightprimary-text/80 dark:text-primary-text/80">
            {subscriptionStatus === "past_due"
              ? "Subscription is past due update payment details"
              : "This feature is available for premium users only."}
          </p>
          <Button className="mt-2" variant={"secondary"}>
            <Link href={"/#pricing"}>
              {" "}
              {subscriptionStatus === "past_due" ? "Update now" : "Upgrade now"}
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default Component;
