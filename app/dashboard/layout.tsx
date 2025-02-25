import React, { ReactNode } from "react";
import SideNav from "./components/side-nav";
import MarginWidthWrapper from "./components/margin-width-wrapper";
import Header from "./components/header";
import HeaderMobile from "./components/header-mobile";
import PageWrapper from "./components/page-wrapper";
import { createClient } from "@/utils/supabase/server";
import { ProfileProvider } from "@/context/profielcontext";

interface DashboardProps {
  children: ReactNode;
}

export default async function Dashboard({ children }: DashboardProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex bg-lightprimary-bg dark:bg-primary-bg">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <ProfileProvider>
            <Header user={user} />
            <HeaderMobile />
            <PageWrapper>{children}</PageWrapper>
          </ProfileProvider>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
