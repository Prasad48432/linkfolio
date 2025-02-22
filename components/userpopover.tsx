"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { BiLinkExternal } from "react-icons/bi";
import { LuCalendarSync } from "react-icons/lu";
import { LogOut } from "lucide-react";

type Subscription = {
  subscription_status: boolean;
  subscription_type: string;
};

type Profile = {
  id: string; // Assuming UUID
  full_name: string;
  email: string;
  username: string;
  // Add other profile fields here
  subscriptions?: Subscription[]; // Can be empty if no subscription
};

function getSubscriptionText(subscriptions: Subscription[] | undefined) {
  if (subscriptions?.[0]?.subscription_type === "LF Elite") {
    return "Elite ✨";
  } else if (subscriptions?.[0]?.subscription_type === "LF Core") {
    return "Core ⚡";
  } else {
    return "Basic 🪶";
  }
}

const UserPopover = ({
  user,
  profileData,
  setLogoutModal,
}: {
  user: User | null;
  profileData: Profile | null;
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="h-8 md:h-10 w-8 md:w-10 relative cursor-pointer">
          <Image
            width={200}
            height={200}
            className="bg-accent-bg/20 h-full w-full rounded-full object-cover"
            referrerPolicy="no-referrer"
            src={user?.identities?.[0]?.identity_data?.avatar_url}
            alt="User Profile"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit max-w-60 mr-1 lg:mr-3 mt-4 lg:mt-3 bg-lightprimary-bg dark:bg-primary-bg border border-lightsecondary-border dark:border-secondary-border">
        <div className="flex flex-col items-center justify-center p-3 gap-2">
          <div className="relative h-16 w-16 md:h-20 md:w-20 mx-auto p-1">
            {/* User Profile Image */}
            <Image
              width={200}
              height={200}
              className="bg-lightprimary-bg dark:bg-primary-bg p-2.5 z-20 border border-lightsecondary-border/20 dark:border-secondary-border h-full w-full rounded-full object-cover"
              referrerPolicy="no-referrer"
              src={user?.identities?.[0]?.identity_data?.avatar_url}
              alt="User Profile"
            />

            {/* Circular Badge with Curved Text */}
            <svg
              className="absolute inset-0 h-full w-full z-30"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="curve"
                  d="M 10,50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                />
              </defs>
              <text
                fill={
                  profileData?.subscriptions?.[0]?.subscription_type ===
                  "LF Elite"
                    ? "gold"
                    : profileData?.subscriptions?.[0]?.subscription_type ===
                      "LF Core"
                    ? "orange"
                    : "#ff8000"
                }
                fontSize="15"
                fontWeight="bold"
              >
                <textPath
                  xlinkHref="#curve"
                  startOffset="35%"
                  textAnchor="middle"
                >
                  {getSubscriptionText(profileData?.subscriptions)}
                </textPath>
              </text>
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center border-b pb-4">
            <p className="text-lightprimary-text font-medium dark:text-primary-text">
              {profileData?.full_name}
            </p>
            <p className="text-lightprimary-text font-light text-sm dark:text-primary-text">
              {profileData?.email}
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2 w-full">
            {profileData?.username !== "" && (
              <a
                target="_blank"
                href={`/${profileData?.username}`}
                className="flex items-center justify-between cursor-pointer px-2 py-1 text-sm bg-lightsecondary-selection dark:bg-secondary-bg rounded-md"
              >
                <span className="max-w-36 truncate text-ellipsis">
                  /{profileData?.username}
                </span>
                <BiLinkExternal size={15} />
              </a>
            )}
            {profileData?.username === "" && (
              <a
                target="_blank"
                href={`/dashboard/home`}
                className="items-center text-lightdanger-selection dark:text-red-500 justify-between cursor-pointer px-2 py-1 text-sm bg-lightsecondary-selection dark:bg-secondary-bg rounded-md"
              >
                Claim username !
              </a>
            )}
            <p className="cursor-pointer px-2 py-1 flex items-center justify-between text-sm max-w-48 truncate text-ellipsis rounded-md">
              Subscription :{" "}
              <span>{getSubscriptionText(profileData?.subscriptions)}</span>
            </p>
            {profileData?.subscriptions?.length !== 0 && (
              <a
                target="_blank"
                href="https://sandbox-customer-portal.paddle.com/cpl_01jmhnmcmbf4nbf23p5k1j6r4x"
                className="cursor-pointer px-2 py-1 gap-2 flex items-center justify-between text-sm max-w-48 truncate text-ellipsis rounded-md"
              >
                Manage Subscription <LuCalendarSync size={15} />
              </a>
            )}
            <p
              onClick={() => {
                setLogoutModal(true);
                setOpen(false);
              }}
              className="font-light cursor-pointer bg-lightdanger-bg/80 dark:bg-danger-bg/80 hover:bg-lightdanger-bg transition-all duration-200 dark:hover:bg-danger-bg px-2 py-1 gap-2 flex items-center justify-between text-sm max-w-48 truncate text-ellipsis rounded-md"
            >
              Logout <LogOut size={15} />
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
