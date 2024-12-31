import { UserRoundPen , FolderKanban, Mail, Settings, HelpCircle } from "lucide-react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Profile",
    path: "/dashboard/home",
    icon: UserRoundPen ,
  },
  {
    title: "Messages",
    path: "/dashboard/messages",
    icon: Mail,
  },
  {
    title: "Projects",
    path: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    path: "/dashboard/help",
    icon: HelpCircle,
  },
];

export default SIDENAV_ITEMS;
