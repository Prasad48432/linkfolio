import { FlagIcon } from "lucide-react";
import React from "react";
import Image from "next/image";
import { IoIosArrowDropright, IoIosArrowRoundForward } from "react-icons/io";

const NotFound = () => {
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
              href="/register?username=123"
              className="font-semibold text-lightaccent-text dark:text-accent-text underline underline-offset-1"
            >
              pasupathi
            </a>{" "}
            is still available{" "}
          </p>
          <a
            href="/register?username=123"
            className="flex cursor-pointer transition-all duration-200 ease-out rounded-lg gap-2 items-center justify-center bg-lightsecondary-bg border border-lightsecondary-border hover:bg-lightsecondary-selection hover:border-lightsecondary-strongerborder dark:border-secondary-border dark:bg-secondary-bg dark:hover:bg-secondary-selection dark:hover:border-secondary-strongerborder px-2 py-1"
          >
            Reserve now <IoIosArrowRoundForward size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
