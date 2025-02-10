"use client";
import { ToastError, ToastSuccess } from "@/components/toast";
import { createClient } from "@/utils/supabase/client";
import React, { useCallback, useEffect, useState } from "react";
import {
  fetchLinks,
  fetchProjects,
  fetchStartups,
} from "../contents/functions/fetchContent";
import {
  ArrowRight,
  BatteryLow,
  ExternalLink,
  Eye,
  FileUser,
  Link,
  Loader,
  Mail,
  MapPin,
  SignalMedium,
  X,
} from "lucide-react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import LinkPreviewRender from "../contents/components/linkpreview_render";
import ProjectPreviewRender from "../contents/components/projectpreview_render";
import StartupPreviewRender from "../contents/components/startuppreview_render";
import Image from "next/image";
import { formatEarnings } from "@/lib/format-earnings";
import { ICONS_MAP_SMALL } from "../home/components/icons-map-small";
import MarkdownParser from "@/components/markdown-parser";
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { fetchProfile, fetchThemes } from "./functions/fetchContents";

interface Skill {
  name: string;
  icon: string;
}

interface Theme {
  id: string;
  theme_data: {
    primary_bg: string;
    secondary_bg: string;
    primary_text: string;
    accent_text: string;
    border: string;
    strongerborder: string;
  };
  theme_type: string;
}
const Help = () => {
  const supabase = createClient();
  const [preview, setPreview] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    full_name: "",
    username: "",
    bio: "",
    country: "",
    email: "",
    id: "",
    avatar_url: "",
    profile_link: "",
    profile_link_text: "",
    user_skills: [],
    resume_url: "",
    resume_url_visibility: false,
    socials: {
      instagram: "",
      facebook: "",
      x: "",
      github: "",
      linkedin: "",
      youtube: "",
    },
    theme: {},
    newsletter_config: {
      newsletter_title: "",
    },
  });
  const [links, setLinks] = useState<any[] | null>([]);
  const [startups, setStartups] = useState<any[] | null>([]);
  const [projects, setProjects] = useState<any[] | null>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [palettes, setPalettes] = useState<Theme[]>([]);

  const [theme, setTheme] = useState({
    primary_bg: "",
    secondary_bg: "",
    primary_text: "",
    accent_text: "",
    border: "",
    strongerborder: "",
    theme_type: "",
    pallete_id: 0,
  });

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const updateFieldInSupabase = async ({ value }: { value: any }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id;
      const { data, error } = await supabase
        .from("profiles")
        .update({ theme: value })
        .eq("id", userId);

      if (error) {
        ToastError({
          message: "An unexpected error occurred.",
        });
      }

      ToastSuccess({ message: "Updated successfully." });
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
    }
  };

  const debouncedUpdateField = useCallback(
    debounce(updateFieldInSupabase, 500),
    []
  );

  const handleFieldChange = ({ palette }: { palette: any }) => {
    setTheme({
      primary_bg: palette.theme_data.primary_bg,
      secondary_bg: palette.theme_data.secondary_bg,
      primary_text: palette.theme_data.primary_text,
      accent_text: palette.theme_data.accent_text,
      border: palette.theme_data.border,
      strongerborder: palette.theme_data.strongerborder,
      theme_type: palette.theme_type,
      pallete_id: Number(palette.id),
    });

    // Pass arguments directly
    debouncedUpdateField({
      value: {
        primary_bg: palette.theme_data.primary_bg,
        secondary_bg: palette.theme_data.secondary_bg,
        primary_text: palette.theme_data.primary_text,
        accent_text: palette.theme_data.accent_text,
        border: palette.theme_data.border,
        strongerborder: palette.theme_data.strongerborder,
        theme_type: palette.theme_type,
        pallete_id: Number(palette.id),
      },
    });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;
        await Promise.all([
          fetchProfile({ supabase, setTheme, setProfileData }),
          fetchThemes({ supabase, setPalettes }),
          fetchLinks({ userId, supabase, setLinks }),
          fetchStartups({ userId, supabase, setStartups }),
          fetchProjects({ userId, supabase, setProjects }),
        ]);
      } catch (error) {
        ToastError({ message: "An unexpected error occurred." });
      } finally {
        setFetchLoading(false);
        console.log(theme.pallete_id === 0);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <div
        onClick={() => setPreview(true)}
        className="lg:hidden font-bold py-1 px-2 inline-flex items-center justify-center bg-secondary-bg rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-secondary-strongerborder w-[120px] bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
      >
        <Eye strokeWidth={1} className="text-primarytext text-lg mr-1" />
        <p className="text-primarytext font-semibold text-base">Preview</p>
      </div>
      <div className="flex gap-2 h-auto lg:h-[calc(100vh-100px)] relative">
        <div className="lg:w-[55%] w-full lg:overflow-y-auto">
          {fetchLoading ? (
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-col items-center mb-2 mt-2 px-6 py-4 w-full h-full">
                <div className="p-4 w-full h-full">
                  <div className="h-8 mb-4 w-24 bg-secondary-bg rounded-lg relative overflow-hidden opacity-90">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                  </div>
                  <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mb-6">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div
                        key={index}
                        className="col-span-1 h-12 bg-secondary-bg rounded-lg relative overflow-hidden opacity-90"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 w-full h-full"> 
                  <div className="h-8 mb-4 w-24 bg-secondary-bg rounded-lg relative overflow-hidden opacity-90">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                  </div>
                  <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mb-6">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div
                        key={index}
                        className="col-span-1 h-12 bg-secondary-bg rounded-lg relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center mb-2 mt-2 px-6 py-4">
                <input
                  id={`radio-0`}
                  aria-describedby={`radio-text-0`}
                  type="radio"
                  name="colorPalette"
                  style={{
                    accentColor: "#ff5733",
                  }}
                  value="default"
                  checked={theme.primary_bg === "#121212"}
                  onChange={() => {
                    handleFieldChange({
                      palette: {
                        theme_data: {
                          primary_bg: "#121212",
                          secondary_bg: "#262626",
                          primary_text: "#ededed",
                          accent_text: "#ff5733",
                          border: "#363636",
                          strongerborder: "#4d4d4d",
                          theme_type: "dark",
                          pallete_id: 0,
                        },
                      },
                    });
                  }}
                  className="w-4 h-4 text-red-600"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-base font-medium text-gray-300 mr-2"
                >
                  Default Theme
                </label>
              </div>
              <div className="p-4">
                <h1 className="text-primarytext text-xl font-semibold mb-4">
                  Light Palletes
                </h1>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mb-6">
                  {palettes.map(
                    (palette) =>
                      palette.theme_type === "light" && (
                        <div key={palette.id} className="flex items-center p-2">
                          <input
                            id={`radio-${palette.id}`}
                            aria-describedby={`radio-text-${palette.id}`}
                            type="radio"
                            name="colorPalette"
                            style={{
                              accentColor: "#ff5733",
                            }}
                            value={palette.theme_type}
                            checked={theme.pallete_id === Number(palette.id)}
                            onChange={() => {
                              handleFieldChange({ palette: palette });
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 mr-2"
                          />
                          <label
                            htmlFor={`radio-${palette.id}`}
                            className="flex rounded-lg overflow-hidden w-32 h-12"
                          >
                            <div
                              className="w-[45%] h-full"
                              style={{
                                backgroundColor: palette.theme_data.primary_bg,
                              }}
                            ></div>
                            <div
                              className="w-[30%] h-full"
                              style={{
                                backgroundColor:
                                  palette.theme_data.secondary_bg,
                              }}
                            ></div>
                            <div
                              className="w-[15%] h-full"
                              style={{
                                backgroundColor:
                                  palette.theme_data.primary_text,
                              }}
                            ></div>
                            <div
                              className="w-[10%] h-full"
                              style={{
                                backgroundColor: palette.theme_data.accent_text,
                              }}
                            ></div>
                          </label>
                        </div>
                      )
                  )}
                </div>
              </div>
              <div className="p-4">
                <h1 className="text-primarytext text-xl font-semibold mb-4">
                  Dark Palletes
                </h1>
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mb-6">
                  {palettes.map(
                    (palette, index) =>
                      palette.theme_type === "dark" && (
                        <div key={palette.id} className="flex items-center p-2">
                          <input
                            id={`radio-${palette.id}`}
                            aria-describedby={`radio-text-${palette.id}`}
                            type="radio"
                            name="colorPalette"
                            style={{
                              accentColor: "#ff5733",
                            }}
                            value={palette.theme_type}
                            checked={theme.pallete_id === Number(palette.id)}
                            onChange={() => {
                              handleFieldChange({ palette: palette });
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 mr-2"
                          />
                          <label
                            htmlFor={`radio-${palette.id}`}
                            className="flex rounded-lg overflow-hidden w-32 h-12"
                          >
                            <div
                              className="w-[45%] h-full"
                              style={{
                                backgroundColor: palette.theme_data.primary_bg,
                              }}
                            ></div>
                            <div
                              className="w-[30%] h-full"
                              style={{
                                backgroundColor:
                                  palette.theme_data.secondary_bg,
                              }}
                            ></div>
                            <div
                              className="w-[15%] h-full"
                              style={{
                                backgroundColor:
                                  palette.theme_data.primary_text,
                              }}
                            ></div>
                            <div
                              className="w-[10%] h-full"
                              style={{
                                backgroundColor: palette.theme_data.accent_text,
                              }}
                            ></div>
                          </label>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`${
            preview ? "flex" : "hidden"
          } lg:flex z-[49] bg-primary-bg lg:bg-transparent lg:z-10 w-full bg-darkbg rounded-lg p-6 lg:p-4 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-[calc(50%-31px)] lg:translate-x-0 lg:translate-y-0 lg:static lg:right-auto lg:top-auto lg:w-[45%] h-[calc(100vh-60px)] lg:h-[85vh]`}
        >
          <p
            onClick={() => setPreview(false)}
            className="block lg:hidden absolute top-3 right-3 text-primary-text cursor-pointer"
          >
            <X />
          </p>
          <div className="scale-90 md:scale-100 relative mx-auto border-black dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[130px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
            <div className="w-[90px] h-[5px] bg-gray-400 bottom-0.5 rounded-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[17%] -translate-x-1/2 absolute z-[11]">
              9:41
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-[0.3rem] left-[85%] -translate-x-1/2 absolute z-[11]">
              <BatteryLow size={15} />
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[78%] -translate-x-1/2 absolute z-[11]">
              <SignalMedium size={15} />
            </div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[124px] rounded-s-lg z-10"></div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[178px] rounded-s-lg z-10"></div>
            <div className="h-[64px] w-[5px] bg-black absolute -end-[17px] top-[142px] rounded-e-lg z-10"></div>
            <div className="h-[10px] w-[10px] bg-white/10 absolute top-0 left-[40%] -translate-x-1/2 rounded-full z-10"></div>
            <div className="h-[5px] w-[5px] bg-white/20 absolute top-[2.5px] left-[40%] -translate-x-1/2 rounded-full z-10"></div>
            <div className="h-[10px] w-[50px] bg-white/10 absolute top-0 left-[53%] -translate-x-1/2 rounded-full z-10"></div>
            {fetchLoading ? (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-primary-bg flex items-center justify-center">
                <Loader strokeWidth={1.5} size={24} className="animate-spin" />
              </div>
            ) : (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-black">
                <div
                  style={{
                    background: theme.primary_bg || "#121212",
                  }}
                  className="w-[272px] h-[572px]"
                ></div>
                <div className="absolute top-3 right-1 w-full h-[97.3%] rounded-b-[2.1rem] p-4 overflow-y-auto scrollbar_hidden z-0">
                  <div
                    style={{
                      backgroundColor: theme.secondary_bg || "#262626",
                      borderColor: theme.strongerborder || "#4d4d4d",
                    }}
                    className="absolute top-[-6px] right-0 m-4 rounded-md p-1 cursor-pointer border"
                    title="share"
                  >
                    <ExternalLink
                      style={{
                        color: theme.primary_text || "#ffffff",
                      }}
                      size={16}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      style={{
                        borderColor: theme.strongerborder || "#363636",
                      }}
                      src={profileData.avatar_url}
                      className="w-[50px] h-[50px] rounded-full p-0.5 border border-dashed object-cover"
                      alt="overlay"
                      referrerPolicy="no-referrer"
                      width={200}
                      height={200}
                    />
                    <div className="">
                      <h1
                        style={{
                          color: theme.primary_text || "#ededed",
                        }}
                        className=" text-sm font-bold ml-3"
                      >
                        {profileData.full_name}
                      </h1>
                      <div
                        style={{
                          color: theme.primary_text || "#ededed",
                        }}
                        className="flex justify-center items-center text-sm mt-[0.1rem] ml-[0.6rem]"
                      >
                        <MapPin size={12} />
                        <h2
                          title={profileData.country}
                          className="cursor-pointer text-xs ml-0.5 mr-1 max-w-12 text-ellipsis truncate"
                        >
                          {profileData.country}
                        </h2>
                        <div
                          style={{
                            borderColor: theme.border || "#363636",
                          }}
                          className="h-3 border-l mr-1"
                        ></div>
                        <span className="text-xs">₹</span>
                        <span className="text-xs">
                          {formatEarnings(2000000)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {profileData.profile_link &&
                      profileData.profile_link_text && (
                        <a
                          style={{
                            color: theme.primary_text || "#ededed",
                          }}
                          target="_blank"
                          href={profileData.profile_link}
                          className="mt-3 flex items-center justify-center gap-0.5 hover:text-accent-text transition-colors duration-200 ease-out"
                        >
                          <Link strokeWidth={1} size={13} />
                          <p className="underline underline-offset-2 text-xs">
                            {profileData.profile_link_text}
                          </p>
                        </a>
                      )}
                    {profileData.resume_url &&
                      profileData.resume_url_visibility && (
                        <a
                          style={{
                            color: theme.primary_text || "#ededed",
                          }}
                          target="_blank"
                          href={`${profileData.resume_url}?download`}
                          className="mt-3 flex items-center justify-center gap-0.5  hover:text-accent-text transition-colors duration-200 ease-out"
                        >
                          <FileUser strokeWidth={1} size={13} />
                          <p className="underline underline-offset-2 text-xs">
                            Resume
                          </p>
                        </a>
                      )}
                  </div>
                  <div className="flex items-center justify-center flex-wrap gap-2">
                    {(profileData.user_skills as Skill[]).map((skill) => (
                      <div
                        key={skill.name}
                        style={{
                          backgroundColor: theme.secondary_bg || "#262626",
                          color: theme.primary_text || "#ededed",
                          borderColor: theme.border || "#363636",
                        }}
                        className="flex cursor-pointer items-center justify-center gap-0.5 p-0.5 border rounded transition-all duration-200 ease-out"
                      >
                        {ICONS_MAP_SMALL[skill.icon]}
                        <span className="text-xxs select-none pt-0.5">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      color: theme.primary_text || "#ededed",
                    }}
                    className="mt-4 text-center"
                  >
                    <MarkdownParser
                      text={profileData.bio}
                      className="text-xs"
                    />
                  </div>

                  <div
                    style={{
                      borderColor: theme.border || "#363636",
                    }}
                    className="mt-4 border-t"
                  ></div>
                  <div className="mt-4">
                    <TabGroup onChange={(e) => setTabIndex(e)}>
                      <TabList className="flex p-0.5 gap-2 rounded-full mx-0.5 items-center justify-center">
                        <Tab
                          style={{
                            color:
                              tabIndex === 0
                                ? theme.primary_text || "#ff5733"
                                : theme.accent_text || "#ededed",
                            textDecorationColor:
                              tabIndex === 0
                                ? theme.primary_text || "#ff5733"
                                : theme.accent_text || "#ededed",
                          }}
                          className="transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-[0.6rem] font-semibold focus:outline-none data-[selected]:underline underline-offset-2 decoration-2"
                        >
                          Startups
                        </Tab>
                        <Tab
                          style={{
                            color:
                              tabIndex === 1
                                ? theme.primary_text || "#ff5733"
                                : theme.accent_text || "#ededed",
                            //primary_text
                            textDecorationColor:
                              tabIndex === 1
                                ? theme.primary_text || "#ff5733"
                                : theme.accent_text || "#ededed",
                          }}
                          className="transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-[0.6rem] font-semibold focus:outline-none data-[selected]:underline underline-offset-2 decoration-2"
                        >
                          Projects
                        </Tab>
                        <Tab
                          style={{
                            color:
                              tabIndex === 2
                                ? theme.primary_text || "#ff5733"
                                : theme.accent_text || "#ededed",
                            textDecorationColor:
                              tabIndex === 2
                                ? theme.primary_text || "#ff5733"
                                : theme.accent_text || "#ededed",
                          }}
                          className="transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-[0.6rem] font-semibold focus:outline-none data-[selected]:underline underline-offset-2 decoration-2"
                        >
                          Links
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel className="w-full px-1 py-2 flex flex-col gap-0.5">
                          {startups?.map((startup, index) => {
                            return (
                              <StartupPreviewRender
                                key={index}
                                startup={startup}
                                theme={theme}
                              />
                            );
                          })}
                        </TabPanel>
                        <TabPanel className="w-full px-1 py-2 flex flex-col gap-0.5">
                          {projects?.map((project, index) => {
                            return (
                              <ProjectPreviewRender
                                key={index}
                                project={project}
                                theme={theme}
                              />
                            );
                          })}
                        </TabPanel>
                        <TabPanel className="w-full px-1 py-2 flex flex-col gap-0.5">
                          {links?.map((link, index) => {
                            return (
                              <LinkPreviewRender
                                key={index}
                                link={link}
                                theme={theme}
                              />
                            );
                          })}
                        </TabPanel>
                      </TabPanels>
                    </TabGroup>
                  </div>
                  <p
                    style={{
                      color: theme.primary_text || "#ededed",
                    }}
                    className="mt-4 text-center text-xs font-medium"
                  >
                    {profileData.newsletter_config.newsletter_title}
                  </p>
                  <div className="flex items-center justify-center relative w-full mt-3 mb-6">
                    <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center">
                      <Mail
                        strokeWidth={1}
                        size={17}
                        style={{
                          color: theme.primary_text || "#ededed",
                        }}
                        className=" text-xl"
                      />
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      value=""
                      readOnly
                      placeholder="email@google.com"
                      style={{
                        background: theme.secondary_bg || "#262626",
                        borderColor: theme.strongerborder || "#4d4d4d",
                      }}
                      className=" border-r-0  w-full py-2 pl-8 text-sm border focus:outline-none rounded-l-md"
                    />
                    <button
                      style={{
                        background: theme.secondary_bg || "#262626",
                        borderColor: theme.strongerborder || "#4d4d4d",
                      }}
                      className="cursor-pointer py-2 px-3 text-sm rounded-r-md border"
                    >
                      <ArrowRight
                        style={{
                          color: theme.primary_text || "#ededed",
                        }}
                        size={20}
                      />
                    </button>
                  </div>
                  <p
                    style={{
                      color: theme.primary_text || "#ededed",
                    }}
                    className="mt-3 text-center text-xs  font-medium"
                  >
                    Follow my socials !
                  </p>
                  <div className="mt-3 mb-4 flex items-center justify-center gap-2">
                    {profileData.socials.facebook && (
                      <span
                        style={{
                          background: theme.secondary_bg || "#262626",
                          color: theme.primary_text || "#ededed",
                          borderColor: theme.strongerborder || "#4d4d4d",
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border"
                      >
                        <SiFacebook />
                      </span>
                    )}
                    {profileData.socials.instagram && (
                      <span
                        style={{
                          background: theme.secondary_bg || "#262626",
                          color: theme.primary_text || "#ededed",
                          borderColor: theme.strongerborder || "#4d4d4d",
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border"
                      >
                        <SiInstagram />
                      </span>
                    )}
                    {profileData.socials.x && (
                      <span
                        style={{
                          background: theme.secondary_bg || "#262626",
                          color: theme.primary_text || "#ededed",
                          borderColor: theme.strongerborder || "#4d4d4d",
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border"
                      >
                        <SiX />
                      </span>
                    )}
                    {profileData.socials.github && (
                      <span
                        style={{
                          background: theme.secondary_bg || "#262626",
                          color: theme.primary_text || "#ededed",
                          borderColor: theme.strongerborder || "#4d4d4d",
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border"
                      >
                        <SiGithub />
                      </span>
                    )}
                    {profileData.socials.linkedin && (
                      <span
                        style={{
                          background: theme.secondary_bg || "#262626",
                          color: theme.primary_text || "#ededed",
                          borderColor: theme.strongerborder || "#4d4d4d",
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border"
                      >
                        <SiLinkedin />
                      </span>
                    )}
                    {profileData.socials.youtube && (
                      <span
                        style={{
                          background: theme.secondary_bg || "#262626",
                          color: theme.primary_text || "#ededed",
                          borderColor: theme.strongerborder || "#4d4d4d",
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center border"
                      >
                        <SiYoutube />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
