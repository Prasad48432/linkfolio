"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/app/dashboard/utils/usescroll";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import {MoveUpRight } from "lucide-react";
import { logout } from "../action";
import { toast } from "sonner";

type Profile = {
  bio: string | null;
  username: string | null;
};

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); // Explicitly define the state type
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.success) {
        toast.success("Logout successful!", {
          duration: 1500,
          style: {
            background: "#1a1a1a",
            color: "#89e15a",
            border: "1px solid #363636",
          },
        });

        router.push("/login");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

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
    <div className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-primary-bg border-b border-secondary-border">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <img className="w-[124px] h-[24px]" src="/headerlogo.png" />
          </Link>
        </div>

        <div className="hidden md:block">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-24 rounded-md bg-secondary-bg animate-pulse" />
              <span className="h-4 w-16 rounded-md bg-secondary-bg animate-pulse" />
              <span className="h-10 w-10 rounded-full bg-secondary-bg animate-pulse" />
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <a
                target="_blank"
                href={`/${profile?.username}`}
                className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-primary-text bg-secondary-bg hover:bg-secondary-selection border-secondary-border hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
              >
                <span className="truncate flex items-center justify-center gap-1">
                  {process.env.NEXT_PUBLIC_BASE_URL?.replace(
                    /(^\w+:|^)\/\//,
                    ""
                  )}
                  /{profile?.username} <MoveUpRight size={14} />
                </span>
              </a>
              <p
                onClick={() => handleLogout()}
                className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-primary-text bg-danger-bg hover:bg-danger-selection border-danger-border hover:border-danger-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
              >
                <span className="truncate">Logout</span>
              </p>
              <img
                className="bg-accent-bg/20 h-8 md:h-10 w-8 md:w-10 rounded-full"
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

export default Header;
