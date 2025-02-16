"use client";
import React, { ReactNode } from "react";
import SideNav from "./components/side-nav";
import MarginWidthWrapper from "./components/margin-width-wrapper";
import Header from "./components/header";
import HeaderMobile from "./components/header-mobile";
import PageWrapper from "./components/page-wrapper";
import { useCycle } from "motion/react";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <div className="flex bg-primary-bg">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header isOpen={isOpen} toggleOpen={toggleOpen} />
          <HeaderMobile isOpen={isOpen} toggleOpen={toggleOpen} />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default Dashboard;
