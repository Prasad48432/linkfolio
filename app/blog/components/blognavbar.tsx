"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { Loader, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { ToastError, ToastSuccess } from "@/components/toast";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import LogoutConfirmation from "@/components/logoutconfirmation";

const BlogNavbar = () => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [logoutModel, setLogoutModel] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUser(data.session?.user || null);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      <LogoutConfirmation modal={logoutModel} setModal={setLogoutModel} />
      <div
        id="topdiv"
        className="sticky top-0 transform z-40 bg-lightprimary-bg dark:bg-primary-bg/90"
      >
        <div className="absolute inset-0 h-full w-full bg-lightprimary-bg/70 dark:bg-primary-bg/90 !opacity-100 transition-opacity"></div>
        <nav className="border-b relative z-40 border-lightsecondary-border dark:border-secondary-border backdrop-blur-sm transition-opacity dark:shadow-lg dark:shadow-primary-bg/80">
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              <div id="bottomdiv" className="flex items-center">
                <div className="flex items-center flex-shrink-0 lg:mr-4">
                  <a
                    className="flex gap-0.5 items-center justify-center w-auto focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm"
                    type="button"
                    id="radix-:Rlcna6:"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                    href="/"
                  >
                    <Image
                      className="w-[116.1px] h-[22.45px] block dark:hidden"
                      src="/darkheaderlogo.png"
                      alt="Header Logo"
                      width={116.1}
                      height={22.45}
                      priority
                    />
                    <Image
                      className="w-[52.8px] h-[29.634px] -ml-2 mt-[5px] block dark:hidden"
                      src="/blogdark.png"
                      alt="Header Logo"
                      width={52.8}
                      height={29.634}
                      priority
                    />
                    <Image
                      className="w-[116.1px] h-[22.45px] hidden dark:block"
                      src="/headerlogo.png"
                      alt="Header Logo"
                      width={116.1}
                      height={22.45}
                      priority
                    />
                    <Image
                      className="w-[52.8px] h-[29.634px] -ml-2 mt-[5px] hidden dark:block"
                      src="/blog.png"
                      alt="Header Logo"
                      width={52.8}
                      height={29.634}
                      priority
                    />
                  </a>
                </div>
                <nav
                  aria-label="Main"
                  data-orientation="horizontal"
                  dir="ltr"
                  className="relative z-10 flex-1 items-center justify-center hidden pl-8 sm:space-x-4 lg:flex h-16"
                >
                  <div style={{ position: "relative" }}>
                    <ul
                      data-orientation="horizontal"
                      className="group flex flex-1 list-none items-center justify-center space-x-1"
                      dir="ltr"
                    >
                      <li className="text-sm font-medium">
                        <a
                          className="group/menu-item flex items-center text-sm hover:text-lightaccent-selection dark:hover:text-accent-text select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-text-lighter group-hover:bg-transparent text-accent-text focus-visible:text-accent-text"
                          data-radix-collection-item=""
                          href="/pricing"
                        >
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                              <p className="leading-snug text-lightprimary-text dark:text-primary-text group-hover/menu-item:text-lightaccent-selection dark:group-hover/menu-item:text-accent-text">
                                Pricing
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="text-sm font-medium">
                        <a
                          className="group/menu-item flex items-center text-sm hover:text-lightaccent-selection dark:hover:text-accent-text  select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-text-lighter group-hover:bg-transparent text-accent-text focus-visible:text-accent-text"
                          data-radix-collection-item=""
                          href="/docs"
                        >
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                              <p className="leading-snug text-lightprimary-text dark:text-primary-text group-hover/menu-item:text-lightaccent-selection dark:group-hover/menu-item:text-accent-text">
                                Docs
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="text-sm font-medium">
                        <a
                          className="group/menu-item flex items-center text-sm hover:text-lightaccent-selection dark:hover:text-accent-text select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-accent-text focus-visible:text-accent-text"
                          data-radix-collection-item=""
                          href="/blog"
                        >
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                              <p className="leading-snug text-lightprimary-text dark:text-primary-text group-hover/menu-item:text-lightaccent-selection dark:group-hover/menu-item:text-accent-text">
                                Blogs
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="absolute left-0 top-full flex justify-center" />
                </nav>
              </div>
              <div className="flex items-center gap-2 select-none">
                {loading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin text-lightprimary-text dark:text-primary-text" />
                ) : !user ? (
                  <>
                    <a
                      data-size="tiny"
                      type="button"
                      className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg  dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                      href="/login"
                    >
                      <span className="truncate">Login</span>
                    </a>
                    <Link
                      href="/register?next=/dashboard/home"
                      className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightaccent-bg dark:bg-accent-bg hover:bg-lightaccent-selection dark:hover:bg-accent-selection border-lightaccent-border dark:border-accent-border hover:border-lightaccent-strongerborder dark:hover:hover:border-accent-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                    >
                      <span className="truncate">Create your page</span>
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <a
                      data-size="tiny"
                      type="button"
                      className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightaccent-bg dark:bg-accent-bg hover:bg-lightaccent-selection dark:hover:bg-accent-selection border-lightaccent-border dark:border-accent-border hover:border-lightaccent-strongerborder dark:hover:hover:border-accent-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                      href="/dashboard/home"
                    >
                      <span className="truncate">Dashboard</span>
                    </a>
                    <p
                      onClick={() => setLogoutModel(true)}
                      className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightdanger-bg dark:bg-danger-bg hover:bg-lightdanger-selection dark:hover:bg-danger-selection border-lightdanger-border dark:border-danger-border hover:border-lightdanger-strongerborder dark:hover:border-danger-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                    >
                      <span className="truncate">Logout</span>
                    </p>
                    <Image
                      width={200}
                      height={200}
                      className="bg-accent-bg/20 h-8 md:h-10 w-8 md:w-10 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      src={user?.identities?.[0]?.identity_data?.avatar_url}
                      alt="User Profile"
                    />
                  </div>
                )}
                <motion.div
                  className="block lg:hidden cursor-pointer text-primary-text"
                  onClick={() => {
                    setIsNavbarOpen(!isNavbarOpen);
                  }}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: isNavbarOpen ? 0.7 : 1 }}
                  transition={{ duration: 1 }}
                >
                  {isNavbarOpen ? (
                    <X className="h-6 w-6" /> // Cross icon
                  ) : (
                    <Menu className="h-6 w-6" /> // Menu icon
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default BlogNavbar;
