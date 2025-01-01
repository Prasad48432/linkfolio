"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FlagIcon } from "lucide-react";

interface Params {
  username: string;
}
export default function UsernamePage({ params }: { params: Params }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTime, setFetchTime] = useState<number | null>(null); // State to hold the fetching time

  useEffect(() => {
    const supabase = createClient(); // Initialize Supabase client

    const fetchData = async () => {
      try {
        const startTime = Date.now(); // Record start time

        setLoading(true);

        // Fetch the user ID from the profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", params.username)
          .single();

        if (profileError || !profile) {
          throw new Error("User not found");
        }

        const userId = profile.id;

        // Fetch related data from links, startups, and projects tables
        const [links, startups, projects] = await Promise.all([
          supabase.from("links").select("*").eq("user_id", userId),
          supabase.from("startups").select("*").eq("user_id", userId),
          supabase.from("projects").select("*").eq("user_id", userId),
        ]);

        if (links.error || startups.error || projects.error) {
          throw new Error("Error fetching related data");
        }

        // Set the fetched data
        setData({
          profile,
          links: links.data,
          startups: startups.data,
          projects: projects.data,
        });

        const endTime = Date.now(); // Record end time
        setFetchTime(endTime - startTime); // Calculate and set the fetch time
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.username]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="h-screen mx-auto grid place-items-center text-center px-8">
        <div>
          <FlagIcon className="w-20 h-20 mx-auto" />
          <p className="mt-10 !text-3xl !leading-snug md:!text-4xl">
            Error 404 <br /> It looks like something went wrong.
          </p>
          <p className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
            Don&apos;t worry, our team is already on it. Please try refreshing
            the page or come back later.
          </p>
          <p color="gray" className="w-full px-4 text-center">
            back home
          </p>
        </div>
      </div>
    );

  return (
    <div>
      <h1>User Data</h1>
      <img className="h-36 w-36 rounded-full" src={data.profile.avatar_url} />
      <p className="text-primary-text">{data.profile.full_name}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {/* Display the fetch time */}
      <p>Fetching took: {fetchTime} ms</p>
    </div>
  );
}
