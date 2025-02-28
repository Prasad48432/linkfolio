"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, HandCoins, Loader, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

const Upgrade = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);
  return (
    <div
      className={
        "w-full bg-lightprimary-bg dark:bg-primary-bg min-h-screen relative overflow-hidden"
      }
    >
      <div
        className={
          "mx-auto max-w-6xl relative px-[16px] md:px-[32px] py-[24px] flex flex-col gap-6 justify-between"
        }
      >
        <div className={"flex gap-4 items-center justify-start"}>
          <Link href={"/"}>
            <Button
              variant={"secondary"}
              className={
                "h-[32px] hover:bg-lightsecondary-bg bg-lightsecondary-selection dark:hover:bg-secondary-selection dark:bg-secondary-bg text-lightprimary-text dark:text-primary-text border-border w-[32px] p-0 rounded-[4px]"
              }
            >
              <ChevronLeft />
            </Button>
          </Link>
          <Image
            className="w-[124px] h-[24px] block dark:hidden"
            src="/darkheaderlogo.png"
            alt="Header Logo"
            width={124}
            height={24}
            priority
          />
          <Image
            className="w-[124px] h-[24px] hidden dark:block"
            src="/headerlogo.png"
            alt="Header Logo Dark"
            width={124}
            height={24}
            priority
          />
        </div>
        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center bg-lightprimary-bg dark:bg-primary-bg">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-lightprimary-bg dark:bg-primary-bg">
            <TabGroup>
              <TabList className="flex items-center justify-center p-1.5 lg:p-2 gap-1 rounded-full">
                <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightsecondary-bg dark:data-[selected]:bg-secondary-bg border border-lightsecondary-border dark:border-secondary-border data-[selected]:border-lightsecondary-border dark:data-[selected]:border-secondary-border data-[hover]:bg-lightsecondary-selection dark:data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-lightsecondary-bg/80 dark:data-[selected]:data-[hover]:bg-secondary-bg/80">
                  Monthly
                </Tab>
                <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightsecondary-bg dark:data-[selected]:bg-secondary-bg border border-lightsecondary-border dark:border-secondary-border data-[selected]:border-lightsecondary-border dark:data-[selected]:border-secondary-border data-[hover]:bg-lightsecondary-selection dark:data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-lightsecondary-bg/80 dark:data-[selected]:data-[hover]:bg-secondary-bg/80">
                  Yearly: <span className="text-success-border">save upto 40%</span>
                </Tab>
                <Tab className="relative transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightsecondary-bg dark:data-[selected]:bg-secondary-bg border border-lightsecondary-border dark:border-secondary-border data-[selected]:border-lightsecondary-border dark:data-[selected]:border-secondary-border data-[hover]:bg-lightsecondary-selection dark:data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-lightsecondary-bg/80 dark:data-[selected]:data-[hover]:bg-secondary-bg/80">
                  Lifetime
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel className="max-w-7xl px-2.5 flex flex-col  items-center justify-center mx-auto">
                  <div className="bg-lightprimary-bg dark:bg-primary-bg">
                    <div>
                      <div className="py-8 px-4 mx-auto max-w-screen-xl">
                        <div className="space-y-8 flex flex-col lg:flex-row sm:gap-6 xl:gap-10 lg:space-y-0">
                          <div className="relative flex justify-center scale-100">
                            <div className="flex flex-col p-6 mx-auto w-full bg-lightprimary-lighter dark:bg-primary-lighter max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                              <h3 className="mb-1 text-2xl font-semibold">
                                LF Core ⚡
                              </h3>
                              <p className="font-light sm:text-lg text-lightprimary-text/80 dark:text-primary-text/80">
                                Best for limited Entries.
                              </p>
                              <div className="flex justify-center items-baseline my-6">
                                <span className="mr-2 text-2xl lg:text-3xl font-extrabold">
                                  ₹79
                                </span>
                                <span className="text-lightprimary-text/80 dark:text-primary-text/80">
                                  /month
                                </span>
                              </div>
                              <ul
                                role="list"
                                className="mb-8 space-y-2.5 text-left text-sm lg:text-base"
                              >
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-yellow-500 dark:text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Validity:{" "}
                                    <span className="font-semibold">
                                      1 Month
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Max size:{" "}
                                    <span className="font-semibold">
                                      4 Entries
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <X
                                    className="text-lightdanger-border dark:text-red-500"
                                    size={16}
                                  />
                                  <span>
                                    Access to{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Themes
                                    </span>{" "}
                                    and{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Fonts
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <X
                                    className="text-lightdanger-border dark:text-red-500"
                                    size={16}
                                  />
                                  <span>
                                    Intergrate{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Revenue
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <X
                                    className="text-lightdanger-border dark:text-red-500"
                                    size={16}
                                  />
                                  <span>
                                    Access to{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Analytics
                                    </span>
                                  </span>
                                </li>
                              </ul>
                              <CheckoutButton
                                user={user}
                                priceId="pri_01jmkchaz4z34135mqy9wfbx6w"
                              />
                            </div>
                          </div>
                          <div className="relative flex justify-center scale-100">
                            <div className="cursor-pointer absolute top-[-15px] left-1/2 transform -translate-x-1/2">
                              <p className="text-sm flex gap-1 rounded-full font-semibold animate-shine items-center justify-center border border-gray-600 bg-[linear-gradient(110deg,#ffc2b3,45%,#ff9980,55%,#ffc2b3)] dark:bg-[linear-gradient(110deg,#131313,45%,#474747,55%,#131313)] bg-[length:200%_100%] px-3 py-1 text-lightprimary-text dark:text-primary-text transition-colors">
                                Popular{" "}
                                <TrendingUp
                                  size={15}
                                  className="text-lightprimary-text dark:text-primary-text"
                                />
                              </p>
                            </div>
                            <div className="flex flex-col p-6 mx-auto w-full bg-lightprimary-lighter dark:bg-primary-lighter max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                              <h3 className="mb-1 text-2xl font-semibold">
                                LF Elite ✨
                              </h3>
                              <p className="font-light text-lightprimary-text/80 dark:text-primary-text/80 sm:text-lg">
                                Best for more Entries.
                              </p>
                              <div className="flex justify-center items-baseline my-6">
                                <span className="mr-2 text-2xl lg:text-3xl font-extrabold">
                                  ₹130
                                </span>
                                <span className="text-lightprimary-text/80 dark:text-primary-text/80">
                                  /month
                                </span>
                              </div>
                              <ul
                                role="list"
                                className="mb-8 space-y-2.5 text-left text-sm lg:text-base"
                              >
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-yellow-500 dark:text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Validity:{" "}
                                    <span className="font-semibold">
                                      1 Month
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Max size:{" "}
                                    <span className="font-semibold">
                                      6 Entries
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Access to{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="color_pallete"
                                    >
                                      12 Themes
                                    </span>{" "}
                                    and{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="font_image"
                                    >
                                      6 Fonts
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Integrate{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="revn_place"
                                    >
                                      Revenue
                                    </span>{" "}
                                    <span className="italic">
                                      (build trust)
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Access to{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="analytics_image"
                                    >
                                      Analytics
                                    </span>
                                  </span>
                                </li>
                              </ul>
                              <CheckoutButton
                                user={user}
                                priceId="pri_01jmkcrmhx2j7net3w3znnp0yy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="max-w-7xl px-2.5 flex flex-col  items-center justify-center mx-auto">
                  <div className="bg-lightprimary-bg dark:bg-primary-bg">
                    <div>
                      <div className="py-8 px-4 mx-auto max-w-screen-xl">
                        <div className="space-y-8 flex flex-col lg:flex-row sm:gap-6 xl:gap-10 lg:space-y-0">
                          <div className="relative flex justify-center scale-100">
                            <div className="flex flex-col p-6 mx-auto w-full bg-lightprimary-lighter dark:bg-primary-lighter max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                              <h3 className="mb-1 text-2xl font-semibold">
                                LF Core ⚡
                              </h3>
                              <p className="font-light sm:text-lg text-lightprimary-text/80 dark:text-primary-text/80">
                                (Billed yearly)
                              </p>
                              <div className="flex justify-center items-baseline my-6">
                                <span className="mr-2 text-2xl lg:text-3xl font-extrabold">
                                  ₹50
                                </span>
                                <span className="text-lightprimary-text/80 dark:text-primary-text/80">
                                  /month
                                </span>
                              </div>
                              <ul
                                role="list"
                                className="mb-8 space-y-2.5 text-left text-sm lg:text-base"
                              >
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Validity:{" "}
                                    <span className="font-semibold">
                                      1 Year
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Max size:{" "}
                                    <span className="font-semibold">
                                      4 Entries
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <X
                                    className="text-lightdanger-border dark:text-red-500"
                                    size={16}
                                  />
                                  <span>
                                    Access to{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Themes
                                    </span>{" "}
                                    and{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Fonts
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <X
                                    className="text-lightdanger-border dark:text-red-500"
                                    size={16}
                                  />
                                  <span>
                                    Intergrate{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Revenue
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <X
                                    className="text-lightdanger-border dark:text-red-500"
                                    size={16}
                                  />
                                  <span>
                                    Access to{" "}
                                    <span className="font-semibold cursor-pointer line-through">
                                      Analytics
                                    </span>
                                  </span>
                                </li>
                              </ul>
                              <CheckoutButton
                                user={user}
                                priceId="pri_01jmkcm4qxqbkgxwgxwn818nd7"
                              />
                            </div>
                          </div>
                          <div className="relative flex justify-center scale-100">
                            <div className="cursor-pointer absolute top-[-15px] left-1/2 transform -translate-x-1/2">
                              <p className="text-sm flex gap-1 rounded-full font-semibold animate-shine items-center justify-center border border-gray-600 bg-[linear-gradient(110deg,#ffc2b3,45%,#ff9980,55%,#ffc2b3)] dark:bg-[linear-gradient(110deg,#131313,45%,#474747,55%,#131313)] bg-[length:200%_100%] px-3 py-1 text-lightprimary-text dark:text-primary-text transition-colors">
                                Popular{" "}
                                <TrendingUp
                                  size={15}
                                  className="text-lightprimary-text dark:text-primary-text"
                                />
                              </p>
                            </div>
                            <div className="flex flex-col p-6 mx-auto w-full bg-lightprimary-lighter dark:bg-primary-lighter max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                              <h3 className="mb-1 text-2xl font-semibold">
                                LF Elite ✨
                              </h3>
                              <p className="font-light sm:text-lg text-lightprimary-text/80 dark:text-primary-text/80">
                                (Billed yearly)
                              </p>
                              <div className="flex justify-center items-baseline my-6">
                                <span className="mr-2 text-2xl lg:text-3xl font-extrabold">
                                  ₹100
                                </span>
                                <span className="text-lightprimary-text/80 dark:text-primary-text/80">
                                  /month
                                </span>
                              </div>
                              <ul
                                role="list"
                                className="mb-8 space-y-2.5 text-left text-sm lg:text-base"
                              >
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Validity:{" "}
                                    <span className="font-semibold">
                                      1 Year
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Max size:{" "}
                                    <span className="font-semibold">
                                      6 Entries
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Access to{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="color_pallete"
                                    >
                                      12 Themes
                                    </span>{" "}
                                    and{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="font_image"
                                    >
                                      6 Fonts
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Integrate{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="revn_place"
                                    >
                                      Revenue
                                    </span>{" "}
                                    <span className="italic">
                                      (build trust)
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Access to{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="analytics_image"
                                    >
                                      Analytics
                                    </span>
                                  </span>
                                </li>
                              </ul>
                              <CheckoutButton
                                user={user}
                                priceId="pri_01jmkctc6nq4ny9k59ye4p5ndz"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="max-w-7xl px-2.5 flex flex-col  items-center justify-center mx-auto">
                  <div className="bg-lightprimary-bg dark:bg-primary-bg">
                    <div>
                      <div className="py-8 px-4 mx-auto max-w-screen-xl">
                        <div className="space-y-8 flex flex-col lg:flex-row sm:gap-6 xl:gap-10 lg:space-y-0">
                          <div className="relative flex justify-center lg:scale-100">
                            <div className="cursor-pointer absolute top-[-15px] left-1/2 transform -translate-x-1/2">
                              <p className="text-sm flex gap-1 rounded-full font-semibold animate-shine items-center justify-center border border-gray-600 bg-[linear-gradient(110deg,#ffc2b3,45%,#ff9980,55%,#ffc2b3)] dark:bg-[linear-gradient(110deg,#131313,45%,#474747,55%,#131313)] bg-[length:200%_100%] px-3 py-1 text-lightprimary-text dark:text-primary-text transition-colors">
                                Best Value{" "}
                                <HandCoins
                                  size={15}
                                  className="text-lightprimary-text dark:text-primary-text"
                                />
                              </p>
                            </div>
                            <div className="flex flex-col p-6 mx-auto w-full bg-lightprimary-lighter dark:bg-primary-lighter max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                              <h3 className="mb-1 text-2xl font-semibold">
                                LF Elite ✨
                              </h3>
                              <p className="text-lightprimary-text/80 dark:text-primary-text/80">
                                (Buy once keep it forever)
                              </p>
                              <div className="flex justify-center items-baseline my-6">
                                <span className="mr-2 text-2xl lg:text-3xl font-extrabold">
                                  ₹2500
                                </span>
                              </div>
                              <ul
                                role="list"
                                className="mb-8 space-y-2.5 text-left text-sm lg:text-base"
                              >
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Validity:{" "}
                                    <span className="font-semibold">
                                      Lifetime
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Max size:{" "}
                                    <span className="font-semibold">
                                      10 Entries
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Access to{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="color_pallete"
                                    >
                                      12 Themes
                                    </span>{" "}
                                    and{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="font_image"
                                    >
                                      6 Fonts
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Integrate{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="revn_place"
                                    >
                                      Revenue
                                    </span>{" "}
                                    <span className="italic">
                                      (build trust)
                                    </span>
                                  </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span>
                                    Access to{" "}
                                    <span
                                      className="font-semibold interactable cursor-pointer underline underline-offset-2"
                                      data-type="analytics_image"
                                    >
                                      Analytics
                                    </span>
                                  </span>
                                </li>
                              </ul>
                              <CheckoutButton
                                user={user}
                                priceId="pri_01jmkcvr46znza92js4kamddvk"
                                buttonText="Purchase"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutButton = ({
  priceId,
  user,
  buttonText,
}: {
  priceId: string;
  user: User | null;
  buttonText?: string;
}) => {
  const router = useRouter();
  const handleCheckout = async ({ priceId }: { priceId: string }) => {
    router.push(`/subscribe/${priceId}`);
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      {!user ? (
        <Link
          href="/login?next=/#pricing"
          className="text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Get started
        </Link>
      ) : (
        <button
          onClick={() => {
            setLoading(true);
            handleCheckout({
              priceId: priceId,
            });
          }}
          data-active={loading}
          className="cursor-pointer h-[45px] data-[active=true]:opacity-60 flex items-center justify-center text-lightprimary-text bg-lightaccent-bg border-lightaccent-border data-[active=false]:hover:bg-lightaccent-selection data-[active=false]:hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border data-[active=false]:dark:hover:bg-accent-selection data-[active=false]:dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-normal rounded-lg px-5 py-2.5 text-center"
        >
          {loading && <Loader size={15} className="mr-1 animate-spin" />}
          {buttonText ? `${buttonText}` : "Subscribe"}
        </button>
      )}
    </>
  );
};

export default Upgrade;
