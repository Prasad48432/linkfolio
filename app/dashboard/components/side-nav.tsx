"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/app/dashboard/utils/constants";
import { SideNavItem } from "@/app/dashboard/utils/types";
import Image from "next/image";

const SideNav = () => {
  return (
    <div className="md:w-60 bg-primary-bg h-screen flex-1 fixed border-r border-secondary-border hidden md:flex">
      <div className="flex flex-col w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-secondary-border h-[61px] w-full"
        >
          <Image
            width={124}
            height={24}
            src="/headerlogo.png"
            alt="header"
            priority
          />
        </Link>

        <div className="flex flex-col divide-y divide-secondary-border">
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
      className="md:px-4 data-[active=true]:bg-secondary-bg relative"
    >
      <div
        data-active={item.path === pathname}
        className="z-10 bg-primary-text data-[active=true]:block data-[active=false]:hidden w-1 rounded-r-md h-full absolute left-0 top-0"
      ></div>
      <Link
        href={item.path}
        className={`flex flex-row space-x-2 items-center p-2 rounded-lg duration-200 transition-all ease-out ${
          item.path === pathname
            ? "text-primary-text hover:text-primary-text"
            : "text-secondary-text hover:text-primary-text/80"
        }`}
      >
        {item.icon && <item.icon strokeWidth={1.5} size={20} />}
        <span className="font-normal text-xl flex">{item.title}</span>
      </Link>
    </div>
  );
};
