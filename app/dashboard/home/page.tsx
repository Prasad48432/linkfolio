"use client";
import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard";
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
import { toast } from "sonner";
import { Loader } from "lucide-react";
import CountrySelect from "./components/country-select";
import { User, Mail, Signature, IdCard } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import UpdateImage from "./components/update-image";
import ImageSelect from "./components/image-select";
import Image from "next/image";
import MarkdownParser from "@/components/markdown-parser";
import { formatEarnings } from "@/lib/format-earnings";
import UsernameSelect from "./components/username-select";
import SkillsSection from "./components/skills-select";
import ResumeSection from "./components/resume-select";
import { DISPLAY_ICONS_MAP } from "./components/icons-map";
import { ToastError, ToastSuccess } from "@/components/toast";

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
  });
  const [loading, setLoading] = useState(false);
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
            "full_name, username, bio, country, email, id, avatar_url, profile_link, profile_link_text, user_skills, resume_url"
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
  
  // Real-time subscription to profile updates
  useEffect(() => {
    const channel = supabase
      .channel('profiles-updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${profileData?.id}` },
        () => {
          fetchProfile(); // Re-fetch data on profile update
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

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: profileData.full_name,
            bio: profileData.bio,
            country: profileData.country,
            profile_link: profileData.profile_link,
            profile_link_text: profileData.profile_link_text,
          })
          .eq("id", user.id);

        if (error) {
          ToastError({message: "Update unsuccessful."})
        } else {
          ToastSuccess({message: "Update successful."})
        }
      }
    } catch (error) {
      ToastError({message: "An unexpected error occurred."})
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
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
                ToastError({message: "An unexpected error occurred."})
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

        ToastSuccess({message: "image uploaded."})
      } catch (error) {
        ToastError({message: "An unexpected error occurred."})
      }
    }
  };

  return (
    <Dashboard>
      <div
        onClick={() => setPreview(true)}
        className="lg:hidden font-bold py-1 px-2 inline-flex items-center justify-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-400 w-[120px] bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
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
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[90%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-300/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[80%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center gap-3 w-full px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
                      <UpdateImage
                        image={profileData.avatar_url}
                        setModal={setModal}
                        handleFileChange={handleFileChange}
                        loading={loading}
                        fetchLoading={fetchLoading}
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
                            onChange={handleInputChange}
                            className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                          Country
                        </label>
                        <CountrySelect
                          value={profileData.country}
                          onChange={handleInputChange}
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
                            <HoverCardContent className="bg-secondary-bg border border-secondary-strongerborder rounded-md z-50">
                              <div className="flex flex-col p-2">
                                <p>
                                  **text** →{" "}
                                  <span className="font-bold">text</span>
                                </p>
                                <p>
                                  *text* → <span className="italic">text</span>
                                </p>
                                <p>
                                  [link](https://mystartup.com) →{" "}
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
                          onChange={handleInputChange}
                          className="border-secondary-border focus:border-secondary-strongerborder w-full px-3 py-2 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 w-full px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                          Profile Link Text
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
                            onChange={handleInputChange}
                            placeholder="text to diplay for profile link"
                            className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                          Profile Link
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
                            onChange={handleInputChange}
                            className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="font-thin flex items-center justify-center mt-2 bg-accent-bg/80 border border-accent-border/70 hover:bg-accent-selection/80 hover:border-accent-strongerborder/70 transition-all ease-out duration-200 text-primary-text py-1.5 px-3 rounded-md disabled:opacity-80"
                    >
                      {loading ? (
                        <Loader
                          size={24}
                          strokeWidth={1}
                          className="mr-2 animate-spin text-center"
                        />
                      ) : (
                        "Update Profile"
                      )}
                    </button>
                  </>
                )}
              </TabPanel>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <div className="flex flex-col gap-4 mt-4 px-2">
                    <div className="w-full h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[90%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-300/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-[80%] h-8 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                  </div>
                ) : (
                  <>
                    <ResumeSection
                      resumeUrl={profileData.resume_url}
                      userId={profileData.id}
                    />
                    <SkillsSection
                      fetchedSkills={profileData.user_skills}
                    />
                  </>
                )}
              </TabPanel>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <div className="flex flex-col gap-4 animate-pulse mt-4">
                    <div className="w-full h-10 bg-secondary-bg rounded-lg"></div>
                    <div className="w-[90%] h-10 bg-secondary-bg rounded-lg"></div>
                    <div className="w-[80%] h-10 bg-secondary-bg rounded-lg"></div>
                  </div>
                ) : (
                  <>
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
          } lg:flex scale-90 md:scale-100 z-[49] bg-primary-bg lg:bg-transparent lg:z-10 w-full bg-darkbg rounded-lg p-6 lg:p-4 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-[calc(50%-28px)] lg:translate-x-0 lg:translate-y-0 lg:static lg:right-auto lg:top-auto lg:w-[45%] lg:h-[85vh]`}
        >
          <p
            onClick={() => setPreview(false)}
            className="block lg:hidden absolute top-0 right-0 text-primary-text cursor-pointer"
          >
            <X />
          </p>
          <div className="relative mx-auto border-black dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
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
                <div className="absolute top-4 left-0 w-full h-full p-4">
                  <div
                    style={{
                      backgroundColor: "#343434",
                    }}
                    className="absolute top-[-8px] right-0 m-4 rounded-md p-1 cursor-pointer"
                    title="share"
                  >
                    <ExternalLink
                      style={{
                        color: "#ffffff",
                      }}
                      size={16}
                    />
                  </div>
                  <div className="flex items-center">
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
                    {profileData.resume_url && (
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
                  <div className="flex items-center justify-start flex-wrap gap-2">
                    {(profileData.user_skills as Skill[]).map((skill) => (
                      <div
                        key={skill.name}
                        className="flex cursor-pointer items-center justify-center gap-0.5 p-0.5 border rounded border-secondary-border bg-secondary-bg text-primary-text/60 hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all duration-200 ease-out"
                      >
                        {DISPLAY_ICONS_MAP[skill.icon]}
                        <span className="text-xxs select-none pt-0.5">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <MarkdownParser
                      text={profileData.bio}
                      className="text-primary-text/80 text-xs"
                    />
                  </div>
                  <div className="mt-4 border-t border-secondary-border"></div>
                  <div className="mt-4">
                    <div className="bg-secondary-bg border border-secondary-border  h-[18px] w-[80px] rounded-[0.1875rem]"></div>
                    <div className="w-60 h-16 border border-secondary-border rounded-md mt-2 bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all ease-out duration-200"></div>
                    <div className="w-60 h-20 border border-secondary-border rounded-md mt-2 bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all ease-out duration-200"></div>
                    <div className="w-60 h-14 border border-secondary-border rounded-md mt-2 bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all ease-out duration-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
