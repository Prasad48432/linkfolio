"use client";
import { FlipWords } from "@/components/flipwords";
import Image from "next/image";
import { Spotlight } from "@/components/spotlight";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import MobileNavbar from "@/components/mobilenavbar";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";

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
  
  useEffect(() => {
    // Add or remove the `overflow-hidden` class on the <body> tag
    if (isNavbarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isNavbarOpen]);
  return (
    <div className="w-full h-full flex flex-col antialiased">
      <Navbar isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      <MobileNavbar isOpen={isNavbarOpen} />
      {/* <Spotlight  className="left-[24rem] -top-[9.25rem] "/> */}
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
                              Launch Week 13
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
                        className={`bricolage text-foreground font-extrabold text-3xl lg:text-7xl tracking-tight`}
                      >
                        <span className="block text-primary-text lg:mb-2">
                          The spotlight your
                        </span>
                        <span className="text-accent-text block md:ml-0">
                          <FlipWords duration={3000} className="" /> deserves
                        </span>
                      </h1>
                      <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
                        Supabase is an open source Firebase alternative.{/* */}{" "}
                        <br className="hidden md:block" />
                        Start your project with a Postgres database,
                        Authentication, instant APIs, Edge Functions, Realtime
                        subscriptions, Storage, and Vector embeddings.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        data-size="medium"
                        type="button"
                        className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-accent-bg hover:bg-accent-bg/80 text-primary-text border-accent-border hover:border-accent-strongerborder text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 h-[38px]"
                        href="https://supabase.com/dashboard"
                      >
                        <span className="truncate flex items-center justify-center">
                          Create your{" "}
                          <span className="hidden md:block ml-1 mr-1">
                            linkfolio
                          </span>{" "}
                          page
                        </span>
                      </a>
                      <a
                        data-size="medium"
                        type="button"
                        className="inline-flex relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-secondary-bg hover:bg-secondary-selection border-secondary-border hover:border-secondary-strongerborder text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 h-[38px]"
                        href="/contact/sales"
                      >
                        <span className="truncate">Check live demo</span>
                      </a>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                      <div className="-space-x-5 avatar-group justify-center  lg:justify-start">
                        {imageUrls.map((image, index) => (
                          <div
                            title={image.name}
                            key={index}
                            className="avatar w-10 md:w-12 h-10 md:h-12 opacity-90"
                          >
                            <Image
                              src={image.photourl ? image.photourl : "/man.png"}
                              width={50}
                              height={50}
                              loading="lazy"
                              alt="Picture of the author"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col justify-center items-center md:items-start gap-1">
                        <div className="relative inline-flex">
                          <Rating
                            style={{ width: 100 }}
                            value={4.25}
                            readOnly
                          />
                        </div>
                        <div className="text-xs md:text-sm text-primarytext">
                          <span className="font-semibold  mr-1">290</span>
                          <span className="opacity-70">
                            Entrepreneurs joined!
                          </span>
                        </div>
                      </div>
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
