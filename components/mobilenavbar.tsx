// import React from "react";

// const MobileNavbar = () => {
//   return (
//     <div className="h-auto min-h-[91vh] w-full  fixed z-[50] bottom-0 p-4 left-0 bg-primary-bg flex flex-col items-center justify-center gap-2 divide-y divide-secondary-border">
//       <p className="w-full text-primary-text mt-1">Blogs</p>
//       <p className="w-full text-primary-text mt-1">Text</p>
//       <p className="w-full text-primary-text mt-1">Text</p>
//       <p className="w-full text-primary-text mt-1">Text</p>
//     </div>
//   );
// };

// export default MobileNavbar;

"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PiRocketLaunch, PiCubeLight } from "react-icons/pi";
import { BiLink } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";

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

export default function MobileNavbar({ isOpen }: { isOpen: boolean }) {
  const [isDropdown1Open, setDropdown1Open] = useState(false);
  const [isDropdown2Open, setDropdown2Open] = useState(false);
  const navItems = [
    { id: 1, label: "Enterprise", href: "/enterprise" },
    { id: 2, label: "Pricing", href: "/pricing" },
    { id: 3, label: "Docs", href: "/docs" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-h-screen block lg:hidden bg-primary-bg supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh] overflow-y-auto pt-4 pb-4 px-4"
        >
          {/* Navbar Links */}
          <motion.nav
            className="flex flex-col space-y-3 w-full"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="border-b border-secondary-border transform-none w-full"
              custom={0}
              variants={staggerVariants}
            >
              <button
                onClick={() => setDropdown1Open(!isDropdown1Open)}
                className="w-full py-2 pl-3 pr-4 text-base flex items-center justify-between font-medium text-primary-text/80 hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded"
              >
                Features
                <span>{isDropdown1Open ? <ChevronUp /> : <ChevronDown />}</span>
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
                      <p className="group h-10 w-10 flex items-center justify-center rounded-md border bg-secondary-bg border-secondary-border group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
                        <PiRocketLaunch
                          size={25}
                          className="text-[#b7b7b7] group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
                        />
                      </p>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-primary-text text-sm leading-snug flex items-center justify-center">
                          Startups{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>
                        <p className="text-secondary-text group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                          Add startups and link revenue
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
                      <p className="h-10 w-10 flex items-center justify-center rounded-md border bg-secondary-bg border-secondary-border group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
                        <BiLink
                          size={25}
                          className="text-[#b7b7b7] group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
                        />
                      </p>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-primary-text text-sm leading-snug flex items-center justify-center">
                          Links{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>
                        <p className="text-secondary-text group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                          Add important links and stuff
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 cursor-pointer group/menu-item">
                      <p className="h-10 w-10 flex items-center justify-center rounded-md border bg-secondary-bg border-secondary-border group-hover/menu-item:border-secondary-strongerborder transition-all ease-out duration-200">
                        <PiCubeLight
                          size={25}
                          className="text-[#b7b7b7] group-hover/menu-item:text-primary-text transition-all ease-out duration-200"
                        />
                      </p>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-primary-text text-sm leading-snug flex items-center justify-center">
                          Projects{" "}
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>
                        <p className="text-secondary-text group-hover/menu-item:text-primary-text/80 text-xs font-normal transition-all ease-out duration-200">
                          Showcase your projects and skills
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pb-6 px-2">
                    <h3 className="mb-4 text-sm font-normal text-primary-text/70 tracking-widest">
                      WHAT DIFFERENTIATES US?
                    </h3>
                    <div className="flex flex-col items-start justify-center gap-2 font-thin">
                      <p className="text-primary-text group/menu-item hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                        linkfolio vs linktree{" "}
                        <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                      </p>{" "}
                      <p className="text-primary-text group/menu-item hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                        linkfolio vs indiepage{" "}
                        <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                      </p>{" "}
                      <p className="text-primary-text group/menu-item hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                        linkfolio vs startuphub{" "}
                        <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            <motion.div
              className="border-b border-secondary-border transform-none w-full"
              custom={1}
              variants={staggerVariants}
            >
              <button
                onClick={() => setDropdown2Open(!isDropdown2Open)}
                className="w-full py-2 pl-3 pr-4 text-base flex items-center justify-between font-medium text-primary-text/80 hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded"
              >
                Blogs
                <span>{isDropdown2Open ? <ChevronUp /> : <ChevronDown />}</span>
              </button>
              {isDropdown2Open && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-start justify-start gap-3 w-full py-4 px-2">
                    <a
                      className="flex items-start group/menu-item justify-center gap-2"
                      href="#"
                    >
                      <img
                        className="mb-2 h-[4.5rem] w-28 rounded object-cover opacity-75 group-hover/menu-item:opacity-100 transition-all ease-out duration-200"
                        src="https://images.pexels.com/photos/7414273/pexels-photo-7414273.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Placeholder image"
                      />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="mb-0.5 text-sm font-medium">
                          How's startup built
                        </h4>
                        <p className="text-xs text-secondary-text group-hover/menu-item:text-primary-text/80 mb-1 transition-all ease-out duration-200">
                          startups are definetly not gonna be a walk on moon
                          typeshit and shittty
                        </p>
                        <p className="text-primary-text group-hover/menu-item:text-accent-text transition-all ease-out duration-200 cursor-pointer text-xs font-thin leading-snug flex items-center justify-center">
                          Read more
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>
                      </div>
                    </a>
                    <a
                      className="flex items-start group/menu-item justify-center gap-2"
                      href="#"
                    >
                      <img
                        className="mb-2 h-[4.5rem] w-28 rounded object-cover opacity-75 group-hover/menu-item:opacity-100 transition-all ease-out duration-200"
                        src="https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Placeholder image"
                      />
                      <div className="flex flex-col items-start justify-center">
                        <h4 className="mb-0.5 text-sm font-medium">
                          New biz master plan
                        </h4>
                        <p className="text-xs text-secondary-text group-hover/menu-item:text-primary-text/80 mb-1 transition-all ease-out duration-200">
                          how a small enterprise business can be scaled into
                          large enterprises
                        </p>
                        <p className="text-primary-text group-hover/menu-item:text-accent-text transition-all ease-out duration-200 cursor-pointer text-xs font-thin leading-snug flex items-center justify-center">
                          Read more
                          <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="pb-6 px-2">
                    <h3 className="mb-4 text-sm font-normal text-primary-text/70 tracking-widest">
                      CUSTOMER STORIES
                    </h3>
                    <div className="flex flex-col items-start justify-center gap-2 font-thin">
                      <p className="text-primary-text group/menu-item hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                        linkfolio vs linktree{" "}
                        <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                      </p>{" "}
                      <p className="text-primary-text group/menu-item hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
                        linkfolio vs indiepage{" "}
                        <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
                      </p>{" "}
                      <p className="text-primary-text group/menu-item hover:text-accent-text transition-all ease-out duration-200 cursor-pointer text-sm leading-snug flex items-center justify-center">
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
                className="border-b border-secondary-border transform-none"
                custom={2 + index}
                variants={staggerVariants}
              >
                <a
                  className="block py-2 pl-3 pr-4 text-base font-medium text-primary-text/80 hover:bg-surface-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-lighter focus-visible:rounded"
                  href={item.href}
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
