"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Loader, Menu, MoveUpRight, X } from "lucide-react";
import LogoutConfiramtion from "./logout-confirmation";
import { Cycle, motion } from "motion/react";
import { ToastError, ToastSuccess } from "@/components/toast";

type Profile = {
  bio: string | null;
  username: string | null;
};

const Header = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: Cycle;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); // Explicitly define the state type
  const [loading, setLoading] = useState(true);
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Fetch session and set user
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data.session) {
          setUser(data.session.user);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      const supabase = createClient();

      // Fetch initial profile data
      supabase
        .from("profiles")
        .select("bio, username")
        .eq("id", user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching profile:", error.message);
          } else {
            setProfile(data);
            setLoading(false);
          }
        });
    }
  }, [user]);

  return (
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-lightprimary-bg dark:bg-primary-bg border-b border-lightsecondary-border dark:border-secondary-border">
      <div className="flex h-[60px] items-center justify-between px-4 relative">
        <LogoutConfiramtion modal={logoutModal} setModal={setLogoutModal} />
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <img className="w-[124px] h-[24px]" src="/headerlogo.png" />
          </Link>
        </div>

        <motion.div
          className="block lg:hidden cursor-pointer text-lightprimary-text dark:text-primary-text"
          onClick={() => {
            loading ? null : toggleOpen();
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isOpen ? 0.7 : 1 }}
          transition={{ duration: 1 }}
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : isOpen ? (
            <X className="h-6 w-6" /> // Cross icon
          ) : (
            <Menu className="h-6 w-6" /> // Menu icon
          )}
        </motion.div>

        <div className="hidden md:block">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-32 h-6 bg-lightsecondary-loader dark:bg-secondary-bg rounded-lg relative overflow-hidden">
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
            <div className="flex items-center gap-2">
              {profile?.username && (
                <a
                  target="_blank"
                  href={`/${profile?.username}`}
                  className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg  dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                >
                  <span className="truncate flex items-center justify-center gap-1">
                    {process.env.NEXT_PUBLIC_BASE_URL?.replace(
                      /(^\w+:|^)\/\//,
                      ""
                    )}
                    /{profile?.username} <MoveUpRight size={14} />
                  </span>
                </a>
              )}
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
            </div>
          )}
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
