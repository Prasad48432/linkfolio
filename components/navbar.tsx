"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { PiRocketLaunch, PiCubeLight } from "react-icons/pi";
import { BiLink } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { User } from "@supabase/supabase-js";
import { Loader } from "lucide-react";
import { Menu, X } from "lucide-react";
import useWindowSize from "@/app/hooks/useWindowSize";
import { logout } from "@/app/dashboard/action";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ToastError, ToastSuccess } from "./toast";
import { ProfileData } from "@/types/user";

export default function Navbar({
  isNavbarOpen,
  setIsNavbarOpen,
  setDropdown1Open,
  setDropdown2Open,
  loading,
  userData,
  user,
}: {
  isNavbarOpen: boolean;
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDropdown1Open: React.Dispatch<React.SetStateAction<boolean>>;
  setDropdown2Open: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  userData: ProfileData;
  user: User | null;
}) {
  const size = useWindowSize();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        ToastSuccess({ message: "Logout successful." });
        router.push("/login");
      }
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
    }
  };

  return (
    <div
      style={{
        zIndex: size.width < 1024 ? (isNavbarOpen ? 42 : 40) : undefined,
      }}
      className={`sticky top-0 transform ${
        size.width >= 1024 ? "z-[40] hover:z-[42]" : ""
      }`}
    >
      <div className="absolute inset-0 h-full w-full bg-primary-bg/90 !opacity-100 transition-opacity"></div>
      <nav
        style={{
          background: isNavbarOpen ? "#121212" : "transparent",
        }}
        className={`${
          isNavbarOpen && size.width < 1024 ? "border-none" : "border-b"
        } relative z-40 border-brdr backdrop-blur-sm transition-opacity shadow-lg shadow-primary-bg/80`}
      >
        <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
          <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
            <div className="flex items-center">
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
                    className="w-[124px] h-[24px]"
                    src="/headerlogo.png"
                    alt="Header Logo"
                    width={124}
                    height={24}
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
                      <Tabs />
                    </li>
                    <li className="text-sm font-medium">
                      <a
                        className="group/menu-item flex items-center text-sm hover:text-accent-text select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-text-lighter group-hover:bg-transparent text-accent-text focus-visible:text-brand-link"
                        data-radix-collection-item=""
                        href="/enterprise"
                      >
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-1">
                            <p className="leading-snug text-primary-text group-hover/menu-item:text-accent-text">
                              Enterprise
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="text-sm font-medium">
                      <a
                        className="group/menu-item flex items-center text-sm hover:text-accent-text select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-text-lighter group-hover:bg-transparent text-accent-text focus-visible:text-accent-text"
                        data-radix-collection-item=""
                        href="/pricing"
                      >
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-1">
                            <p className="leading-snug text-primary-text group-hover/menu-item:text-accent-text">
                              Pricing
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="text-sm font-medium">
                      <a
                        className="group/menu-item flex items-center text-sm hover:text-accent-text select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent-text-lighter group-hover:bg-transparent text-accent-text focus-visible:text-accent-text"
                        data-radix-collection-item=""
                        href="/docs"
                      >
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-1">
                            <p className="leading-snug text-primary-text group-hover/menu-item:text-accent-text">
                              Docs
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="text-sm font-medium">
                      <a
                        className="group/menu-item flex items-center text-sm hover:text-accent-text select-none gap-3 rounded-md p-2 leading-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground-lighter group-hover:bg-transparent text-accent-text focus-visible:text-accent-text"
                        data-radix-collection-item=""
                        href="/blog"
                      >
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-1">
                            <p className="leading-snug text-primary-text group-hover/menu-item:text-accent-text">
                              Blog
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
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : !user ? (
                <>
                  <a
                    data-size="tiny"
                    type="button"
                    className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-primary-text bg-secondary-bg hover:bg-secondary-selection border-secondary-border hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                    href="/login"
                  >
                    <span className="truncate">Login</span>
                  </a>
                  <Link
                    href="/register?next=/dashboard/home"
                    className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-primary-text bg-accent-bg hover:bg-accent-selection border-accent-border hover:border-accent-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                  >
                    <span className="truncate">Create your page</span>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <a
                    data-size="tiny"
                    type="button"
                    className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-primary-text bg-accent-bg hover:bg-accent-selection border-accent-border hover:border-accent-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                    href="/dashboard/home"
                  >
                    <span className="truncate">Dashboard</span>
                  </a>
                  <p
                    onClick={() => handleLogout()}
                    className="relative justify-center cursor-pointer items-center space-x-2 text-center ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-primary-text bg-danger-bg hover:bg-danger-selection border-danger-border hover:border-danger-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs px-2.5 py-1 h-[26px] hidden lg:block"
                  >
                    <span className="truncate">Logout</span>
                  </p>
                  <Image
                    width={200}
                    height={200}
                    className="bg-accent-bg/20 h-8 md:h-10 w-8 md:w-10 rounded-full"
                    referrerPolicy="no-referrer"
                    src={userData.avatar_url}
                    alt="User Profile"
                  />
                </div>
              )}
              <motion.div
                className="block lg:hidden cursor-pointer text-primary-text"
                onClick={() => {
                  setIsNavbarOpen(!isNavbarOpen);
                  setDropdown1Open(false);
                  setDropdown2Open(false);
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: isNavbarOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
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
  );
}

