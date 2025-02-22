import { FlipWords } from "@/components/flipwords";
import Image from "next/image";
import { Spotlight } from "@/components/spotlight";
import MobileNavbar from "@/components/mobilenavbar";
import Navbar from "@/components/navbar";
import { useState, useEffect, Suspense } from "react";
import CookieConsent from "@/components/cookieconsent";
import UsernameCheck from "@/components/usernamecheck";
import { createClient } from "@/utils/supabase/server";
import { FlagIcon, Loader, MoveRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import Pricing from "@/components/pricing";
import { Database } from "@/types/supabasetypes";

import type { User } from "@supabase/supabase-js";
import Hero from "@/components/hero";
import HeroLoader from "@/components/heroloader";

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
      .single(); // Use .single() if fetching one user profile

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
  // const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  // const [isDropdown1Open, setDropdown1Open] = useState(false);
  // const [isDropdown2Open, setDropdown2Open] = useState(false);
  // const [showSpotlight, setShowSpotlight] = useState(false);
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [profileData, setProfileData] = useState<Profile | null>(null);
  // const [trendingProfiles, setTrendingProfiles] = useState<TrendingProfile[]>(
  //   () => []
  // );
  // const [blogs, setBlogs] = useState<blog[]>(() => []);

  // const fetchTrendingProfiles = async () => {
  //   try {
  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select("full_name, username, avatar_url, bio")
  //   .limit(5);
  //     if (error) throw error;
  //     setTrendingProfiles(data);
  //   } catch (error) {
  //     console.error("Error retrieving trending profiles:", error);
  //   }
  // };

  // const fetchProfileData = async () => {
  //   try {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (!user) return;

  //     setUser(user);

  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select(
  //     "*, subscriptions:subscriptions(subscription_status, subscription_type)"
  //   )
  //   .eq("id", user?.id);

  //     if (error) {
  //       console.error("Error retrieving profile data:", error);
  //       return;
  //     }

  //     console.log(data[0]);

  //     setProfileData(data ? (data[0] as Profile) : null);
  //   } catch (error) {
  //     console.error("Error retrieving profile data:", error);
  //   }
  // };

  // const fetchBlogs = async () => {
  //   try {
  // const { data, error } = await supabase
  //   .from("blogs")
  //   .select("*")
  //   .order("created_at", { ascending: true })
  //   .limit(2);

  //     if (error) {
  //       console.error("Error retrieving Blogs:", error);
  //       return;
  //     }

  //     setBlogs(data ?? []);
  //   } catch (error) {
  //     console.error("Error retrieving Blogs:", error);
  //   }
  // };

  // useEffect(() => {
  //   Promise.all([
  //     fetchProfileData(),
  //     fetchTrendingProfiles(),
  //     fetchBlogs(),
  //   ]).finally(() => setLoading(false));
  // }, []);

  // useEffect(() => {
  //   if (isNavbarOpen) {
  //     document.body.classList.add("overflow-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-hidden");
  //   }

  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // }, [isNavbarOpen]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSpotlight(true);
  //   }, 200);

  //   return () => clearTimeout(timer);
  // }, []);

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
      {/* <CookieConsent />*/}
      <Suspense fallback={<HeroLoader />}>
        <Hero trendingProfiles={trendingProfiles} user={user} />
      </Suspense>
      {(!user || profileData?.subscriptions?.length === 0) && (
        <Pricing user={user} />
      )}
      <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-16 grid grid-cols-4 gap-4 w-full">
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
