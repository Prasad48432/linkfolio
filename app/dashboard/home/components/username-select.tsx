"use client";
import { ToastError, ToastSuccess } from "@/components/toast";
import { createClient } from "@/utils/supabase/client";
import { Loader, Signature } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface profileData {
  full_name: string;
  username: string;
  bio: string;
  country: string;
  email: string;
  id: string;
  avatar_url: string;
}

const UsernameSelect = ({
  profileData,
  setProfileData,
  isUsernameThere,
  setIsUsernameThere,
}: {
  profileData: profileData;
  setProfileData: any;
  isUsernameThere: boolean;
  setIsUsernameThere: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const supabase = createClient();
  const [usernameUpdateLoading, setUsernameUpdateLoading] = useState(false);
  const handleUsernameUpdate = async (username: string) => {
    if (!username) {
      ToastError({ message: "Please enter an input." });
      return;
    }

    setUsernameUpdateLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    if (data?.length !== 0) {
      ToastError({ message: "Username already taken." });
      setUsernameUpdateLoading(false);
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("profiles")
        .update({
          username: profileData.username,
        })
        .eq("id", user?.id);

      ToastSuccess({ message: "Username updated." });
      setIsUsernameThere(true);
      setUsernameUpdateLoading(false);
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
      setUsernameUpdateLoading(false);
    }
  };
  return (
    <div>
      <label className="block text-sm font-medium text-lightprimary-text/80 dark:text-primary-text/80 px-1 mb-0.5">
        Username{" "}
      </label>
      <div className="flex items-center justify-center gap-2 relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Signature
            strokeWidth={1}
            size={20}
            className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
          />
        </span>
        <input
          type="text"
          name="username"
          readOnly={isUsernameThere}
          value={profileData.username}
          onChange={(e) =>
            setProfileData((prevData: profileData) => ({
              ...prevData,
              username: e.target.value,
            }))
          }
          className={`${
            isUsernameThere ? "lg:w-full cursor-not-allowed" : "lg:w-[85%]"
          } text-lightprimary-text dark:text-primary-text border-lightsecondary-border dark:border-secondary-border cursor-not-allowed focus:border-lightsecondary-border dark:focus:border-secondary-border w-full py-2 pl-10 text-sm bg-lightsecondary-bg dark:bg-secondary-bg border focus:outline-none rounded-md`}
        />
        {!isUsernameThere && (
          <button
            onClick={() => handleUsernameUpdate(profileData.username)}
            className="w-[15%] flex items-center justify-center text-sm bg-lightaccent-bg hover:bg-lightaccent-selection border border-lightaccent-border hover:border-lightaccent-strongerborder dark:bg-accent-bg dark:hover:bg-accent-selection dark:border-accent-border dark:hover:border-accent-strongerborder transition-all duration-200 ease-out px-3 py-2 rounded-md"
          >
            {usernameUpdateLoading ? (
              <Loader className="animate-spin" strokeWidth={1} size={20} />
            ) : (
              "Update"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default UsernameSelect;
