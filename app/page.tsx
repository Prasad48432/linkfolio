"use client";
import { FlipWords } from "@/components/flipwords";
import Image from "next/image";
import { Spotlight } from "@/components/spotlight";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import MobileNavbar from "@/components/mobilenavbar";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import CookieConsent from "@/components/cookieconsent";
import UsernameCheck from "@/components/usernamecheck";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import Marquee from "react-fast-marquee";

const imageUrls = [
  {
    name: "Alice",
    photourl: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    name: "Bob",
    photourl: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Charlie",
    photourl: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    name: "Diana",
    photourl: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    name: "Eve",
    photourl: "https://randomuser.me/api/portraits/women/30.jpg",
  },
];

export default function Home() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDropdown1Open, setDropdown1Open] = useState(false);
  const [isDropdown2Open, setDropdown2Open] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Explicitly define the state type
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    full_name: "",
    username: "",
    bio: "",
    country: "",
    email: "",
    id: "",
    avatar_url: "",
    profile_link: "",
    profile_link_text: "",
    user_skills: [],
    resume_url: "",
    resume_url_visibility: false,
    theme: {
      primary_bg: "",
      secondary_bg: "",
      primary_text: "",
      accent_text: "",
      border: "",
      strongerborder: "",
    },
  });

  useEffect(() => {
    const supabase = createClient();

    const fetchProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "full_name, username, bio, country, email, id, avatar_url, profile_link, profile_link_text, user_skills, resume_url, resume_url_visibility, theme"
          )
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error retrieving profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data.session) {
          const userId = data.session.user.id;
          setUser(data.session.user);
          fetchProfile(userId);
        } else {
          setUser(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isNavbarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isNavbarOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpotlight(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col antialiased">
      <Navbar
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        setDropdown1Open={setDropdown1Open}
        setDropdown2Open={setDropdown2Open}
        loading={loading}
        userData={userData}
        user={user}
      />
      <MobileNavbar
        isOpen={isNavbarOpen}
        isDropdown1Open={isDropdown1Open}
        isDropdown2Open={isDropdown2Open}
        setDropdown1Open={setDropdown1Open}
        setDropdown2Open={setDropdown2Open}
        loading={loading}
        user={user}
      />
      <CookieConsent />
      {showSpotlight && (
        <Spotlight className="left-[-2rem] lg:left-[24rem] -top-[9.25rem]" />
      )}
      <main
        style={{
          overflow: isNavbarOpen ? "hidden" : "auto",
        }}
        className="relative min-h-screen"
      >
        <div className="relative -mt-[65px]">
          <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-16 overflow-hidden">
            <div className="relative">
              <div className="mx-auto">
                <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
                  <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
                    <div className="flex flex-col items-center">
                      <div className="z-40 w-full flex justify-center -mt-4 lg:-mt-12 mb-8">
                        <div className="relative w-fit max-w-xl flex justify-center">
                          <a
                            target="_self"
                            className="announcement-link group/announcement relative flex flex-row items-center p-1 pr-3 text-sm w-auto gap-2 text-left rounded-full bg-opacity-20 border border-secondary-border hover:border-secondary-strongerborder shadow-md overflow-hidden focus-visible:outline-none focus-visible:ring-brand-600 focus-visible:ring-2 focus-visible:rounded-full"
                            href="/launch-week"
                          >
                            <div className="inline-flex items-center bg-opacity-10 bg-accent-bg text-accent-text border border-secondary-strongerborder group-hover/announcement:border-secondary-border px-3 rounded-full text-sm py-1 announcement-badge">
                              50% off ends soon!
                            </div>
                            <span className="text-foreground announcement-text">
                              Learn more
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              aria-hidden="true"
                              className="announcement-icon h-4 ml-2 -translate-x-1 text-foreground transition-transform group-hover/announcement:translate-x-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br opacity-70 group-hover/announcement:opacity-100 transition-opacity overflow-hidden rounded-full from-background-surface-100 to-background-surface-300 backdrop-blur-md " />
                          </a>
                        </div>
                      </div>
                      <h1
                        className={`bricolage text-foreground font-extrabold text-herosize lg:text-7xl tracking-tight select-none`}
                      >
                        <span className="block text-primary-text lg:mb-2">
                          The spotlight your
                        </span>
                        <span className="text-accent-text block md:ml-0">
                          <FlipWords duration={3000} className="" /> deserves
                        </span>
                      </h1>
                      <p className="pt-2 text-primary-text/80 my-3 text-sx sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                        Boost your web presence with Linkfolio. Share your
                        startups, showcase projects, organize links, expand your
                        network, get noticed by recruiters, and discover new
                        opportunities <b>all in one sleek portfolio.</b>
                      </p>
                    </div>
                    {loading ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : !user ? (
                      <UsernameCheck />
                    ) : (
                      <div className="flex items-center gap-2">
                        <a
                          data-size="medium"
                          type="button"
                          className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-accent-bg hover:bg-accent-selection text-primary-text border-accent-border hover:border-accent-strongerborder text-xs md:text-sm px-4 md:px-5 py-1.5"
                          href="/dashboard/home"
                        >
                          <span className="truncate flex items-center justify-center">
                            Dashboard
                          </span>
                        </a>
                        <a
                          data-size="medium"
                          type="button"
                          className="inline-flex relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-secondary-bg hover:bg-secondary-selection border-secondary-border hover:border-secondary-strongerborder text-xs md:text-sm px-4 md:px-5 py-1.5"
                          href="/dashboard/analytics"
                        >
                          <span className="truncate">Analytics</span>
                        </a>
                      </div>
                    )}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-2 w-full lg:w-3/4 mt-3 lg:mt-0">
                      <Marquee
                        autoFill
                        speed={20}
                        pauseOnClick
                        pauseOnHover
                        gradient
                        gradientColor="#121212"
                        className="gap-2"
                      >
                        {imageUrls.map((image, index) => (
                          <div key={index} className="flex flex-col items-center justify-center gap-1">
                            <a
                              href={`${process.env.NEXT_PUBLIC_BASE_URL?.replace(
                                /(^\w+:|^)\/\//,
                                ""
                              )}/${image.name}`}
                              title={image.name}
                              className="mr-2 lg:mr-3 flex flex-col items-center justify-center gap-1"
                            >
                              <Image
                                src={
                                  image.photourl ? image.photourl : "/man.png"
                                }
                                width={50}
                                height={50}
                                loading="lazy"
                                alt="Picture of the author"
                                style={{ objectFit: "cover" }}
                                className="w-12 md:w-14 h-12 md:h-14 opacity-90 rounded-full p-1 border-dashed border-2 border-secondary-strongerborder"
                              />
                              <p className="text-xs text-primary-text/70">
                                {image.name}
                              </p>
                            </a>
                          </div>
                        ))}
                      </Marquee>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-16 grid grid-cols-4 gap-4 w-full">
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
            <div className="col-span-2 md:col-span-1 h-48 bg-secondary-bg hover:bg-secondary-selection border border-secondary-border hover:border-secondary-strongerborder rounded-lg transition-all ease-out duration-200"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
