import Navbar from "@/components/navbar";
import CookieConsent from "@/components/cookieconsent";
import { createClient } from "@/utils/supabase/server";
import { FlagIcon } from "lucide-react";
import Pricing from "@/components/pricing";
import Hero from "@/components/hero";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Linkfolio",
    description: "Your portfolio on web light and powerful",
    icons: {
      icon: "/favicons/darkfav.ico",
    },
    openGraph: {
      title: "Linkfolio",
      description: "Your portfolio on web light and powerful",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      images: [
        {
          url: "/ogimage.png",
          width: 1200,
          height: 630,
          alt: "Linkfolio's OpenGraph Image",
        },
      ],
      siteName: "Linkfolio site",
    },
    twitter: {
      card: "summary",
      title: "Linkfolio",
      description: "Your portfolio on web light and powerful",
      images: ["/ogimage.png"],
    },
  };
}

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Step 2: Initialize profile fetch as a Promise (conditionally)
  const profilePromise = user?.id
    ? supabase
        .from("profiles")
        .select(
          "*, subscriptions:subscriptions(subscription_status, subscription_type)"
        )
        .eq("id", user.id)
        .single()
    : Promise.resolve({ data: null, error: null }); // If no user, return resolved Promise

  // Step 3: Execute all three functions concurrently
  const [profileResult, trendingProfilesResult, blogsDataResult] =
    await Promise.all([
      profilePromise,
      supabase
        .from("profiles")
        .select("full_name, username, avatar_url, bio")
        .limit(5),
      supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(2),
    ]);

  // Step 4: Extract results
  const { data: profileData, error: profileError } = profileResult;

  const { data: trendingProfiles, error: trendingProfilesError } =
    trendingProfilesResult;
  const { data: blogsData, error: blogsError } = blogsDataResult;

  if (!blogsData || !trendingProfiles) {
    return (
      <div className="h-screen mx-auto grid place-items-center text-center px-8">
        <FlagIcon className="w-20 h-20 mx-auto" />
        <p className="mt-10 !text-3xl !leading-snug md:!text-4xl">
          Error 404 <br /> User not found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col antialiased">
      <Navbar user={user} profileData={profileData} blogs={blogsData} />
      <CookieConsent />
      <Hero trendingProfiles={trendingProfiles} user={user} />
      {(!user || profileData?.subscriptions?.length === 0) && (
        <Pricing user={user} />
      )}
      <div className="bg-lightprimary-bg dark:bg-primary-bg sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-16 grid grid-cols-4 gap-4 w-full">
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
        <div className="col-span-2 md:col-span-1 h-48 border bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder  dark:hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
      </div>
    </div>
  );
}
