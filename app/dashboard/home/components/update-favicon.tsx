import React from "react";
import Image from "next/image";
import { Info, Pencil } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const UpdateFavicon = ({
  fetchLoading,
  image,
  handleFaviconChange,
}: {
  fetchLoading: boolean;
  image: string;
  handleFaviconChange: any;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="mb-0.5 text-base lg:text-lg font-bold text-lightprimary-text/80 dark:text-primary-text/80 flex items-center justify-start">
        Favicon Update
        <HoverCard openDelay={250}>
          <HoverCardTrigger className="text-sm font-medium text-lightprimary-text dark:text-primary-text cursor-pointer">
            <Info strokeWidth={1} size={16} className="ml-1" />
          </HoverCardTrigger>
          <HoverCardContent className="bg-lightprimary-bg dark:bg-primary-bg border border-lightsecondary-border dark:border-secondary-border rounded-md z-50">
            <div className="flex flex-col p-2">
              <p className="text-sm font-semibold text-lightprimary-text/80 dark:text-primary-text/80">Recommended Favicon</p>
              <ol className="text-xs text-lightprimary-text/70 dark:text-primary-text/70 mt-2 list-decimal list-inside font-normal">
                <li>
                  Accepted file types
                  <a className="text-lightaccent-text dark:text-accent-text font-medium ml-1">.ico</a>
                </li>
                <li>
                  Keep your favicon
                  <a className="text-lightaccent-text dark:text-accent-text font-medium ml-1">Simple</a>
                </li>
                <li>
                  Max file size{" "}
                  <b className="text-lightaccent-text dark:text-accent-text font-medium">3 MB</b>
                </li>
              </ol>
            </div>
          </HoverCardContent>
        </HoverCard>
      </h2>
      <p className="text-xs lg:text-sm  text-lightprimary-text/60 dark:text-primary-text/60 mb-5">
        Update the publicly visible custom favicon
      </p>
      <div className="relative inline-flex group items-center justify-center">
        {fetchLoading ? (
          <div
            className={`animate-pulse bg-gray-600 rounded-full w-[6rem] h-[6rem]`}
          />
        ) : (
          <Image
            alt="User profile"
            width={600}
            height={600}
            src={image || "/lf.png"}
            className="w-[4rem] lg:w-[6rem] h-[4rem] lg:h-[6rem] rounded-full ring-2 ring-lightsecondary-border dark:ring-secondary-border p-1 inline-block object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <button
          onClick={() => {
            document.getElementById("faviconInput")?.click();
          }}
          type="submit"
          className="ml-5 sm:hidden flex items-center justify-center  py-0.5 px-1.5 border text-sm rounded lg:rounded-md bg-lightsecondary-bg dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder text-lightprimary-text dark:text-primary-text cursor-pointer transition-all duration-200 ease-out"
        >
          <Pencil className="mr-1" strokeWidth={1} size={13} />
          edit
        </button>
        {/* desktop button */}
        <div className="absolute inset-0 z-20 justify-center items-center rounded-full bg-transparent group-hover:bg-lightsecondary-bg/30 dark:group-hover:bg-secondary-bg/30 duration-200 cursor-pointer hidden sm:flex">
          <button
            onClick={() => document.getElementById("faviconInput")?.click()}
            className="btn btn-square btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              className="w-5 h-5 block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              ></path>
            </svg>
          </button>
        </div>
        <input
          type="file"
          name="picture"
          id="faviconInput"
          onChange={handleFaviconChange}
          accept=".ico"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UpdateFavicon;
