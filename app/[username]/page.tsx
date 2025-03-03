import React from "react";
import { createClient } from "@/utils/supabase/server";
import ProfileCard from "./components/profilecard";
import ContentsCard from "./components/contentscard";
import MobileSocialsRender from "./components/mobilesocials";
import { Metadata } from "next";
import { CiEdit } from "react-icons/ci";
import removeMarkdown from "remove-markdown";
import { trackPageView } from "./functions/trackView";
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from "next/image";
import supabase from "@/utils/supabase/supabase";

interface Params {
  username: string;
  utm_source?: string;
  utm_location?: string;
}

function RemoveMarkdown(markdown: string): string {
  const result = removeMarkdown(markdown).replace(/\s+/g, " ").trim();

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

export async function generateStaticParams() {
  const { data: profiles, error } = await supabase.from("profiles").select("username");

  if (error) {
    console.error("Error fetching usernames:", error);
    return [];
  }

  console.log("Generated static params:", profiles);

  return profiles.map((profile) => ({
    username: profile.username,
  }));
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
    <div className="w-full h-screen bg-lightprimary-bg dark:bg-primary-bg">
      <div className="sm:py-18 max-w-7xl relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-20 xl:px-20 pt-8 pb-10 md:pt-16 overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <p className="mt-10 text-5xl font-semibold">Error 404</p>
          <p className="mt-2 mb-12 text-xl font-medium">
            User not found, but you can still make this username yours
          </p>
          <div className="flex items-center justify-center gap-0 mb-8">
            <Image
              className="w-[248px] h-[48px] block dark:hidden"
              src="/darkheaderlogo.png"
              alt="Header Logo"
              width={500}
              height={500}
              priority
            />

            {/* Dark Mode Image */}
            <Image
              className="w-[248px] h-[48px] hidden dark:block"
              src="/headerlogo.png"
              alt="Header Logo Dark"
              width={500}
              height={500}
              priority
            />
            <p className="text-3xl font-semibold text-lightprimary-text dark:text-primary-text">
              ??
            </p>
          </div>
          <p className="mb-6 text-xl">
            The username{" "}
            <a
              href={`/register?username=${params.username}`}
              className="font-semibold text-lightaccent-text dark:text-accent-text underline underline-offset-1"
            >
              {params.username}
            </a>{" "}
            is still available{" "}
          </p>
          <a
            href={`/register?username=${params.username}`}
            className="flex cursor-pointer transition-all duration-200 ease-out rounded-lg gap-2 items-center justify-center bg-lightsecondary-bg border border-lightsecondary-border hover:bg-lightsecondary-selection hover:border-lightsecondary-strongerborder dark:border-secondary-border dark:bg-secondary-bg dark:hover:bg-secondary-selection dark:hover:border-secondary-strongerborder px-2 py-1"
          >
            Reserve now <IoIosArrowRoundForward size={20} />
          </a>
        </div>
      </div>
    </div>
    );
  }

  await trackPageView(params.username, profile.id);

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
      className="flex flex-col lg:flex-row relative change_selection"
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
