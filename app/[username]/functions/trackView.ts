import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function trackPageView(username: string, profileId: string) {
  const supabase = createClient();
  const cookieStore = cookies();
  let visitorId = cookieStore.get("deviceId")?.value;

  // Format month as "MMM-YY" (e.g., "Jan-25")
  const currentMonth = new Date()
    .toLocaleString("en-US", {
      month: "short",
      year: "2-digit",
    })
    .replace(" ", "-");

  if (visitorId) {
    try {
      // Check if a record exists for this visitor and page
      const { data: existingView, error: fetchError } = await supabase
        .from("pageviews")
        .select("id, views, monthly_views")
        .eq("device_id", visitorId)
        .eq("username", username)
        .eq("user_id", profileId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching pageview:", fetchError);
        return visitorId;
      }

      if (existingView) {
        let monthlyViews = existingView.monthly_views || {};
        monthlyViews[currentMonth] = (monthlyViews[currentMonth] || 0) + 1;

        const { error: updateError } = await supabase
          .from("pageviews")
          .update({
            views: existingView.views + 1,
            monthly_views: monthlyViews,
            last_viewed_at: new Date().toISOString(),
          })
          .eq("id", existingView.id);

        if (updateError) {
          console.error("Error updating pageview:", updateError);
        }
      } else {
        const newMonthlyViews = { [currentMonth]: 1 };

        const { error: insertError } = await supabase.from("pageviews").insert([
          {
            device_id: visitorId,
            views: 1,
            username,
            user_id: profileId,
            monthly_views: newMonthlyViews,
            last_viewed_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          console.error("Error inserting pageview:", insertError);
        }
      }
    } catch (error) {
      console.error("Unexpected error in trackPageView:", error);
    }
  }
  return visitorId;
}
