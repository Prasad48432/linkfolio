"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, User2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { SiLinkedin } from "react-icons/si";
import { CiEdit } from "react-icons/ci";

const Onboarding = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const [selectedOption, setSelectedOption] = useState("none");

  return (
    <div className="w-full bg-lightprimary-bg dark:bg-primary-bg min-h-screen">
      <div className="bg-lightprimary-bg dark:bg-primary-bg max-w-4xl sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-20 xl:px-20 pt-8 pb-10 md:pt-16">
        <div className={"flex gap-4 items-center justify-between"}>
          <div className="flex gap-4 items-center justify-start">
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
          <button className="underline underline-offset-2 text-lightprimary-text dark:text-primary-text">
            Skip Onboarding
          </button>
        </div>

        <div className="mt-12 px-12 flex flex-col p-3">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="flex flex-col items-start justify-center"
          >
            <motion.h1
              variants={textVariants}
              className="text-3xl font-bold text-lightprimary-text dark:text-primary-text"
            >
              <span className="wave">👋</span> Welcome to LinkFolio!
            </motion.h1>
            <motion.p
              variants={textVariants}
              className="text-xl font-medium text-lightprimary-text/70 dark:text-primary-text/70 px-4 mt-2"
            >
              Your journey to showcasing your work starts here!
            </motion.p>
            <motion.div
              variants={textVariants}
              className="px-4 mt-12 flex gap-4 flex-col w-full"
            >
              <motion.p
                variants={textVariants}
                className="text-xl font-medium text-lightprimary-text dark:text-primary-text mb-4"
              >
                Let's make your profile setup quick & easy.
              </motion.p>
              <div className="flex flex-col gap-4 items-start justify-center mb-8">
                <p className="text-lg font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-1">
                  Select an option
                </p>
                <div className="flex gap-4 items-center justify-center">
                  <span
                    data-active={selectedOption === "scratch"}
                    onClick={() => setSelectedOption("scratch")}
                    className="text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg dark:bg-secondary-bg data-[active=true]:bg-secondary-selection data-[active=true]:dark:bg-primary-text data-[active=true]:text-lightprimary-bg data-[active=true]:dark:text-primary-bg flex transition-all cursor-pointer duration-200 ease-out gap-2 items-center justify-center text-lg font-medium px-3 py-2 rounded-lg border-lightsecondary-border dark:border-secondary-border border data-[active=false]:hover:border-lightsecondary-strongerborder data-[active=false]:dark:hover:border-secondary-strongerborder data-[active=false]:hover:bg-lightsecondary-selection data-[active=false]:dark:hover:bg-secondary-selection"
                  >
                    Start from scratch
                    <CiEdit />
                  </span>
                  <span 
                    data-active={selectedOption === "linkedin"}
                    onClick={() => setSelectedOption("linkedin")}
                    className="text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg dark:bg-secondary-bg data-[active=true]:bg-secondary-selection data-[active=true]:dark:bg-primary-text data-[active=true]:text-lightprimary-bg data-[active=true]:dark:text-primary-bg flex transition-all cursor-pointer duration-200 ease-out gap-2 items-center justify-center text-lg font-medium px-3 py-2 rounded-lg border-lightsecondary-border dark:border-secondary-border border data-[active=false]:hover:border-lightsecondary-strongerborder data-[active=false]:dark:hover:border-secondary-strongerborder data-[active=false]:hover:bg-lightsecondary-selection data-[active=false]:dark:hover:bg-secondary-selection"
                  >
                    Import form Linkedin
                    <SiLinkedin />
                  </span>
                </div>
              </div>
              {selectedOption === "scratch" && (
                <motion.div variants={textVariants} className="w-full">
                  <label className="block text-lg font-medium text-primary-text/80 px-1 mb-1">
                    Enter your name
                  </label>
                  <div className="relative">
                    <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                      <User2
                        strokeWidth={1}
                        size={25}
                        className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                      />
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={""}
                      onChange={(e) => {}}
                      className="text-lightprimary-text dark:text-primary-text border-lightsecondary-border dark:border-secondary-border focus:border-lightsecondary-strongerborder dark:focus:border-secondary-strongerborder w-full pl-10 pr-4 py-3 bg-lisecondary-bg dark:bg-secondary-bg border focus:outline-none rounded-lg mt-1"
                    />
                  </div>
                </motion.div>
              )}
              {selectedOption === "linkedin" && (
                <motion.div variants={textVariants} className="w-full">
                  <label className="block text-lg font-medium text-primary-text/80 px-1 mb-1">
                    Enter your Linkedin profile url
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center">
                      <SiLinkedin
                        size={25}
                        className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                      />
                    </span>
                    <input
                      type="text"
                      name="linkedin_url"
                      placeholder="Enter your linkedin url"
                      value={""}
                      onChange={(e) => {}}
                      className="text-lightprimary-text dark:text-primary-text border-lightsecondary-border dark:border-secondary-border focus:border-lightsecondary-strongerborder dark:focus:border-secondary-strongerborder w-full pl-12 pr-4 py-3 bg-lisecondary-bg dark:bg-secondary-bg border focus:outline-none rounded-lg mt-1"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
