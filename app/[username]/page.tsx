import React from "react";
import { createClient } from "@/utils/supabase/server";
import { FlagIcon } from "lucide-react";
import ProfileCard from "./components/profilecard";

interface Params {
  username: string;
}

export default async function UsernamePage({ params }: { params: Params }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (profileError || !profile) {
    return (
      <div className="h-screen mx-auto grid place-items-center text-center px-8">
        <FlagIcon className="w-20 h-20 mx-auto" />
        <p className="mt-10 !text-3xl !leading-snug md:!text-4xl">
          Error 404 <br /> User not found.
        </p>
      </div>
    );
  }

  const userId = user?.id;
  const profileId = profile.id;

  const [links, startups, projects] = await Promise.all([
    supabase.from("links").select("*").eq("user_id", profileId),
    supabase.from("startups").select("*").eq("user_id", profileId),
    supabase.from("projects").select("*").eq("user_id", profileId),
  ]);

  return (
    <>
      {userId === profileId && (
        <a
          href="/dashboard/home"
          target="_blank"
          className="fixed top-0 bg-primary-bg border-secondary-strongerborder left-0 cursor-pointer gap-2 z-50 flex items-center justify-center h-12 w-full border border-dashed"
        >
          <span className="font-semibold text-base md:text-xl">
            Edit your Page
          </span>
        </a>
      )}
      <div
        style={{
          marginTop: userId === profileId ? "3rem" : "0rem",
        }}
        className="flex flex-col lg:flex-row"
      >
        <div className="w-full relative lg:fixed z-50 h-auto lg:h-screen lg:w-2/6 p-6 border-r border-secondary-strongerborder">
          <ProfileCard profile={profile} />
        </div>
        <div className="w-full lg:min-h-[100vh] lg:w-4/6 relative lg:left-[33.34%] p-8">
          <div className="grid grid-cols-2 gap-4 items-center justify-center auto-rows-min">
            <div className="bg-secondary-bg h-32 rounded-lg col-span-2 lg:col-span-1" />
            <div className="bg-secondary-bg h-32 rounded-lg col-span-2 lg:col-span-1" />
            <div className="bg-secondary-bg h-32 rounded-lg col-span-2 lg:col-span-1" />
            <div className="bg-secondary-bg h-16 rounded-lg col-span-2 lg:col-span-1" />
            <div className="bg-secondary-bg h-16 rounded-lg col-span-2 lg:col-span-1" />
            {/* {startups.data?.map((_, index) => (
              <div key={index} className="bg-secondary-bg h-36 rounded-lg" />
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
