"use client";

import { useEffect, useRef } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { createClient } from "@/utils/supabase/client";

const TrackView = ({
  username,
  profile,
}: {
  username: string;
  profile: any;
}) => {
  const supabase = createClient();
  const hasTracked = useRef(false);
  useEffect(() => {
    if (hasTracked.current) return; // If already tracked, exit
    hasTracked.current = true;
    const trackView = async () => {
      let deviceId = localStorage.getItem("deviceId");

      if (!deviceId) {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        deviceId = result.visitorId;
        localStorage.setItem("deviceId", deviceId);
      }

      console.log("deviceId: " + deviceId);
      console.log("username", username);
      console.log("user_id", profile.id);

      // const { data: existingView } = await supabase
      //   .from("pageviews")
      //   .select("id, views, monthly_views")
      //   .eq("device_id", deviceId)
      //   .eq("username", username)
      //   .eq("user_id", profile.id)
      //   .single();

      // // Format month as "MMM-YY" (e.g., "Jan-25")
      // const currentMonth = new Date()
      //   .toLocaleString("en-US", {
      //     month: "short",
      //     year: "2-digit",
      //   })
      //   .replace(" ", "-");

      // console.log(existingView);
      // console.log(currentMonth);

      // if (existingView) {
      //   let monthlyViews = existingView.monthly_views || {};
      //   monthlyViews[currentMonth] = (monthlyViews[currentMonth] || 0) + 1;
      //   await supabase
      //     .from("pageviews")
      //     .update({
      //       views: existingView.views + 1,
      //       monthly_views: monthlyViews,
      //     })
      //     .eq("id", existingView.id);
      // } else {
      //   const newMonthlyViews = { [currentMonth]: 1 };
      //   await supabase.from("pageviews").insert([
      //     {
      //       device_id: deviceId,
      //       views: 1,
      //       username: username,
      //       user_id: profile.id,
      //       monthly_views: newMonthlyViews,
      //     },
      //   ]);
      // }
    };

    trackView();
  }, [username]);

  return null; // No UI needed
};

export default TrackView;
