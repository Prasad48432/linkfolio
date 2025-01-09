"use client";
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
  refetch,
}: {
  profileData: profileData;
  setProfileData: any;
  isUsernameThere: boolean;
  setIsUsernameThere: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => Promise<void>;
}) => {
  const supabase = createClient();
  const [usernameUpdateLoading, setUsernameUpdateLoading] = useState(false);
  const handleUsernameUpdate = async (username: string) => {
    if (!username) {
      toast.error("Please enter an input.", {
        duration: 1300,
        style: {
          background: "rgb(77 35 29/0.9)",
          color: "#ededed",
          border: "1px solid #e6563c",
        },
      });

      return;
    }

    setUsernameUpdateLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    if (data?.length !== 0) {
      toast.error("Username already taken.", {
        duration: 1000,
        style: {
          background: "rgb(77 35 29/0.9)",
          color: "#ededed",
          border: "1px solid #e6563c",
        },
      });
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

      toast.success("Username updated.", {
        duration: 1000,
        style: {
          background: "#1a1a1a",
          color: "#89e15a",
          border: "1px solid #363636",
        },
      });
      fetch
      setIsUsernameThere(true);
      setUsernameUpdateLoading(false);
    } catch (error) {
      toast.error(`${error}`, {
        duration: 1000,
        style: {
          background: "rgb(77 35 29/0.9)",
          color: "#ededed",
          border: "1px solid #e6563c",
        },
      });
      setUsernameUpdateLoading(false);
    }
  };
  return (
    <div>
      <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
        Username{" "}
      </label>
      <div className="flex items-center justify-center gap-2 relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Signature
            strokeWidth={1}
            size={20}
            className="text-primary-text/80 text-xl"
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
          } w-full border-secondary-border focus:border-secondary-border px-3 py-2 pl-9 text-sm bg-secondary-bg border focus:outline-none rounded-md`}
        />
        {!isUsernameThere && (
          <button
            onClick={() => handleUsernameUpdate(profileData.username)}
            className="w-[15%] flex items-center justify-center text-sm bg-accent-bg hover:bg-accent-selection border border-accent-border hover:border-accent-strongerborder transition-all duration-200 ease-out px-3 py-2 rounded-md"
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
