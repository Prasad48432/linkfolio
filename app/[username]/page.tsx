import React from "react";
import { createClient } from "@/utils/supabase/server";
import { FlagIcon, Pencil } from "lucide-react";
import ProfileCard from "./components/profilecard";
import ContentsCard from "./components/contentscard";

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
    supabase.from("links").select("*").eq("user_id", profileId).order("index",{ascending: true}),
    supabase.from("startups").select("*").eq("user_id", profileId).order("index",{ascending: true}),
    supabase.from("projects").select("*").eq("user_id", profileId).order("index",{ascending: true}),
  ]);

  return (
    <>
      {userId === profileId && (
        <a
          href="/dashboard/home"
          target="_blank"
          style={{
            backgroundColor: profile.theme.primary_bg || "#121212",
            color: profile.theme.primary_text || "#ededed",
            borderColor: profile.theme.border || "#363636",
          }}
          className="fixed top-0 left-0 cursor-pointer gap-2 z-[51] flex items-center justify-center h-12 w-full border border-dashed"
        >
          <span className="font-semibold text-base md:text-xl flex items-center justify-center gap-2">
            Edit your Page <Pencil />
          </span>
        </a>
      )}
      <div
        style={{
          marginTop: userId === profileId ? "3rem" : "0rem",
          background: profile.theme.primary_bg || "#121212",
        }}
        className="flex flex-col lg:flex-row"
      >
        <div
          style={{
            borderColor: profile.theme.strongerborder || "#4d4d4d",
          }}
          className="w-full relative lg:fixed z-50 h-auto lg:h-screen lg:w-2/6 p-6 border-r-0 lg:border-r"
        >
          <ProfileCard profile={profile} />
        </div>
        <div className="w-full lg:min-h-[100vh] lg:w-4/6 relative lg:left-[33.34%] px-8 py-4">
          <ContentsCard
            profile={profile}
            startups={startups}
            projects={projects}
            links={links}
          />
        </div>
      </div>
    </>
  );
}
