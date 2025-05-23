"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Loader } from "lucide-react";
import { PiRocketLaunch, PiCubeLight } from "react-icons/pi";
import { BiLink } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import type { Database } from "@/types/supabasetypes";
import LogoutConfirmation from "./logoutconfirmation";

type blog = Database["public"]["Tables"]["blogs"]["Row"];

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

export default function MobileNavbar({
  isOpen,
  setIsOpen,
  isDropdown1Open,
  isDropdown2Open,
  setDropdown1Open,
  setDropdown2Open,
  loading,
  user,
  blogs,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDropdown1Open: boolean;
  isDropdown2Open: boolean;
  setDropdown1Open: React.Dispatch<React.SetStateAction<boolean>>;
  setDropdown2Open: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  user: User | null;
  blogs: blog[];
}) {
  const navItems = [
    { id: 1, label: "Pricing", href: "/pricing" },
    { id: 2, label: "Docs", href: "/docs" },
    { id: 3, label: "Blogs", href: "/blog" },
  ];

  const [logoutModal, setLogoutModal] = useState(false);


  return (
    <>
      <LogoutConfirmation modal={logoutModal} setModal={setLogoutModal} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              zIndex: isOpen ? 42 : 39,
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
                          <BiLink
                            size={25}
                            className="text-lightprimary-text/70 dark:text-primary-text/70 group-hover/menu-item:text-lightprimary-text dark:group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
                          />
                        </p>
                        <div className="flex flex-col items-start justify-center">
                          <p className="text-lightprimary-text dark:text-primary-text text-sm leading-snug flex items-center justify-center">
                            Links{" "}
                            <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                          </p>
                          <p className="text-lightsecondary-text dark:text-secondary-text group-hover/menu-item:text-lightprimary-text/80 dark:group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                            Add important links and stuff
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
                      {blogs.map((blog, index) => (
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
                {loading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : user ? (
                  <>
                    <a
                      href="/dashboard/home"
                      className="mt-4 cursor-pointer text-sm font-normal w-1/2 h-8 px-4 py-2 border text-lightprimary-text dark:text-primary-text bg-lightaccent-bg dark:bg-accent-bg hover:bg-lightaccent-selection dark:hover:bg-accent-selection border-lightaccent-border dark:border-accent-border hover:border-lightaccent-strongerborder dark:hover:hover:border-accent-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover  flex items-center justify-center ease-out duration-200 rounded-md outline-none transition-all outline-0"
                    >
                      Dashboard
                    </a>
                    <p
                      onClick={() => {
                        setIsOpen(false);
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
}
