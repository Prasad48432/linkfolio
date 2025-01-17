"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/app/dashboard/utils/constants";
import { SideNavItem } from "@/app/dashboard/utils/types";
import { Cycle, motion } from "framer-motion";

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMobile = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: Cycle;
}) => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={`fixed inset-0 z-50 w-full top-[3.8rem] md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-primary-bg"
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full px-4 py-4 max-h-screen overflow-y-auto"
      >
        {SIDENAV_ITEMS.map((item, idx) => {
          const isLastItem = idx === SIDENAV_ITEMS.length - 1; // Check if it's the last item

          return (
            <div key={idx}>
              <MenuItem>
                <Link
                  href={item.path}
                  onClick={() => toggleOpen()}
                  className={`w-full py-2 pl-3 pr-4 text-base flex items-center justify-between font-medium ${
                    item.path === pathname
                      ? "text-accent-text"
                      : "text-primary-text/80"
                  }`}
                >
                  {item.title}
                  {item.icon && <item.icon strokeWidth={1.5} size={20} />}
                </Link>
              </MenuItem>

              {!isLastItem && (
                <MenuItem className="my-1 h-px w-full bg-secondary-border" />
              )}
            </div>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
};

export default HeaderMobile;

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions.current;
};
