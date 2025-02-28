"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuShare } from "react-icons/lu";
import { SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { ToastError } from "@/components/toast";

const handleShare = ({ text, url }: { text: string; url: string }) => {
  if (navigator.share) {
    navigator.share({
      text: text,
      url: url,
    });
  } else {
    ToastError({ message: "Not Supported" });
  }
};

const SharerComponent = ({ blog }: { blog: any }) => {
  return (
    <>
      <button
        onClick={() =>
          handleShare({
            text: blog.title,
            url: `https://linkfolio-dev.vercel.app/blog/${blog.id}`,
          })
        }
        className="flex lg:hidden items-center justify-center text-sm lg:text-base font-extralight cursor-pointer text-lightprimary-text dark:text-primary-text/80"
      >
        <LuShare strokeWidth={1} className="mr-1 text-xl" />
        Share
      </button>
      <Popover>
        <PopoverTrigger className="hidden lg:flex items-center justify-center text-sm lg:text-base font-extralight cursor-pointer text-lightprimary-text dark:text-primary-text/80">
          <LuShare strokeWidth={1} className="mr-1 text-xl" />
          Share
        </PopoverTrigger>
        <PopoverContent className="z-10 relative my-2 w-48 p-4 bg-lightsecondary-selection border-lightsecondary-border dark:bg-secondary-bg border dark:border-secondary-border">
          <div className="absolute z-0 -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-lightsecondary-selection dark:bg-secondary-bg border-t border-l border-lightsecondary-border dark:border-secondary-border" />

          <div className="relative text-lightprimary-text dark:text-primary-text z-10 flex flex-col gap-3 items-center justify-center w-full">
            <a
              target="_blank"
              href={`https://www.linkedin.com/sharing/share-offsite/?text=${blog.title}%0Ahttps://linkfolio-dev.vercel.app/blog/${blog.id}`}
              className="cursor-pointer flex items-center justify-start w-full gap-2 text-sm font-light"
            >
              <SiLinkedin />
              Share on Linkedin
            </a>
            <a
              target="_blank"
              href={`http://x.com/share?text=${blog.title}%0A&url=https://linkfolio-dev.vercel.app/blog/${blog.id}`}
              className="cursor-pointer flex items-center justify-start w-full gap-2 text-sm font-light"
            >
              <SiX />
              Share on X
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=https://linkfolio-dev.vercel.app/blog/${blog.id}`}
              className="cursor-pointer flex items-center justify-start w-full gap-2 text-sm font-light"
            >
              <SiFacebook />
              Share on Facebook
            </a>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SharerComponent;