const Tabs = () => {
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
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
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
        selected === tab ? "text-accent-text" : "text-primary-text"
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
}: {
  selected: number | null;
  dir: null | "l" | "r";
}) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute z-[99] left-0 top-[calc(100%_+_24px)] min-w-[38rem] rounded-xl border border-secondary-strongerborder bg-primary-bg"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
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
        );
      })}
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
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

const Features = () => {
  return (
    <div>
      <div className="flex gap-4 divide-x divide-secondary-strongerborder">
        <div className="flex flex-col items-start justify-center gap-3 w-1/2 p-4">
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
        <div className="pl-4 bg-[#1a1a1a] w-1/2 p-4 rounded-r-xl">
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
      </div>
    </div>
  );
};

const Blogs = () => {
  return (
    <div>
      <div className="flex gap-4 divide-x divide-secondary-strongerborder">
        <div className="flex flex-col items-start justify-center gap-3 w-2/3 p-4">
          <a
            className="flex items-start group/menu-item justify-center gap-2"
            href="#"
          >
            <Image
              className="mb-2 h-[4.5rem] w-28 rounded object-cover opacity-75 group-hover/menu-item:opacity-100 transition-all ease-out duration-200"
              src="https://images.pexels.com/photos/7414273/pexels-photo-7414273.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Placeholder image"
              width={112}
              height={72}
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="mb-0.5 text-sm font-medium text-primary-text/80 group-hover/menu-item:text-primary-text transition-all ease-out duration-200">
                How's startup built
              </h4>
              <p className="text-xs text-secondary-text group-hover/menu-item:text-primary-text/80 mb-1 transition-all ease-out duration-200">
                startups are definetly not gonna be a walk on moon typeshit
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
            <Image
              className="mb-2 h-[4.5rem] w-28 rounded object-cover opacity-75 group-hover/menu-item:opacity-100 transition-all ease-out duration-200"
              src="https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Placeholder image"
              width={112}
              height={72}
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="mb-0.5 text-sm font-medium text-primary-text/80 group-hover/menu-item:text-primary-text transition-all ease-out duration-200">
                New biz master plan
              </h4>
              <p className="text-xs text-secondary-text group-hover/menu-item:text-primary-text/80 mb-1 transition-all ease-out duration-200">
                how a small enterprise business can be scaled into large
              </p>
              <p className="text-primary-text group-hover/menu-item:text-accent-text transition-all ease-out duration-200 cursor-pointer text-xs font-thin leading-snug flex items-center justify-center">
                Read more
                <MdKeyboardArrowRight className="hidden group-hover/menu-item:inline-block animate-slideIn" />
              </p>
            </div>
          </a>
        </div>
        <div className="pl-4 bg-[#1a1a1a] w-1/3 p-4 rounded-r-xl">
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
      </div>
    </div>
  );
};

const TABS = [
  {
    title: "Features",
    Component: Features,
  },
  {
    title: "Blogs",
    Component: Blogs,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
