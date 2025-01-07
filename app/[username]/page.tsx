"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FlagIcon } from "lucide-react";
import Image from "next/image";
import MarkdownParser from "@/components/markdown-parser";

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
    <>
      <a
        href="/dashboard/home"
        target="_blank"
        className="fixed top-0 bg-primary-bg border-secondary-strongerborder left-0 cursor-pointer gap-2 z-50 flex items-center justify-center h-12 w-full  border border-r-0 border-l-0 border-dashed"
      >
        <span className="font-semibold text-base md:text-xl">
          Edit your Page
        </span>
      </a>
      <div className="flex flex-col lg:flex-row mt-[3rem]">
        <div className="w-full relative lg:fixed z-50 h-auto lg:h-screen lg:w-2/6 p-6 lg:border lg:border-t-0 lg:border-b-0 lg:border-l-0 border-secondary-strongerborder">
          <div className="flex flex-row lg:flex-col items-center justify-center">
            <Image
              alt="User profile"
              width={600}
              height={600}
              src={data.profile.avatar_url || "/avatars/annie.png"}
              className="w-28 h-28 rounded-full ring-2 ring-secondary-border p-1 inline-block object-cover mb-4"
              referrerPolicy="no-referrer"
            />
            <p className="text-primary-text text-2xl font-semibold">
              {data.profile.full_name}
            </p>
            <MarkdownParser text={data.profile.bio} className="text-center text-sm md:text-base mb-0 lg:mb-4 pt-2 pb-2 lg:p-2 max-w-[95%] lg:max-w-[90%]"/>
            <p>Fetching took: {fetchTime} ms</p>
            <h1>User Data</h1>
          </div>
        </div>
        <div
          className={`w-full ${
            !loading ? "lg:min-h-[100vh]" : "lg:h-[120vh]"
          } lg:w-4/6 relative lg:left-[33.34%] p-8`}
        >
          <div className="grid grid-cols-2 gap-4 items-center justify-center auto-rows-min">
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
            <div className="bg-secondary-bg col-span-1 h-36 rounded-lg"></div>
          </div>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
}
