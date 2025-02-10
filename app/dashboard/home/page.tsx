"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  BatteryLow,
  SignalMedium,
  ExternalLink,
  MapPin,
  Eye,
  X,
  Link,
  Type,
  FileUser,
} from "lucide-react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { createClient } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import CountrySelect from "./components/country-select";
import { User, Mail, IdCard } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import UpdateImage from "./components/update-image";
import ImageSelect from "./components/image-select";
import Image from "next/image";
import MarkdownParser from "@/components/markdown-parser";
import { formatEarnings } from "@/lib/format-earnings";
import UsernameSelect from "./components/username-select";
import SkillsSection from "./components/skills-select";
import ResumeSection from "./components/resume-select";
import { ICONS_MAP_SMALL } from "./components/icons-map-small";
import { ToastError, ToastSuccess } from "@/components/toast";
import UpdateFavicon from "./components/update-favicon";

interface Skill {
  name: string;
  icon: string;
}

const Home = () => {
  const supabase = createClient();
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
    favicon: "",
  });
  const [fetchLoading, setFetchLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState(false);
  const [isUsernameThere, setIsUsernameThere] = useState(false);

  // Function to fetch profile data
  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "full_name, username, bio, country, email, id, avatar_url, profile_link, profile_link_text, user_skills, resume_url, resume_url_visibility, favicon"
          )
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          if (data.username) {
            setIsUsernameThere(true);
          }
          setProfileData(data);
        }
      }
    } catch (error) {
      console.error("Error retrieving profile data:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const updateFieldInSupabase = async ({
    table,
    id,
    field,
    value,
    isLink = false,
    isNumber = false,
  }: {
    table: string;
    id: string;
    field: string;
    value: any;
    isLink?: boolean;
    isNumber?: boolean;
  }) => {
    try {
      if (isLink) {
        const regex = /^https:\/\/([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        if (!regex.test(value)) {
          ToastError({ message: "Invalid link." });
          return;
        }
      }

      if (isNumber) {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue)) {
          value = parsedValue;
        } else {
          ToastError({ message: "Invalid number input." });
          return;
        }
      }

      const { data, error } = await supabase
        .from(table)
        .update({ [field]: value })
        .eq("id", id);

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
    debounce(updateFieldInSupabase, 1000),
    []
  );

  const handleFieldChange = ({
    id,
    field,
    value,
    isNumber = false,
    isLink = false,
  }: {
    id: string;
    field: string;
    value: any;
    isNumber?: boolean;
    isLink?: boolean;
  }) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Pass arguments directly
    debouncedUpdateField({
      table: "profiles",
      id,
      field,
      value,
      isNumber: isNumber,
      isLink: isLink,
    });
  };

  // Real-time subscription to profile updates
  useEffect(() => {
    const channel = supabase
      .channel("profiles-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${profileData?.id}`,
        },
        () => {
          fetchProfile();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [profileData?.id]);

  // Fetch profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (event: { target: { files: any[] } }) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (profileData.avatar_url) {
          const oldFilePath = profileData.avatar_url.split(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/userimages/`
          )[1];

          if (oldFilePath) {
            await supabase.storage
              .from("userimages")
              .remove([`${oldFilePath}`])
              .then((result) => {
                // TODO:
              })
              .catch((err) => {
                ToastError({ message: "An unexpected error occurred." });
              });
          }
        }

        const fileExt = selectedFile.name.split(".").pop();

        const filePath = `${Date.now()}.${fileExt}`;

        // Upload the image to the "userimages" bucket
        const { error } = await supabase.storage
          .from("userimages")
          .upload(filePath, selectedFile);

        if (error) throw error;

        // Get the public URL of the uploaded image
        const { data } = supabase.storage
          .from("userimages")
          .getPublicUrl(filePath);

        const uri = await supabase
          .from("profiles")
          .update({
            avatar_url: data.publicUrl,
          })
          .eq("id", user?.id);

        setModal(false);

        ToastSuccess({ message: "image uploaded." });
      } catch (error) {
        ToastError({ message: "An unexpected error occurred." });
      }
    }
  };

  const handleFaviconChange = async (event: { target: { files: any[] } }) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (profileData.favicon && profileData.favicon !== "/favicon.ico") {
          console.log("got into deleting old file");
          const oldFilePath = profileData.favicon.split(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/userfavicons/`
          )[1];

          if (oldFilePath) {
            await supabase.storage
              .from("userfavicons")
              .remove([`${oldFilePath}`])
              .then((result) => {
                // TODO:
              })
              .catch((err) => {
                ToastError({ message: "An unexpected error occurred." });
              });
          }
        }

        const fileExt = selectedFile.name.split(".").pop();

        const filePath = `${Date.now()}.${fileExt}`;

        // Upload the image to the "userfavicons" bucket
        const { error } = await supabase.storage
          .from("userfavicons")
          .upload(filePath, selectedFile);

        if (error) throw error;

        // Get the public URL of the uploaded image
        const { data } = supabase.storage
          .from("userfavicons")
          .getPublicUrl(filePath);

        const uri = await supabase
          .from("profiles")
          .update({
            favicon: data.publicUrl,
          })
          .eq("id", user?.id);

        ToastSuccess({ message: "favicon uploaded." });
      } catch (error) {
        ToastError({ message: "An unexpected error occurred." });
      }
    }
  };

  useEffect(() => {
    if (preview) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [preview]);

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
        <ImageSelect
          modal={modal}
          setModal={setModal}
          image={profileData.avatar_url}
        />
        {/* Left Part */}
        <div className="lg:w-[55%] w-full lg:overflow-y-auto bg-primary-bg pt-4 px-0 lg:px-4">
          <TabGroup>
            <TabList className="flex p-1.5 lg:p-2 bg-secondary-bg/40 gap-1 rounded-full mx-1">
              <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-primary-text focus:outline-none data-[selected]:bg-accent-bg border border-secondary-border data-[selected]:border-accent-border data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-accent-bg/80 data-[focus]:outline-1 data-[focus]:outline-white">
                Profile
              </Tab>
              <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-primary-text focus:outline-none data-[selected]:bg-accent-bg border border-secondary-border data-[selected]:border-accent-border data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-accent-bg/80 data-[focus]:outline-1 data-[focus]:outline-white">
                Skills & Resume
              </Tab>
              <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-primary-text focus:outline-none data-[selected]:bg-accent-bg border border-secondary-border data-[selected]:border-accent-border data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-accent-bg/80 data-[focus]:outline-1 data-[focus]:outline-white">
                Credentials
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <div className="flex flex-col gap-4 mt-4 px-2">
                    <div className="w-full h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[90%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden opacity-75">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[80%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden opacity-50">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center gap-3 w-full px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
                      <UpdateImage
                        image={profileData.avatar_url}
                        setModal={setModal}
                        handleFileChange={handleFileChange}
                        fetchLoading={fetchLoading}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 w-full px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
                      <UpdateFavicon
                        image={profileData.favicon}
                        fetchLoading={fetchLoading}
                        handleFaviconChange={handleFaviconChange}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 w-full px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                            <User
                              strokeWidth={1}
                              size={20}
                              className="text-primary-text/80 text-xl"
                            />
                          </span>
                          <input
                            type="text"
                            name="full_name"
                            value={profileData.full_name}
                            onChange={(e) => {
                              handleFieldChange({
                                id: profileData.id,
                                field: "full_name",
                                value: e.target.value,
                              });
                            }}
                            className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                          Country
                        </label>
                        <CountrySelect
                          id={profileData.id}
                          value={profileData.country}
                          handleFieldChange={handleFieldChange}
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex">
                          <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                            Bio
                          </label>
                          <HoverCard openDelay={250}>
                            <HoverCardTrigger className="text-sm font-medium text-primary-text cursor-pointer">
                              <button className="underline">
                                (Markdown Guide)
                              </button>
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-primary-bg border border-secondary-border rounded-md z-50">
                              <div className="flex flex-col p-2">
                                <p className="text-sm font-semibold">
                                  Markdown guide
                                </p>
                                <p className="text-xs text-primary-text/80 mt-2">
                                  <span className="text-accent-text">
                                    **text**
                                  </span>{" "}
                                  → <span className="font-bold">text</span>
                                </p>
                                <p className="text-xs text-primary-text/80">
                                  <span className="text-accent-text">
                                    *text*
                                  </span>{" "}
                                  → <span className="italic">text</span>
                                </p>
                                <p className="text-xs text-primary-text/80">
                                  <span className="text-accent-text">
                                    [link](https://mystartup.com)
                                  </span>{" "}
                                  →{" "}
                                  <a
                                    href="https://mystartup.com"
                                    target="_blank"
                                    className="font-medium underline"
                                  >
                                    link
                                  </a>
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <textarea
                          rows={5}
                          name="bio"
                          value={profileData.bio}
                          onChange={(e) => {
                            handleFieldChange({
                              id: profileData.id,
                              field: "bio",
                              value: e.target.value,
                            });
                          }}
                          className="border-secondary-border focus:border-secondary-strongerborder w-full px-3 py-2 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 w-full px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                          Portfolio Link Text
                        </label>
                        <div className="relative">
                          <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                            <Type
                              strokeWidth={1}
                              size={20}
                              className="text-primary-text/80 text-xl"
                            />
                          </span>
                          <input
                            type="text"
                            name="profile_link_text"
                            value={profileData.profile_link_text}
                            onChange={(e) => {
                              handleFieldChange({
                                id: profileData.id,
                                field: "profile_link_text",
                                value: e.target.value,
                              });
                            }}
                            placeholder="text to diplay for profile link"
                            className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg autofill:bg-secondary-selection border focus:outline-none rounded-md mt-1"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                          Portfolio Link
                        </label>
                        <div className="relative">
                          <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                            <Link
                              strokeWidth={1}
                              size={20}
                              className="text-primary-text/80 text-xl"
                            />
                          </span>
                          <input
                            type="text"
                            name="profile_link"
                            placeholder="link"
                            value={profileData.profile_link}
                            onChange={(e) => {
                              handleFieldChange({
                                id: profileData.id,
                                field: "profile_link",
                                value: e.target.value,
                                isLink: true,
                              });
                            }}
                            className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <div className="flex flex-col gap-4 mt-4 px-2">
                    <div className="w-full h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[90%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden opacity-75">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[80%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden opacity-50">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                  </div>
                ) : (
                  <>
                    <ResumeSection
                      resumeUrl={profileData.resume_url}
                      userId={profileData.id}
                      resumeUrlVisibility={profileData.resume_url_visibility}
                    />
                    <SkillsSection fetchedSkills={profileData.user_skills} />
                  </>
                )}
              </TabPanel>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <div className="flex flex-col gap-4 mt-4 px-2">
                    <div className="w-full h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[90%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden opacity-75">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[80%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden opacity-50">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/10 to-secondary-bg animate-shimmer" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <h1 className="text-primary-text/90 font-medium text-base lg:text-xl px-1">
                        Credentials Section
                      </h1>
                      <p className="text-primary-text/70 font-normal text-xs lg:text-sm mb-1 px-1">
                        These fields are not editable on created
                      </p>
                    </div>
                    <UsernameSelect
                      profileData={profileData}
                      setProfileData={setProfileData}
                      isUsernameThere={isUsernameThere}
                      setIsUsernameThere={setIsUsernameThere}
                    />
                    <div>
                      <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                          <Mail
                            strokeWidth={1}
                            size={20}
                            className="text-primary-text/80 text-xl"
                          />
                        </span>
                        <input
                          type="text"
                          name="full_name"
                          value={profileData.email}
                          readOnly
                          className="border-secondary-border cursor-not-allowed focus:border-secondary-border w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                        User id
                      </label>
                      <div className="relative">
                        <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                          <IdCard
                            strokeWidth={1}
                            size={20}
                            className="text-primary-text/80 text-xl"
                          />
                        </span>
                        <input
                          type="text"
                          name="full_name"
                          value={profileData.id}
                          readOnly
                          className="border-secondary-border cursor-not-allowed focus:border-secondary-border w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                        />
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>

        {/* Right Part */}
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
            <div className="w-[130px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[90px] h-[5px] bg-gray-400 bottom-0.5 z-50 rounded-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[17%] -translate-x-1/2 absolute">
              9:41
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-[0.3rem] left-[85%] -translate-x-1/2 absolute">
              <BatteryLow size={15} />
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[78%] -translate-x-1/2 absolute">
              <SignalMedium size={15} />
            </div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[5px] bg-black absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="h-[10px] w-[10px] bg-white/10 absolute top-0 left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[5px] w-[5px] bg-white/20 absolute top-[2.5px] left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[10px] w-[50px] bg-white/10 absolute top-0 left-[53%] -translate-x-1/2 rounded-full"></div>
            {fetchLoading ? (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-primary-bg flex items-center justify-center">
                <Loader strokeWidth={1.5} size={24} className="animate-spin" />
              </div>
            ) : (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-black">
                <div className="bg-primary-bg/80 w-[272px] h-[572px]"></div>
                <div className="absolute top-4 left-0 w-full h-[97.3%] rounded-b-[2.1rem] p-4 overflow-y-auto scrollbar_hidden">
                  <div
                    style={{
                      backgroundColor: "#343434",
                    }}
                    className="absolute top-12 right-0 m-4 rounded-md p-1 cursor-pointer"
                    title="share"
                  >
                    <ExternalLink
                      style={{
                        color: "#ffffff",
                      }}
                      size={16}
                    />
                  </div>
                  <div className="w-full rounded-full bg-secondary-bg flex items-center justify-start p-1 gap-1 mb-4 cursor-pointer">
                    <Image
                      src={profileData.favicon}
                      className="w-[20px] h-[20px] rounded-full object-cover"
                      alt="overlay"
                      referrerPolicy="no-referrer"
                      width={200}
                      height={200}
                    />
                    <p
                      title={`${process.env.NEXT_PUBLIC_BASE_URL}/${profileData.username}`}
                      className="text-xs text-primary-text/60 text-ellipsis truncate"
                    >
                      {process.env.NEXT_PUBLIC_BASE_URL}/{profileData.username}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src={profileData.avatar_url}
                      className="w-[50px] h-[50px] rounded-full p-0.5 border border-secondary-border object-cover"
                      alt="overlay"
                      referrerPolicy="no-referrer"
                      width={200}
                      height={200}
                    />
                    <div className="">
                      <h1 className="text-white text-sm font-bold ml-3">
                        {profileData.full_name}
                      </h1>
                      <div className="flex justify-center items-center text-gray-300 text-sm mt-[0.1rem] ml-[0.6rem]">
                        <MapPin size={12} />
                        <h2
                          title={profileData.country}
                          className="cursor-pointer text-xs ml-0.5 mr-1 max-w-12 text-ellipsis truncate"
                        >
                          {profileData.country}
                        </h2>
                        <div className="h-3 border-l border-secondary-border mr-1"></div>
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
                          target="_blank"
                          href={profileData.profile_link}
                          className="mt-3 flex items-center justify-center gap-0.5 text-primary-text hover:text-accent-text transition-colors duration-200 ease-out"
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
                          target="_blank"
                          href={`${profileData.resume_url}?download`}
                          className="mt-3 flex items-center justify-center gap-0.5 text-primary-text hover:text-accent-text transition-colors duration-200 ease-out"
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
                        className="flex cursor-pointer items-center justify-center gap-0.5 p-0.5 border rounded border-secondary-border bg-secondary-bg text-primary-text/60 transition-all duration-200 ease-out"
                      >
                        {ICONS_MAP_SMALL[skill.icon]}
                        <span className="text-xxs select-none pt-0.5">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <MarkdownParser
                      text={profileData.bio}
                      className="text-primary-text/80 text-xs"
                    />
                  </div>
                  <div className="mt-4 border-t border-secondary-border"></div>
                  <div className="mt-4">
                    <div className="bg-secondary-bg border border-secondary-border  h-[18px] w-60 rounded-[0.1875rem]"></div>
                    <div className="w-60 h-16 border border-secondary-border rounded-md mt-2 bg-secondary-bg transition-all ease-out duration-200"></div>
                    <div className="w-60 h-20 border border-secondary-border rounded-md mt-2 bg-secondary-bg transition-all ease-out duration-200"></div>
                    <div className="w-60 h-14 border border-secondary-border rounded-md mt-2 bg-secondary-bg transition-all ease-out duration-200"></div>
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

export default Home;
