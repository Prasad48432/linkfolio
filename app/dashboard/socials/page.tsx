"use client";
import { ToastError, ToastSuccess } from "@/components/toast";
import useWindowSize from "@/hooks/useWindowSize";
import { createClient } from "@/utils/supabase/client";
import { BatteryLow, Eye, Loader, SignalMedium, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiGithub,
  SiLinkedin,
  SiYoutube,
} from "react-icons/si";

interface Socials {
  instagram?: string;
  facebook?: string;
  x?: string;
  github?: string;
  linkedin?: string;
  youtube?: string;
}

const SocialLinks = () => {
  const supabase = createClient();
  const size = useWindowSize();
  const [socials, setSocials] = useState<Socials>({});
  const [preview, setPreview] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("socials")
          .eq("id", user.id)
          .single();

        console.log(data?.socials);

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          // Assuming data.socials contains the actual JSON object
          setSocials(data.socials);
        }
      }
    } catch (error) {
      console.error("Error retrieving profile data:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
        .update({ socials: value })
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
    debounce(updateFieldInSupabase, 1000),
    []
  );

  const handleFieldChange = ({
    field,
    value,
  }: {
    field: string;
    value: any;
  }) => {
    // Dynamically update the specific field while preserving others
    setSocials((prevSocials) => {
      const updatedSocials = {
        ...prevSocials,
        [field]: value, // Update the specific field
      };

      // Call the debounced update to save the entire socials object to Supabase
      debouncedUpdateField({ value: updatedSocials });

      return updatedSocials; // Return the updated socials state
    });
  };
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
          <div className="flex flex-col items-start justify-center gap-3 w-full pb-3 px-3">
            <div className="p-2">
              <h1 className="text-xl text-lightprimary-text dark:text-primary-text font-semibold">
                Update Your Social Media Links
              </h1>
              <p className="text-sm text-lightprimary-text dark:text-primary-text font-normal mb-2">
                Leave the field blank to hide from page{" "}
                <span className="text-lightprimary-text/70 dark:text-primary-text/70 hidden md:inline text-xs">
                  (* Fields autoupdated on change)
                </span>
              </p>
              <span className="text-lightprimary-text/70 dark:text-primary-text/70 mb-5 lg:mb-0 md:hidden flex text-xs text-center lg:text-start">
                (* Fields autoupdated on change)
              </span>
            </div>
          </div>
          {fetchLoading ? (
            <div className="flex flex-col gap-4">
              {[0.9, 0.8, 0.7, 0.6, 0.35, 0.25].map((value, index) => (
                <div className="w-full px-5" key={index}>
                  <div
                    style={{
                      opacity: value,
                    }}
                    className="w-[70px] h-[20px] bg-lightsecondary-loader dark:bg-secondary-b rounded-md relative overflow-hidden mb-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                  </div>
                  <div
                    style={{
                      opacity: value,
                    }}
                    className="w-full h-[40px] bg-lightsecondary-loader dark:bg-secondary-b rounded-md relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="w-full px-5">
                <label className="block text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-0.5">
                  Instagram
                </label>
                <div className="relative flex items-center justify-center">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <SiInstagram
                      strokeWidth={1}
                      size={20}
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                    />
                  </span>
                  <p className="py-2 pl-9 rounded-l-md text-sm text-lightprimary-text/80 dark:text-primary-text/80 bg-lightsecondary-bg dark:bg-secondary-bg border border-r-0 border-lightsecondary-border dark:border-secondary-border w-fit mt-1">
                    https://instagram.com/
                  </p>
                  <input
                    type="text"
                    name="full_name"
                    value={socials.instagram || ""} // Default to empty string if undefined
                    onChange={(e) =>
                      handleFieldChange({
                        field: "instagram",
                        value: e.target.value,
                      })
                    }
                    className="border-lightsecondary-border dark:border-secondary-border w-full py-2 text-lightaccent-text dark:text-accent-text text-sm bg-lightsecondary-bg dark:bg-secondary-bg border border-l-0 focus:outline-none rounded-r-md mt-1"
                  />
                </div>
              </div>
              <div className="w-full px-5">
                <label className="block text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-0.5">
                  Facebook
                </label>
                <div className="relative flex items-center justify-center">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <SiFacebook
                      strokeWidth={1}
                      size={20}
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                    />
                  </span>
                  <p className="py-2 pl-9 rounded-l-md text-sm text-lightprimary-text/80 dark:text-primary-text/80 bg-lightsecondary-bg dark:bg-secondary-bg border border-r-0 border-lightsecondary-border dark:border-secondary-border w-fit mt-1">
                    https://facebook.com/
                  </p>
                  <input
                    type="text"
                    name="full_name"
                    value={socials.facebook || ""}
                    onChange={(e) =>
                      handleFieldChange({
                        field: "facebook",
                        value: e.target.value,
                      })
                    }
                    className="border-lightsecondary-border dark:border-secondary-border w-full py-2 text-lightaccent-text dark:text-accent-text text-sm bg-lightsecondary-bg dark:bg-secondary-bg border border-l-0 focus:outline-none rounded-r-md mt-1"
                  />
                </div>
              </div>
              <div className="w-full px-5">
                <label className="block text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-0.5">
                  X
                </label>
                <div className="relative flex items-center justify-center">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <SiX
                      strokeWidth={1}
                      size={20}
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                    />
                  </span>
                  <p className="py-2 pl-9 rounded-l-md text-sm text-lightprimary-text/80 dark:text-primary-text/80 bg-lightsecondary-bg dark:bg-secondary-bg border border-r-0 border-lightsecondary-border dark:border-secondary-border w-fit mt-1">
                    https://x.com/
                  </p>
                  <input
                    type="text"
                    name="full_name"
                    value={socials.x || ""}
                    onChange={(e) =>
                      handleFieldChange({ field: "x", value: e.target.value })
                    }
                    className="border-lightsecondary-border dark:border-secondary-border w-full py-2 text-lightaccent-text dark:text-accent-text text-sm bg-lightsecondary-bg dark:bg-secondary-bg border border-l-0 focus:outline-none rounded-r-md mt-1"
                  />
                </div>
              </div>
              <div className="w-full px-5">
                <label className="block text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-0.5">
                  Github
                </label>
                <div className="relative flex items-center justify-center">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <SiGithub
                      strokeWidth={1}
                      size={20}
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                    />
                  </span>
                  <p className="py-2 pl-9 rounded-l-md text-sm text-lightprimary-text/80 dark:text-primary-text/80 bg-lightsecondary-bg dark:bg-secondary-bg border border-r-0 border-lightsecondary-border dark:border-secondary-border w-fit mt-1">
                    https://github.com/
                  </p>
                  <input
                    type="text"
                    name="full_name"
                    value={socials.github || ""}
                    onChange={(e) =>
                      handleFieldChange({
                        field: "github",
                        value: e.target.value,
                      })
                    }
                    className="border-lightsecondary-border dark:border-secondary-border w-full py-2 text-lightaccent-text dark:text-accent-text text-sm bg-lightsecondary-bg dark:bg-secondary-bg border border-l-0 focus:outline-none rounded-r-md mt-1"
                  />
                </div>
              </div>
              <div className="w-full px-5">
                <label className="block text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-0.5">
                  Linkedin
                </label>
                <div className="relative flex items-center justify-center">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <SiLinkedin
                      strokeWidth={1}
                      size={20}
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                    />
                  </span>
                  <p className="py-2 pl-9 rounded-l-md text-sm text-lightprimary-text/80 dark:text-primary-text/80 bg-lightsecondary-bg dark:bg-secondary-bg border border-r-0 border-lightsecondary-border dark:border-secondary-border w-fit mt-1">
                    https://linkedin.com/
                  </p>
                  <input
                    type="text"
                    name="full_name"
                    value={socials.linkedin || ""}
                    onChange={(e) =>
                      handleFieldChange({
                        field: "linkedin",
                        value: e.target.value,
                      })
                    }
                    className="border-lightsecondary-border dark:border-secondary-border w-full py-2 text-lightaccent-text dark:text-accent-text text-sm bg-lightsecondary-bg dark:bg-secondary-bg border border-l-0 focus:outline-none rounded-r-md mt-1"
                  />
                </div>
              </div>
              <div className="w-full px-5">
                <label className="block text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-0.5">
                  Youtube
                </label>
                <div className="relative flex items-center justify-center">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <SiYoutube
                      strokeWidth={1}
                      size={20}
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                    />
                  </span>
                  <p className="py-2 pl-9 rounded-l-md text-sm text-lightprimary-text/80 dark:text-primary-text/80 bg-lightsecondary-bg dark:bg-secondary-bg border border-r-0 border-lightsecondary-border dark:border-secondary-border w-fit mt-1">
                    https://youtube.com/@
                  </p>
                  <input
                    type="text"
                    name="full_name"
                    value={socials.youtube || ""}
                    onChange={(e) =>
                      handleFieldChange({
                        field: "youtube",
                        value: e.target.value,
                      })
                    }
                    className="border-lightsecondary-border dark:border-secondary-border w-full py-2 text-lightaccent-text dark:text-accent-text text-sm bg-lightsecondary-bg dark:bg-secondary-bg border border-l-0 focus:outline-none rounded-r-md mt-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={`${
            preview ? "flex" : "hidden"
          } lg:flex z-[49] bg-lightprimary-bg dark:bg-primary-bg lg:bg-transparent lg:z-10 w-full bg-darkbg rounded-lg p-6 lg:p-4 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-[calc(50%-31px)] lg:translate-x-0 lg:translate-y-0 lg:static lg:right-auto lg:top-auto lg:w-[45%] h-[calc(100vh-60px)] lg:h-[85vh]`}
        >
          <p
            onClick={() => setPreview(false)}
            className="block lg:hidden absolute top-3 right-3 text-lightprimary-text dark:text-primary-text cursor-pointer"
          >
            <X />
          </p>
          <div className="scale-90 md:scale-100 relative mx-auto border-primary-bg/60 dark:border-black bg-primary-bg/60 dark:bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[130px] h-[18px] bg-primary-bg/60 dark:bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[90px] h-[5px] bg-gray-400 bottom-0.5 z-50 rounded-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[30] h-[18px] text-lightprimary-text dark:text-primary-text text-xs top-0.5 left-[17%] -translate-x-1/2 absolute">
              9:41
            </div>
            <div className="w-[30] h-[18px] text-lightprimary-text dark:text-primary-text text-xs top-[0.3rem] left-[85%] -translate-x-1/2 absolute">
              <BatteryLow size={15} />
            </div>
            <div className="w-[30] h-[18px] text-lightprimary-text dark:text-primary-text text-xs top-0.5 left-[78%] -translate-x-1/2 absolute">
              <SignalMedium size={15} />
            </div>
            <div className="h-[46px] w-[5px] bg-primary-bg/60 dark:bg-black absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[5px] bg-primary-bg/60 dark:bg-black absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[5px] bg-primary-bg/60 dark:bg-black absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="h-[10px] w-[10px] bg-white/10 absolute top-0 left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[5px] w-[5px] bg-white/20 absolute top-[2.5px] left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[10px] w-[50px] bg-white/10 absolute top-0 left-[53%] -translate-x-1/2 rounded-full"></div>
            {fetchLoading ? (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-lightprimary-bg dark:bg-primary-bg flex items-center justify-center">
                <Loader
                  strokeWidth={1.5}
                  size={24}
                  className="animate-spin text-lightprimary-text dark:text-primary-text"
                />
              </div>
            ) : (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-primary-bg/60 dark:bg-black">
                <div className="bg-lightprimary-bg/80 dark:bg-primary-bg/80 w-[272px] h-[572px]"></div>
                <div className="absolute top-4 left-0 w-full h-full p-4">
                  <div className="flex items-center justify-center">
                    <div className="bg-lightsecondary-bg dark:bg-secondary-bg w-[50px] h-[50px] rounded-full p-1 border border-lightsecondary-border dark:border-secondary-border object-cover"></div>
                    <div className="ml-3">
                      <div className="bg-lightsecondary-bg dark:bg-secondary-bg h-[18px] w-[110px] rounded-sm border border-lightsecondary-border dark:border-secondary-border"></div>
                      <div className="flex items-center text-primary-text text-sm mt-1">
                        <div className="bg-lightsecondary-bg dark:bg-secondary-bg h-[12px] w-[40px] rounded-sm border border-lightsecondary-border dark:border-secondary-border"></div>
                        <div className="ml-1 h-3 border-l border-secondary-strongerborder mr-1 "></div>
                        <span className="bg-lightsecondary-bg dark:bg-secondary-bg h-[12px] w-[50px] rounded-sm border border-lightsecondary-border dark:border-secondary-border"></span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <div className="bg-lightsecondary-bg dark:bg-secondary-bg h-[18px] w-[40px] rounded-[0.1875rem] border border-lightsecondary-border dark:border-secondary-border"></div>
                    <div className="bg-lightsecondary-bg dark:bg-secondary-bg h-[18px] w-[50px] rounded-[0.1875rem] border border-lightsecondary-border dark:border-secondary-border"></div>
                    <div className="bg-lightsecondary-bg dark:bg-secondary-bg h-[18px] w-[30px] rounded-[0.1875rem] border border-lightsecondary-border dark:border-secondary-border"></div>
                    <div className="bg-lightsecondary-bg dark:bg-secondary-bg h-[18px] w-[40px] rounded-[0.1875rem] border border-lightsecondary-border dark:border-secondary-border"></div>
                  </div>
                  <div className="w-full flex items-center justify-center ">
                    <div className="bg-lightsecondary-bg dark:bg-secondary-bg h-[40px] w-[95%] mt-2 rounded-[0.1875rem] border border-lightsecondary-border dark:border-secondary-border"></div>
                  </div>
                  <div className="mt-4 border-t border-lightsecondary-border dark:border-secondary-border"></div>
                  <div className="mt-4">
                    <div className="bg-lightsecondary-bg dark:bg-secondary-bg border border-lightsecondary-border dark:border-secondary-border  h-[18px] w-60 rounded-[0.1875rem]"></div>
                    <div className="w-60 h-16 border border-lightsecondary-border dark:border-secondary-border rounded-md mt-2 bg-lightsecondary-bg dark:bg-secondary-bg transition-all ease-out duration-200"></div>
                    <div className="w-60 h-20 border border-lightsecondary-border dark:border-secondary-border rounded-md mt-2 bg-lightsecondary-bg dark:bg-secondary-bg transition-all ease-out duration-200"></div>{" "}
                  </div>
                  <div className="mt-4 border-t border-lightsecondary-border dark:border-secondary-border"></div>
                  <p className="mt-4 text-center text-xs text-primary-text font-medium">
                    Follow my socials !
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {socials.facebook && (
                      <span className="w-8 h-8 rounded-full bg-lightsecondary-bg dark:bg-secondary-bg flex items-center justify-center">
                        <SiFacebook className="text-lightprimary-text dark:text-primary-text" />
                      </span>
                    )}
                    {socials.instagram && (
                      <span className="w-8 h-8 rounded-full bg-lightsecondary-bg dark:bg-secondary-bg flex items-center justify-center">
                        <SiInstagram className="text-lightprimary-text dark:text-primary-text" />
                      </span>
                    )}
                    {socials.x && (
                      <span className="w-8 h-8 rounded-full bg-lightsecondary-bg dark:bg-secondary-bg flex items-center justify-center">
                        <SiX className="text-lightprimary-text dark:text-primary-text" />
                      </span>
                    )}
                    {socials.github && (
                      <span className="w-8 h-8 rounded-full bg-lightsecondary-bg dark:bg-secondary-bg flex items-center justify-center">
                        <SiGithub className="text-lightprimary-text dark:text-primary-text" />
                      </span>
                    )}
                    {socials.linkedin && (
                      <span className="w-8 h-8 rounded-full bg-lightsecondary-bg dark:bg-secondary-bg flex items-center justify-center">
                        <SiLinkedin className="text-lightprimary-text dark:text-primary-text" />
                      </span>
                    )}
                    {socials.youtube && (
                      <span className="w-8 h-8 rounded-full bg-lightsecondary-bg dark:bg-secondary-bg flex items-center justify-center">
                        <SiYoutube className="text-lightprimary-text dark:text-primary-text" />
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

export default SocialLinks;
