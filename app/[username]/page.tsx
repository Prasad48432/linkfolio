import React from "react";
import { createClient } from "@/utils/supabase/server";
import { FlagIcon, Pencil } from "lucide-react";
import ProfileCard from "./components/profilecard";
import ContentsCard from "./components/contentscard";
import MobileSocialsRender from "./components/mobilesocials";
import { Metadata } from "next";
import { CiEdit } from "react-icons/ci";
import removeMarkdown from "remove-markdown";
import TrackView from "./components/trackview";

interface Params {
  username: string;
  utm_source?: string;
  utm_location?: string;
}

function RemoveMarkdown(markdown: string): string {
  const result = removeMarkdown(markdown).replace(/\s+/g, " ").trim()

  return result;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const results = await getNameBio(params.username);
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.username}`;

  return {
    title: `${results?.full_name}`,
    description: RemoveMarkdown(results?.bio),
    icons: {
      icon: results?.favicon,
    },
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: results?.full_name,
      description: RemoveMarkdown(results?.bio),
      url: fullUrl,
      images: [
        {
          url: results?.avatar_url,
          width: 1200,
          height: 630,
          alt: `${results?.full_name}'s OpenGraph Image`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: results?.full_name,
      description: RemoveMarkdown(results?.bio),
      images: [results?.avatar_url],
    },
  };
}

const getNameBio = async (username: string) => {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, bio, avatar_url, favicon")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    return null;
  }

  return profile;
};

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
    supabase
      .from("links")
      .select("*")
      .eq("user_id", profileId)
      .order("index", { ascending: true }),
    supabase
      .from("startups")
      .select("*")
      .eq("user_id", profileId)
      .order("index", { ascending: true }),
    supabase
      .from("projects")
      .select("*")
      .eq("user_id", profileId)
      .order("index", { ascending: true }),
  ]);


  return (
    <div
      style={{
        background: profile.theme.primary_bg || "#121212",
      }}
      className="flex flex-col lg:flex-row relative"
    >
      {userId === profileId && (
        <a
          href="/dashboard/home"
          target="_blank"
          style={{
            backgroundColor: profile.theme.secondary_bg || "#262626",
            color: profile.theme.primary_text || "#ededed",
            borderColor: profile.theme.strongerborder || "#4d4d4d",
          }}
          className="absolute text-mx w-8 h-8 lg:w-auto lg:h-auto lg:text-sm rounded-full gap-1 px-2 py-1 border-2 border-dashed top-3 lg:top-4 left-3 lg:left-auto lg:right-8 flex items-center justify-center z-[51] cursor-pointer"
        >
          <CiEdit className="text-base lg:text-lg" />{" "}
          <p className="hidden md:block">Edit Page</p>
        </a>
      )}
      <TrackView username={params.username} profile={profile} />
      <div
        style={{
          borderColor: profile.theme.strongerborder || "#4d4d4d",
        }}
        className="w-full relative lg:fixed z-50 h-auto lg:h-screen lg:w-2/6 px-6 py-3 border-r-0 lg:border-r"
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
        <MobileSocialsRender profile={profile} />
      </div>
    </div>
  );
}
