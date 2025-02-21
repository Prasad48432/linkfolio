"use client";
import React, { useEffect, useState } from "react";
import { HandCoins, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { createClient } from "@/utils/supabase/client";
import { ToastError } from "./toast";

const Pricing = () => {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    }).then((paddle) => setPaddle(paddle));
  }, []);

  const handleCheckout = async ({ priceId }: { priceId: string }) => {
    if (!paddle) return alert("Paddle not initialized");

    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user?.user?.id) {
      ToastError({ message: "No user Logged in." });
      return;
    }
    // Detect system theme preference
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = prefersDarkMode ? "dark" : "light";

    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customData: {
        user_id: user.user.id, // Pass user ID to Paddle
      },
      customer: {
        email: user?.user?.email || "",
      },
      settings: {
        displayMode: "overlay",
        theme: theme,
        successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto max-w-screen-md text-center">
        <h2 className="mb-1 md:mb-2 text-lg md:text-4xl tracking-tight font-extrabold text-lightprimary-text dark:text-primary-text">
          Build your free Linkfolio page anytime!
        </h2>
        <p className="mb-3 font-light text-base sm:text-xl text-lightprimary-text/70 dark:text-primary-text/70">
          Pay only when you have a something to showcase
        </p>
      </div>
      <TabGroup>
        <TabList className="flex items-center justify-center p-1.5 lg:p-2 gap-1 rounded-full">
          <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightaccent-bg dark:data-[selected]:bg-accent-bg border border-lightsecondary-border dark:border-secondary-border data-[selected]:border-lightaccent-border dark:data-[selected]:border-accent-border data-[hover]:bg-lightsecondary-selection dark:data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-lightaccent-bg/80 dark:data-[selected]:data-[hover]:bg-accent-bg/80">
            Monthly
          </Tab>
          <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightaccent-bg dark:data-[selected]:bg-accent-bg border border-lightsecondary-border dark:border-secondary-border data-[selected]:border-lightaccent-border dark:data-[selected]:border-accent-border data-[hover]:bg-lightsecondary-selection dark:data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-lightaccent-bg/80 dark:data-[selected]:data-[hover]:bg-accent-bg/80">
            Yearly
          </Tab>
          <Tab className="relative transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightaccent-bg dark:data-[selected]:bg-accent-bg border border-lightsecondary-border dark:border-secondary-border data-[selected]:border-lightaccent-border dark:data-[selected]:border-accent-border data-[hover]:bg-lightsecondary-selection dark:data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-lightaccent-bg/80 dark:data-[selected]:data-[hover]:bg-accent-bg/80">
            Lifetime
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="max-w-7xl px-2.5 flex flex-col  items-center justify-center mx-auto">
            <div className="bg-lightprimary-bg dark:bg-primary-bg" id="pricing">
              <div>
                <div className="py-8 px-4 mx-auto max-w-screen-xl">
                  <div className="space-y-8 flex flex-col lg:flex-row sm:gap-6 xl:gap-10 lg:space-y-0">
                    <div className="relative flex justify-center lg:scale-95">
                      <div className="flex flex-col p-4 lg:p-6 mx-auto w-[25rem] max-w-lg text-center text-lightprimary-text dark:text-primary-text bg-darkbg rounded-lg border card-shard shadow">
                        <h3 className="mb-1 text-2xl font-semibold">LF Pro</h3>
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
                        <ul role="list" className="mb-8 space-y-2.5 text-left">
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
                              <span className="font-semibold">1 Month</span>
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
                              <span className="font-semibold">4 Entries</span>
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
                        <p
                          // href="/accounts/signin"
                          onClick={() =>
                            handleCheckout({
                              priceId: "pri_01jmkchaz4z34135mqy9wfbx6w",
                            })
                          }
                          className="text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Get started
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-center lg:scale-100">
                      <div className="cursor-pointer absolute top-[-15px] left-1/2 transform -translate-x-1/2">
                        <p className="flex gap-1 rounded-full font-semibold animate-shine items-center justify-center border border-gray-600 bg-[linear-gradient(110deg,#ffc2b3,45%,#ff9980,55%,#ffc2b3)] dark:bg-[linear-gradient(110deg,#131313,45%,#474747,55%,#131313)] bg-[length:200%_100%] px-3 py-1 text-lightprimary-text dark:text-primary-text transition-colors">
                          Popular{" "}
                          <TrendingUp className="text-lightprimary-text dark:text-primary-text" />
                        </p>
                      </div>
                      <div className="flex flex-col p-6 mx-auto w-[25rem] max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                        <h3 className="mb-1 text-2xl font-semibold">
                          LF Pro Plus
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
                        <ul role="list" className="mb-8 space-y-2.5 text-left">
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
                              <span className="font-semibold">1 Month</span>
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
                              <span className="font-semibold">6 Startups</span>
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
                              <span className="italic">(build trust)</span>
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

                        <p
                          // href="/accounts/signin"
                          onClick={() =>
                            handleCheckout({
                              priceId: "pri_01jmkcrmhx2j7net3w3znnp0yy",
                            })
                          }
                          className="text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Get started
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="max-w-7xl px-2.5 flex flex-col  items-center justify-center mx-auto">
            <div className="bg-lightprimary-bg dark:bg-primary-bg" id="pricing">
              <div>
                <div className="py-8 px-4 mx-auto max-w-screen-xl">
                  <div className="space-y-8 flex flex-col lg:flex-row sm:gap-6 xl:gap-10 lg:space-y-0">
                    <div className="relative flex justify-center lg:scale-95">
                      <div className="flex flex-col p-4 lg:p-6 mx-auto w-[25rem] max-w-lg text-center text-lightprimary-text dark:text-primary-text bg-darkbg rounded-lg border card-shard shadow">
                        <h3 className="mb-1 text-2xl font-semibold">LF Pro</h3>
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
                        <ul role="list" className="mb-8 space-y-2.5 text-left">
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
                              <span className="font-semibold">1 Year</span>
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
                              <span className="font-semibold">4 Entries</span>
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

                        <p
                          // href="/accounts/signin"
                          onClick={() =>
                            handleCheckout({
                              priceId: "pri_01jmkcm4qxqbkgxwgxwn818nd7",
                            })
                          }
                          className="text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Get started
                        </p>
                      </div>
                    </div>
                    <div className="relative flex justify-center lg:scale-100">
                      <div className="cursor-pointer absolute top-[-15px] left-1/2 transform -translate-x-1/2">
                        <p className="flex gap-1 rounded-full font-semibold animate-shine items-center justify-center border border-gray-600 bg-[linear-gradient(110deg,#ffc2b3,45%,#ff9980,55%,#ffc2b3)] dark:bg-[linear-gradient(110deg,#131313,45%,#474747,55%,#131313)] bg-[length:200%_100%] px-3 py-1 text-lightprimary-text dark:text-primary-text transition-colors">
                          Popular{" "}
                          <TrendingUp className="text-lightprimary-text dark:text-primary-text" />
                        </p>
                      </div>
                      <div className="flex flex-col p-6 mx-auto w-[25rem] max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                        <h3 className="mb-1 text-2xl font-semibold">
                          LF Pro Plus
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
                        <ul role="list" className="mb-8 space-y-2.5 text-left">
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
                              <span className="font-semibold">1 Year</span>
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
                              <span className="font-semibold">6 Entries</span>
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
                              <span className="italic">(build trust)</span>
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

                        <p
                          // href="/accounts/signin"
                          onClick={() =>
                            handleCheckout({
                              priceId: "pri_01jmkctc6nq4ny9k59ye4p5ndz",
                            })
                          }
                          className="text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Get started
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="max-w-7xl px-2.5 flex flex-col  items-center justify-center mx-auto">
            <div className="bg-lightprimary-bg dark:bg-primary-bg" id="pricing">
              <div>
                <div className="py-8 px-4 mx-auto max-w-screen-xl">
                  <div className="space-y-8 flex flex-col lg:flex-row sm:gap-6 xl:gap-10 lg:space-y-0">
                    <div className="relative flex justify-center lg:scale-100">
                      <div className="cursor-pointer absolute top-[-15px] left-1/2 transform -translate-x-1/2">
                        <p className="flex gap-1 rounded-full font-semibold animate-shine items-center justify-center border border-gray-600 bg-[linear-gradient(110deg,#ffc2b3,45%,#ff9980,55%,#ffc2b3)] dark:bg-[linear-gradient(110deg,#131313,45%,#474747,55%,#131313)] bg-[length:200%_100%] px-3 py-1 text-lightprimary-text dark:text-primary-text transition-colors">
                          Best Value{" "}
                          <HandCoins className="text-lightprimary-text dark:text-primary-text" />
                        </p>
                      </div>
                      <div className="flex flex-col p-6 mx-auto w-[25rem] max-w-lg text-center text-lightprimary-text dark:text-primary-text rounded-lg border card-shard shadow xl:p-8">
                        <h3 className="mb-1 text-2xl font-semibold">
                          LF Pro Plus
                        </h3>
                        <p className="text-lightprimary-text/80 dark:text-primary-text/80">
                          (Buy once keep it forever)
                        </p>
                        <div className="flex justify-center items-baseline my-6">
                          <span className="mr-2 text-2xl lg:text-3xl font-extrabold">
                            ₹2500
                          </span>
                        </div>
                        <ul role="list" className="mb-8 space-y-2.5 text-left">
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
                              <span className="font-semibold">Lifetime</span>
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
                              <span className="font-semibold">10 Entries</span>
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
                              <span className="italic">(build trust)</span>
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

                        <p
                          // href="/accounts/signin"
                          onClick={() =>
                            handleCheckout({
                              priceId: "pri_01jmkcvr46znza92js4kamddvk",
                            })
                          }
                          className="text-lightprimary-text bg-lightaccent-bg border-lightaccent-border hover:bg-lightaccent-selection hover:border-lightaccent-strongerborder dark:text-primary-text dark:bg-accent-bg border dark:border-accent-border dark:hover:bg-accent-selection dark:hover:border-accent-strongerborder transition-all duration-150 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Get started
                        </p>
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
  );
};

export default Pricing;
