import { UserRoundPen , FolderKanban, AtSign , ChartSpline , Palette, Newspaper  } from "lucide-react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Profile",
    path: "/dashboard/home",
    icon: UserRoundPen,
  },
  {
    title: "Contents",
    path: "/dashboard/contents",
    icon: FolderKanban,
  },
  {
    title: "Socials",
    path: "/dashboard/socials",
    icon: AtSign,
  },
  {
    title: "Newsletter",
    path: "/dashboard/newsletter",
    icon: Newspaper,
  },
  {
    title: "Themes",
    path: "/dashboard/themes",
    icon: Palette,
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: ChartSpline ,
  },
];

export default SIDENAV_ITEMS;
