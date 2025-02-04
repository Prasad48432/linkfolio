"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ClicksChart from "./components/clickschart";
import SourcesChart from "./components/sourceschart";
import ViewsChart from "./components/viewschart";
import SubscribersChart from "./components/subscriberschart";


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
      <ClicksChart fetchLoading={fetchLoading} clicks={clicks} />
      <SourcesChart fetchLoading={fetchLoading} />
      <ViewsChart fetchLoading={fetchLoading} />
      <SubscribersChart fetchLoading={fetchLoading} />
    </div>
  );
};

export default Component;
