"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/app/dashboard/utils/constants";
import { SideNavItem } from "@/app/dashboard/utils/types";
import Image from "next/image";

const SideNav = () => {
  return (
    <div className="md:w-60 bg-lightprimary-bg dark:bg-primary-bg h-screen flex-1 fixed border-r border-lightsecondary-border dark:border-secondary-border hidden md:flex">
      <div className="flex flex-col w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-lightsecondary-border dark:border-secondary-border h-[61px] w-full"
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

        <div className="flex flex-col divide-y divide-lightsecondary-border dark:divide-secondary-border border-b border-secondary-border dark:border-lightsecondary-border">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();

  return (
    <div
      data-active={item.path === pathname}
      className="md:px-4 data-[active=true]:bg-lightsecondary-bg dark:data-[active=true]:bg-secondary-bg relative"
    >
      <div
        data-active={item.path === pathname}
        className="z-10 bg-lightprimary-text dark:bg-primary-text data-[active=true]:block data-[active=false]:hidden w-1 rounded-r-md h-full absolute left-0 top-0"
      ></div>
      <Link
        href={item.path}
        className={`flex flex-row space-x-2 items-center p-2 rounded-lg duration-200 transition-all ease-out ${
          item.path === pathname
            ? "text-lightprimary-text hover:text-lightprimary-text dark:text-primary-text dark:hover:text-primary-text"
            : "text-lightsecondary-text hover:text-lightprimary-text/80 dark:text-secondary-text dark:hover:text-primary-text/80"
        }`}
      >
        {item.icon && <item.icon strokeWidth={1.5} size={20} />}
        <span className="font-normal text-xl flex">{item.title}</span>
      </Link>
    </div>
  );
};
