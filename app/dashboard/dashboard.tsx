import React, { ReactNode } from "react";
import SideNav from "./components/side-nav";
import MarginWidthWrapper from "./components/margin-width-wrapper";
import Header from "./components/header";
import HeaderMobile from "./components/header-mobile";
import PageWrapper from "./components/page-wrapper";


interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div className="flex bg-primary-bg">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default Dashboard;
