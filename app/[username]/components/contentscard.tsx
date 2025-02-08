"use client";
import React, { useEffect, useRef, useState } from "react";
import { ProfileData } from "@/types/user";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
// import { motion } from "framer-motion";
import StartupRenderCard from "./startuprendercard";
import ProjectRenderCard from "./projectrendercard";
import LinkRenderCard from "./linkrendercard";

const ContentsCard = ({
  profile,
  startups,
  projects,
  links,
}: {
  profile: ProfileData;
  startups: any;
  projects: any;
  links: any;
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.8 }}
    >
      <TabGroup onChange={(e) => setTabIndex(e)}>
        <TabList className="flex p-0.5 gap-2 rounded-full items-center justify-center mb-4">
          <Tab
            style={{
              color:
                tabIndex === 0
                  ? profile.theme.primary_text || "#ff5733"
                  : profile.theme.accent_text || "#ededed",
              textDecorationColor:
                tabIndex === 0
                  ? profile.theme.primary_text || "#ff5733"
                  : profile.theme.accent_text || "#ededed",
            }}
            className="change-color transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-sm lg:text-lg font-semibold focus:outline-none data-[selected]:underline underline-offset-2 decoration-2"
          >
            Startups
          </Tab>
          <Tab
            style={{
              color:
                tabIndex === 1
                  ? profile.theme.primary_text || "#ff5733"
                  : profile.theme.accent_text || "#ededed",
              textDecorationColor:
                tabIndex === 1
                  ? profile.theme.primary_text || "#ff5733"
                  : profile.theme.accent_text || "#ededed",
            }}
            className="change-color transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-sm lg:text-lg font-semibold focus:outline-none data-[selected]:underline underline-offset-2 decoration-2"
          >
            Projects
          </Tab>
          <Tab
            style={{
              color:
                tabIndex === 2
                  ? profile.theme.primary_text || "#ff5733"
                  : profile.theme.accent_text || "#ededed",
              textDecorationColor:
                tabIndex === 2
                  ? profile.theme.primary_text || "#ff5733"
                  : profile.theme.accent_text || "#ededed",
            }}
            className="change-color transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-sm lg:text-lg font-semibold focus:outline-none data-[selected]:underline underline-offset-2 decoration-2"
          >
            Links
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="grid grid-cols-2 gap-2 items-center justify-center">
            {startups?.data?.map((startup: any, index: any) => {
              return (
                <StartupRenderCard
                  key={index}
                  startup={startup}
                  theme={profile.theme}
                />
              );
            })}
          </TabPanel>
          <TabPanel className="grid grid-cols-2 gap-2 items-center justify-center">
            {projects?.data?.map((project: any, index: any) => {
              return (
                <ProjectRenderCard
                  key={index}
                  project={project}
                  theme={profile.theme}
                />
              );
            })}
          </TabPanel>
          <TabPanel className="grid grid-cols-2 gap-2 items-center justify-center">
            {links?.data?.map((link: any, index: any) => {
              return (
                <LinkRenderCard key={index} link={link} theme={profile.theme} />
              );
            })}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default ContentsCard;
