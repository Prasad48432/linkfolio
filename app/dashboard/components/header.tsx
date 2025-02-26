"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { Loader, Menu, MoveUpRight, X } from "lucide-react";
import LogoutConfirmation from "@/components/logoutconfirmation";
import { motion } from "motion/react";
import Image from "next/image";
import { useNavbar } from "@/context/navbarcontext";
import { useProfile } from "@/context/profielcontext";

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

const Header = ({ user }: { user: User | null }) => {
  // Explicitly define the state type
  const [logoutModal, setLogoutModal] = useState(false);
  const { isDashboardNavbarOpen, setIsDashboardNavbarOpen } = useNavbar();
  const { subscription, profileData, loading } = useProfile();

  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-lightprimary-bg dark:bg-primary-bg border-b border-lightsecondary-border dark:border-secondary-border">
      <div className="flex h-[60px] items-center justify-between px-4 relative">
        <LogoutConfirmation modal={logoutModal} setModal={setLogoutModal} />
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <Image
              className="w-[124px] h-[24px] block dark:hidden"
              src="/darkheaderlogo.png"
              alt="Header Logo"
              width={124}
              height={24}
              priority
            />

            {/* Dark Mode Image */}
            <Image
              className="w-[124px] h-[24px] hidden dark:block"
              src="/headerlogo.png"
              alt="Header Logo Dark"
              width={124}
              height={24}
              priority
            />
          </Link>
        </div>

        <motion.div
          className="block lg:hidden cursor-pointer text-lightprimary-text dark:text-primary-text"
          onClick={() => {
            setIsDashboardNavbarOpen(!isDashboardNavbarOpen);
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isDashboardNavbarOpen ? 0.7 : 1 }}
          transition={{ duration: 1 }}
        >
          {isDashboardNavbarOpen ? (
            <X className="h-6 w-6" /> // Cross icon
          ) : (
            <Menu className="h-6 w-6" /> // Menu icon
          )}
        </motion.div>

        <div className="hidden md:block">
          <div className="flex items-center gap-2">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-32 h-6 bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                </div>
                <div className="w-28 h-6 bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                </div>
                <div className="w-24 h-6 bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                </div>
                <div className="w-10 h-10 bg-lightsecondary-loader dark:bg-secondary-bg rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                </div>
              </span>
            ) : (
              profileData?.username && (
                <>
                  <a
                    target="_blank"
                    href={`/${profileData?.username}`}
                    className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg  dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                  >
                    <span className="truncate flex items-center justify-center gap-1">
                      {process.env.NEXT_PUBLIC_BASE_URL?.replace(
                        /(^\w+:|^)\/\//,
                        ""
                      )}
                      /{profileData?.username} <MoveUpRight size={14} />
                    </span>
                  </a>
                  <p className="hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border border-lightsecondary-border dark:border-secondary-border text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg  dark:bg-secondary-bg cursor-pointer items-center justify-between text-xs px-2.5 py-1 h-[26px] hidden lg:flex truncate text-ellipsis rounded-md">
                    Subscription:{" "}
                    <span>
                      &nbsp;{getSubscriptionText(profileData?.subscriptions)}
                    </span>
                  </p>
                  <p
                    onClick={() => setLogoutModal(true)}
                    className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightdanger-bg dark:bg-danger-bg hover:bg-lightdanger-selection dark:hover:bg-danger-selection border-lightdanger-border dark:border-danger-border hover:border-lightdanger-strongerborder dark:hover:border-danger-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                  >
                    <span className="truncate">Logout</span>
                  </p>
                  <img
                    className="h-8 md:h-10 w-8 md:w-10 rounded-full"
                    referrerPolicy="no-referrer"
                    src={user?.identities?.[0]?.identity_data?.avatar_url}
                    alt="User Avatar"
                  />
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-[20px] z-30"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#ededed"
    strokeLinecap="round"
    {...props}
  />
);

export default Header;
