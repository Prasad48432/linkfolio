import Navbar from "@/components/navbar";
import { Suspense } from "react";
import CookieConsent from "@/components/cookieconsent";
import { createClient } from "@/utils/supabase/server";
import { FlagIcon } from "lucide-react";
import Pricing from "@/components/pricing";
import Hero from "@/components/hero";
import HeroLoader from "@/components/heroloader";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: "Linkfolio",
    description: "Your portfolio on web light and powerful",
    icons: {
      icon: '/favicons/darkfav.ico'
    },
    openGraph: {
      title: "Linkfolio",
      description: "Your portfolio on web light and powerful",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      images: [
        {
          url: "/public/darkheader.png",
          width: 1200,
          height: 630,
          alt: "Linkfolio's OpenGraph Image",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "Linkfolio",
      description: "Your portfolio on web light and powerful",
      images: ["/public/darkheader.png"],
    },
  };
}

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileData = null;
  let profileError = null;

  if (user?.id) {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        "*, subscriptions:subscriptions(subscription_status, subscription_type)"
      )
      .eq("id", user.id)
      .single();

    profileData = data;
    profileError = error;
  }

  const { data: trendingProfiles, error: trendingProfilesError } =
    await supabase
      .from("profiles")
      .select("full_name, username, avatar_url, bio")
      .limit(5);

  const { data: blogsData, error: blogsError } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(2);

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
      <Suspense fallback={<HeroLoader />}>
        <Hero trendingProfiles={trendingProfiles} user={user} />
      </Suspense>
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
