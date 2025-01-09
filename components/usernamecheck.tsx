"use client";
import React, { useState, useEffect } from "react";
import { Loader, MoveRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const UsernameCheck = () => {
  const supabase = createClient();
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  let debounceTimer: NodeJS.Timeout;

  const checkUsername = async (username: string) => {
    if (!username) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);
    setUsernameAvailable(data?.length === 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsernameCheck(value);
    setUsernameLoading(true);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      checkUsername(value).then(() => {
        setUsernameLoading(false);
      });
    }, 1000);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 flex items-center w-full max-w-lg bg-secondary-bg rounded-full border border-secondary-strongerborder p-0.5 lg:p-1">
        <span className="text-primary-text pl-3 lg:pl-4 font-medium text-sm lg:text-lg">
          linkfolio.page/
        </span>
        <input
          type="text"
          placeholder="username"
          value={usernameCheck}
          onChange={handleChange}
          style={{
            color:
              usernameAvailable && usernameCheck && !usernameLoading
                ? "#22c55e"
                : !usernameAvailable && usernameCheck && !usernameLoading
                ? "#ef4444"
                : "#ededed",
          }}
          className="flex-1 border-none outline-none py-1 lg:py-2 bg-transparent text-primary-text/80 text-sm lg:text-lg"
        />
        <a
          style={{
            cursor:
              usernameAvailable && usernameCheck && !usernameLoading
                ? "pointer"
                : "default",
          }}
          className={`border group/home-input bg-accent-bg border-accent-border rounded-full p-2 lg:p-3 transition-all ease-out duration-200`}
          href={
            usernameAvailable && usernameCheck && !usernameLoading
              ? `/register?username=${usernameCheck}`
              : undefined
          }
        >
          {usernameLoading && usernameCheck ? (
            <Loader size={20} strokeWidth={1} className="animate-spin" />
          ) : (
            <MoveRight
              className="group-hover/home-input:translate-x-0.5 transition-all duration-200 ease-out"
              size={20}
            />
          )}
        </a>
      </div>
      {usernameAvailable && usernameCheck && !usernameLoading ? (
        <p className="text-green-500 text-sm lg:text-base">
          Cheers username available.
        </p>
      ) : !usernameAvailable && usernameCheck && !usernameLoading ? (
        <p className="text-red-500 text-sm lg:text-base">
          Sorry username already taken
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UsernameCheck;
