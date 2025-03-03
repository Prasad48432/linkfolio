"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "motion/react";
import { PiRocketLaunch, PiCubeLight } from "react-icons/pi";
import { BiLink } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { User } from "@supabase/supabase-js";
import { ChevronDown, Loader } from "lucide-react";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/app/hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import type { Database } from "@/types/supabasetypes";
import UserPopover from "./userpopover";
import LogoutConfirmation from "./logoutconfirmation";
import { useNavbar } from "@/context/navbarcontext";
import { LuScrollText } from "react-icons/lu";

type blog = Database["public"]["Tables"]["blogs"]["Row"];

type Subscription = {
  subscription_status: boolean;
  subscription_type: string;
};

type Profile = {
  id: string; // Assuming UUID
  full_name: string;
  email: string;
  username: string;
  subscriptions?: Subscription[]; // Can be empty if no subscription
};

const staggerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const navItems = [
  { id: 1, label: "Pricing", href: "/pricing" },
  { id: 2, label: "Docs", href: "/docs" },
  { id: 3, label: "Blogs", href: "/blog" },
];

const Navbar = ({
  user,
  profileData,
  blogs,
}: {
  user: User | null;
  profileData: any | null;
  blogs: any[] | null;
}) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const size = useWindowSize();
  const { isNavbarOpen, setIsNavbarOpen } = useNavbar();
  const [isDropdown1Open, setDropdown1Open] = useState(false);
  const [isDropdown2Open, setDropdown2Open] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState("");

  useEffect(() => {
    const topDiv = document.getElementById("topdiv");
    const bottomDiv = document.getElementById("bottomdiv");

    bottomDiv?.addEventListener("mouseenter", () => {
      topDiv?.classList.remove("z-40");
      topDiv?.classList.add("z-[42]");
    });

    bottomDiv?.addEventListener("mouseleave", () => {
      topDiv?.classList.remove("z-[42]");
      topDiv?.classList.add("z-40");
    });
  }, []);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const navbarBackground = isNavbarOpen
      ? prefersDarkMode
        ? "#121212"
        : "#eeeae3"
      : "transparent";

    setNavbarBackground(navbarBackground);
  }, [isNavbarOpen]);

  useEffect(() => {
    const topDiv = document.getElementById("topdiv");

    if (window.innerWidth < 600) {
      if (isNavbarOpen) {
        topDiv?.classList.add("z-[42]");
      }
      if (!isNavbarOpen) {
        topDiv?.classList.remove("z-[42]");
      }
    }
  }, [isNavbarOpen]);

  return (
    <>
      <LogoutConfirmation modal={logoutModal} setModal={setLogoutModal} />
      <div
        id="topdiv"
        className="sticky top-0 transform z-40 bg-lightprimary-bg dark:bg-primary-bg/90"
      >
        <div className="absolute inset-0 h-full w-full bg-lightprimary-bg/70 dark:bg-primary-bg/90 !opacity-100 transition-opacity"></div>
        <nav
          style={{
            background: navbarBackground,
          }}
          className={`${
            isNavbarOpen && size.width < 1024 ? "border-none" : "border-b"
          } relative z-40 border-brdr backdrop-blur-sm transition-opacity bg-lightprimary-bg dark:bg-primary-bg  border-lightsecondary-border dark:border-secondary-border dark:shadow-lg dark:shadow-primary-bg/80`}
        >
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              <div id="bottomdiv" className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <a
                    className="flex gap-1 items-center justify-center w-auto focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:ring-offset-4 focus-visible:ring-offset-background-alternative focus-visible:rounded-sm"
                    type="button"
                    id="radix-:Rlcna6:"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                    href="/"
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
                        <Tabs blogs={blogs} />
                      </li>
                      <li className="text-sm font-medium">
                        <a
                          className="group/menu-item flex items-center text-sm hover:text-lightaccent-selection dark:hover:text-accent-text select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-text-lighter group-hover:bg-transparent text-accent-text focus-visible:text-accent-text"
                          data-radix-collection-item=""
                          href="#pricing"
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
                {/* {loading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin text-lightprimary-text dark:text-primary-text" />
                ) :  */}
                {!user ? (
                  <>
                    <a
                      data-size="tiny"
                      type="button"
                      className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg  dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                      href="/login?next=/dashboard/home"
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
                      onClick={() => setLogoutModal(true)}
                      className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-lightprimary-text dark:text-primary-text bg-lightdanger-bg dark:bg-danger-bg hover:bg-lightdanger-selection dark:hover:bg-danger-selection border-lightdanger-border dark:border-danger-border hover:border-lightdanger-strongerborder dark:hover:border-danger-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                    >
                      <span className="truncate">Logout</span>
                    </p>
                    <UserPopover
                      user={user}
                      profileData={profileData}
                      setLogoutModal={setLogoutModal}
                    />
                  </div>
                )}
                <motion.div
                  className="block lg:hidden cursor-pointer text-lightprimary-text dark:text-primary-text"
                  onClick={() => {
                    setIsNavbarOpen(!isNavbarOpen);
                    setDropdown1Open(false);
                    setDropdown2Open(false);
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
      <AnimatePresence>
        {isNavbarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              zIndex: isNavbarOpen ? 42 : 39,
            }}
            className="max-h-[91vh] no_scrollbar block w-full fixed top-16 left-0 lg:hidden bg-lightprimary-bg dark:bg-primary-bg supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] overflow-y-auto pt-4 pb-4 px-4"
          >
            {/* Navbar Links */}
            <motion.nav
              className="flex flex-col space-y-3 w-full"
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="border-b border-lightsecondary-border/50 dark:border-secondary-border/50 transform-none w-full"
                custom={0}
                variants={staggerVariants}
              >
                <button
                  onClick={() => setDropdown1Open(!isDropdown1Open)}
                  className="w-full py-2 pl-3 pr-4 text-base flex items-center justify-between font-medium text-lightprimary-text/80 dark:text-primary-text/80 hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded"
                >
                  Features
                  <motion.span
                    animate={{ rotate: isDropdown1Open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown />
                  </motion.span>
                </button>
                {isDropdown1Open && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-start justify-start gap-3 w-full py-4 px-2">
                      <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
                        <p className="group h-10 w-10 flex items-center justify-center rounded-md border bg-lightsecondary-bg dark:bg-secondary-bg border-lightsecondary-border/50 dark:border-secondary-border/50 group-hover/menu-item:border-secondary-strongerborder dark:group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
                          <PiRocketLaunch
                            size={25}
                            className="text-lightprimary-text/70 dark:text-primary-text/70 group-hover/menu-item:text-lightprimary-text dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
                          />
                        </p>
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-lightprimary-text dark:text-primary-text text-sm leading-snug flex items-center justify-center">
                            Startups{" "}
                            <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                          </p>
                          <p className="text-lightsecondary-text dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                            Add startups and link revenue
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
                        <p className="h-10 w-10 flex items-center justify-center rounded-md border bg-lightsecondary-bg dark:bg-secondary-bg border-lightsecondary-border/50 dark:border-secondary-border/50 group-hover/menu-item:border-secondary-strongerborder dark:group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
                          <LuScrollText
                            size={25}
                            className="text-lightprimary-text/70 dark:text-primary-text/70 group-hover/menu-item:text-lightprimary-text dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
                          />
                        </p>
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-lightprimary-text dark:text-primary-text text-sm leading-snug flex items-center justify-center">
                            Blogs{" "}
                            <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                          </p>
                          <p className="text-lightsecondary-text dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                            Write blogs, connect with community
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
                        <p className="h-10 w-10 flex items-center justify-center rounded-md border bg-lightsecondary-bg dark:bg-secondary-bg border-lightsecondary-border/50 dark:border-secondary-border/50 group-hover/menu-item:border-secondary-strongerborder dark:group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
                          <PiCubeLight
                            size={25}
                            className="text-lightprimary-text/70 dark:text-primary-text/70 group-hover/menu-item:text-lightprimary-text dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
                          />
                        </p>
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-lightprimary-text dark:text-primary-text text-sm leading-snug flex items-center justify-center">
                            Projects{" "}
                            <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                          </p>
                          <p className="text-lightsecondary-text dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                            Showcase your projects and skills
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pb-6 px-2">
                      <h3 className="mb-4 text-sm font-normal text-lightprimary-text/70 dark:text-primary-text/70 tracking-widest">
                        WHAT DIFFERENTIATES US?
                      </h3>
                      <div className="flex flex-col items-start justify-center gap-2 font-light">
                        <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                          linkfolio vs linktree{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>{" "}
                        <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                          linkfolio vs indiepage{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>{" "}
                        <p className="text-lightprimary-text dark:text-lightprimary-text dark: group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                          linkfolio vs startuphub{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className="border-b border-secondary-border/50 transform-none w-full"
                custom={1}
                variants={staggerVariants}
              >
                <button
                  onClick={() => setDropdown2Open(!isDropdown2Open)}
                  className="w-full py-2 pl-3 pr-4 text-base flex items-center justify-between font-medium text-lightprimary-text/80 dark:text-primary-text/80 hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded"
                >
                  Blogs
                  <motion.span
                    animate={{ rotate: isDropdown2Open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown />
                  </motion.span>
                </button>
                {isDropdown2Open && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-start justify-start gap-3 w-full py-4 px-2">
                      {blogs?.map((blog, index) => (
                        <a
                          key={index}
                          className="flex items-start group/menu-item justify-center gap-2"
                          href={`/blog/${blog.id}`}
                        >
                          <Image
                            className="mb-2 h-[4.5rem] w-28 rounded object-cover opacity-90 dark:opacity-75 group-hover/menu-item:opacity-100 transition-all ease-out duration-200"
                            src={blog.thumbnail_url || ""}
                            alt="Placeholder image"
                            width={112}
                            height={72}
                          />
                          <div className="flex flex-col items-start justify-center">
                            <h4 className="mb-0.5 text-sm font-medium line-clamp-1 text-lightprimary-text dark:text-primary-text">
                              {blog.title}
                            </h4>
                            <p className="text-xs line-clamp-2 text-lightsecondary-text/70 dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 mb-1 transition-all ease-out duration-200">
                              {blog.content}
                            </p>
                            <p className="text-lightprimary-text dark:text-primary-text group-hover/menu-item:text-lightaccent-text dark:group-hover/menu-item:text-accent-text transition-all ease-out duration-200 cursor-pointer text-xs font-extralight leading-snug flex items-center justify-center">
                              Read more
                              <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="pb-6 px-2">
                      <h3 className="mb-4 text-sm font-normal text-lightsecondary-text/70 dark:text-primary-text/70 tracking-widest">
                        CUSTOMER STORIES
                      </h3>
                      <div className="flex flex-col items-start justify-center gap-2 font-light">
                        <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                          linkfolio vs linktree{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>{" "}
                        <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                          linkfolio vs indiepage{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>{" "}
                        <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                          linkfolio vs startuphub{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>
                      </div>
                    </div>
                    {/* Add more options as needed */}
                  </motion.div>
                )}
              </motion.div>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`border-b border-secondary-border/50 transform-none`}
                  custom={2 + index}
                  variants={staggerVariants}
                >
                  <a
                    className="block py-2 pl-3 pr-4 text-base font-medium text-lightprimary-text/80 dark:text-primary-text/80 hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                className={`transform-none w-full flex gap-2 items-center justify-center select-none`}
                custom={5}
                variants={staggerVariants}
              >
                {/* {loading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : */}
                {user ? (
                  <>
                    <a
                      href="/dashboard/home"
                      className="mt-4 cursor-pointer text-sm font-normal w-1/2 h-8 px-4 py-2 border text-lightprimary-text dark:text-primary-text bg-lightaccent-bg dark:bg-accent-bg hover:bg-lightaccent-selection dark:hover:bg-accent-selection border-lightaccent-border dark:border-accent-border hover:border-lightaccent-strongerborder dark:hover:hover:border-accent-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover  flex items-center justify-center ease-out duration-200 rounded-md outline-none transition-all outline-0"
                    >
                      Dashboard
                    </a>
                    <p
                      onClick={() => {
                        setIsNavbarOpen(false);
                        setLogoutModal(true);
                      }}
                      className="mt-4 cursor-pointer text-sm font-normal w-1/2 h-8 px-4 py-2 border text-lightprimary-text dark:text-primary-text bg-lightdanger-bg dark:bg-danger-bg hover:bg-lightdanger-selection dark:hover:bg-danger-selection border-lightdanger-border dark:border-danger-border hover:border-lightdanger-strongerborder dark:hover:border-danger-strongerborder flex items-center justify-center ease-out duration-200 rounded-md outline-none transition-all outline-0"
                    >
                      Logout
                    </p>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="mt-4 cursor-pointer text-sm font-normal w-1/2 h-8 px-4 py-2 border text-lightprimary-text dark:text-primary-text bg-lightsecondary-bg  dark:bg-secondary-bg hover:bg-lightsecondary-selection dark:hover:bg-secondary-selection border-lightsecondary-border dark:border-secondary-border hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder flex items-center justify-center ease-out duration-200 rounded-md outline-none transition-all outline-0"
                    >
                      Login
                    </a>
                    <a
                      href="/login"
                      className="mt-4 cursor-pointer text-sm font-normal w-1/2 h-8 px-4 py-2 border text-lightprimary-text dark:text-primary-text bg-lightaccent-bg dark:bg-accent-bg hover:bg-lightaccent-selection dark:hover:bg-accent-selection border-lightaccent-border dark:border-accent-border hover:border-lightaccent-strongerborder dark:hover:hover:border-accent-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover flex items-center justify-center ease-out duration-200 rounded-md outline-none transition-all outline-0"
                    >
                      Create your page
                    </a>
                  </>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Tabs = ({ blogs }: { blogs: any[] | null }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [dir, setDir] = useState<null | "l" | "r">(null);

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS(blogs).map((t) => (
        <Tab
          key={t.id}
          selected={selected}
          handleSetSelected={handleSetSelected}
          tab={t.id}
        >
          {t.title}
        </Tab>
      ))}

      {selected && <Content dir={dir} selected={selected} blogs={blogs} />}
    </div>
  );
};

const Tab = ({
  children,
  tab,
  handleSetSelected,
  selected,
}: {
  children: ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
}) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-1.5 text-sm transition-colors ${
        selected === tab
          ? "text-lightaccent-text dark:text-accent-text"
          : "text-lightprimary-text dark:text-primary-text "
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const Content = ({
  selected,
  dir,
  blogs,
}: {
  selected: number | null;
  dir: null | "l" | "r";
  blogs: any[] | null;
}) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="absolute z-[99] left-0 top-[calc(100%_+_24px)] min-w-[38rem] rounded-xl border border-lightsecondary-strongerborder dark:border-secondary-strongerborder bg-lightprimary-bg dark:bg-primary-bg"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS(blogs).map((t) => (
        <div className="overflow-hidden" key={t.id}>
          {selected === t.id && (
            <motion.div
              initial={{
                opacity: 0,
                x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <t.Component />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }: { selected: number | null }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-lightsecondary-border  dark:border-secondary-border bg-lightprimary-bg dark:bg-primary-bg"
    />
  );
};

const Features = () => {
  return (
    <div>
      <div className="flex gap-4 divide-x divide-secondary-strongerborder">
        <div className="flex flex-col items-start justify-center gap-3 w-1/2 p-4">
          <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
            <p className="group h-10 w-10 flex items-center justify-center rounded-md border bg-lightsecondary-bg dark:bg-secondary-bg border-lightsecondary-border dark:border-secondary-border group-hover/menu-item:border-lightsecondary-strongerborder dark:group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
              <PiRocketLaunch
                size={25}
                className="text-lightprimary-text/70 dark:text-primary-text/70 group-hover/menu-item:text-lightprimary-text dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
              />
            </p>
            <div className="flex flex-col items-start justify-center">
              <p className="text-lightprimary-text dark:text-primary-text text-sm leading-snug flex items-center justify-center">
                Startups{" "}
                <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
              </p>
              <p className="text-lightsecondary-text dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                Add startups and link revenue
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
            <p className="h-10 w-10 flex items-center justify-center rounded-md border bg-lightsecondary-bg dark:bg-secondary-bg border-lightsecondary-border dark:border-secondary-border group-hover/menu-item:border-lightsecondary-strongerborder dark:group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
              <LuScrollText
                strokeWidth={1}
                size={25}
                className="text-lightprimary-text/70 dark:text-primary-text/70 group-hover/menu-item:text-lightprimary-text dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
              />
            </p>
            <div className="flex flex-col items-start justify-center">
              <p className="text-lightprimary-text dark:text-primary-text text-sm leading-snug flex items-center justify-center">
                Blogs{" "}
                <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
              </p>
              <p className="text-lightsecondary-text dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                Write blogs, connect with community
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
            <p className="h-10 w-10 flex items-center justify-center rounded-md border bg-lightsecondary-bg dark:bg-secondary-bg border-lightsecondary-border dark:border-secondary-border group-hover/menu-item:border-lightsecondary-strongerborder dark:group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
              <PiCubeLight
                size={25}
                className="text-lightprimary-text/70 dark:text-primary-text/70 group-hover/menu-item:text-lightprimary-text dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
              />
            </p>
            <div className="flex flex-col items-start justify-center">
              <p className="text-lightprimary-text dark:text-primary-text text-sm leading-snug flex items-center justify-center">
                Projects{" "}
                <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
              </p>
              <p className="text-lightsecondary-text dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                Showcase your projects and skills
              </p>
            </div>
          </div>
        </div>
        <div className="pl-4 bg-lightprimary-bg dark:bg-primary-bg w-1/2 p-4 rounded-r-xl">
          <h3 className="mb-4 text-sm font-normal text-lightprimary-text/70 dark:text-primary-text/70 tracking-widest">
            WHAT DIFFERENTIATES US?
          </h3>
          <div className="flex flex-col items-start justify-center gap-2 font-light">
            <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
              linkfolio vs linktree{" "}
              <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
            </p>{" "}
            <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
              linkfolio vs indiepage{" "}
              <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
            </p>{" "}
            <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
              linkfolio vs startuphub{" "}
              <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Blogs = ({ blogs }: { blogs: any[] | null }) => {
  return (
    <div>
      <div className="flex gap-4 divide-x divide-secondary-strongerborder">
        <div className="flex flex-col items-start justify-center gap-3 w-2/3 p-4">
          {blogs?.map((blog, index) => (
            <a
              key={index}
              className="flex items-start group/menu-item justify-center gap-2"
              href={`/blog/${blog.id}`}
            >
              <Image
                className="mb-2 h-[4.5rem] w-28 rounded object-cover opacity-90 dark:opacity-75 group-hover/menu-item:opacity-100 transition-all ease-out duration-200"
                src={blog.thumbnail_url || ""}
                alt="Placeholder image"
                width={112}
                height={72}
              />
              <div className="flex flex-col items-start justify-center">
                <h4 className="mb-0.5 line-clamp-1 text-sm font-medium text-lightprimary-text/80 group-hover/menu-item:text-lightprimary-text dark:text-primary-text/80 dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200">
                  {blog.title}
                </h4>
                <p className="text-xs line-clamp-2 text-lightprimary-text/70 group-hover/menu-item:text-lightprimary-text/80 dark:text-primary-text/70 dark:group-hover/menu-item:text-primary-text/80 mb-1 transition-all ease-out duration-200">
                  {blog.content}
                </p>
                <p className="text-lightprimary-text group-hover/menu-item:text-lightaccent-text dark:text-primary-text dark:group-hover/menu-item:text-accent-text transition-all ease-out duration-200 cursor-pointer text-xs font-extralight leading-snug flex items-center justify-center">
                  Read more
                  <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                </p>
              </div>
            </a>
          ))}
        </div>
        <div className="pl-4 bg-lightprimary-bg dark:bg-primary-bg w-1/3 p-4 rounded-r-xl">
          <h3 className="mb-4 text-sm font-normal text-lightprimary-text dark:text-primary-text/70 tracking-widest">
            CUSTOMER STORIES
          </h3>
          <div className="flex flex-col items-start justify-center gap-2 font-light">
            <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
              linkfolio vs linktree{" "}
              <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
            </p>{" "}
            <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
              linkfolio vs indiepage{" "}
              <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
            </p>{" "}
            <p className="text-lightprimary-text dark:text-primary-text group/menu-item hover:text-lightaccent-text dark:hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
              linkfolio vs startuphub{" "}
              <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TABS = (blogs: any[] | null) =>
  [
    {
      title: "Features",
      Component: Features,
    },
    {
      title: "Blogs",
      Component: () => <Blogs blogs={blogs} />,
    },
  ].map((n, idx) => ({ ...n, id: idx + 1 }));

export default Navbar;
