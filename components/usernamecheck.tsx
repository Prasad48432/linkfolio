"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Loader, MoveRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { AnimatePresence, motion } from "motion/react";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const UsernameCheck = () => {
  const supabase = createClient();
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameCheck, setUsernameCheck] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const checkUsername = async (username: string) => {
    if (!username) return;
    setUsernameLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username);

    setUsernameAvailable(data?.length === 0);
    setUsernameLoading(false);
    setIsTyping(false);
  };

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedUpdateField = useCallback(debounce(checkUsername, 800), []);

  const handleChange = (value: string) => {
    setUsernameCheck(value);
    setIsTyping(true);
    debouncedUpdateField(value); // Pass value directly
  };

  return (
    <div className="flex flex-col items-center justify-center w-[95%]">
      <div className="mb-2 flex items-center w-full max-w-lg bg-secondary-bg rounded-full border border-secondary-border focus:border-secondary-strongerborder hover:border-secondary-strongerborder duration-200 transition-all ease-out p-0.5 lg:p-1">
        <span className="text-primary-text pl-3 lg:pl-4 font-medium text-sm lg:text-lg">
          linkfolio.page/
        </span>
        <input
          type="text"
          placeholder="username"
          value={usernameCheck}
          onChange={(e) => handleChange(e.target.value)}
          style={{
            color:
              isTyping || !usernameCheck
                ? "#ffffff" // White while typing or empty
                : usernameAvailable
                ? "#22c55e" // Green if available
                : "#ef4444", // Red if not available
          }}
          className="flex-1 border-none outline-none py-1 lg:py-2 bg-transparent text-primary-text/80 text-sm lg:text-lg w-[90%] transition-colors duration-300"
        />

        <a
          style={{
            cursor:
              usernameAvailable && usernameCheck && !usernameLoading
                ? "pointer"
                : "default",
          }}
          className={`border group/home-input aria-disabled:opacity-50 bg-accent-bg aria-disabled:hover:bg-accent-bg aria-disabled:hover:border-accent-border hover:bg-accent-selection hover:border-accent-strongerborder border-accent-border rounded-full p-2 lg:p-3 transition-all ease-out duration-200`}
          href={
            usernameAvailable && usernameCheck && !usernameLoading
              ? `/register?username=${usernameCheck}`
              : undefined
          }
          aria-disabled={!usernameCheck || !usernameAvailable}
        >
          {usernameLoading && usernameCheck ? (
            <Loader size={20} strokeWidth={1} className="animate-spin" />
          ) : (
            <MoveRight
              aria-disabled={!usernameCheck || !usernameAvailable}
              className="aria-disabled:group-hover/home-input:translate-x-0 group-hover/home-input:translate-x-0.5 transition-all duration-200 ease-out"
              size={20}
            />
          )}
        </a>
      </div>
      <AnimatePresence>
        {usernameAvailable && !isTyping && usernameCheck ? (
          <motion.p
            className="text-green-500 text-sm lg:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            Cheers, username available. 🤩
          </motion.p>
        ) : !usernameAvailable && !isTyping && usernameCheck ? (
          <motion.p
            className="text-red-500 text-sm lg:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            Sorry, username already taken. 😔
          </motion.p>
        ) : (
          <motion.p
            className="text-primary-text/80 text-sm lg:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            Claim your username, it's not too late.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsernameCheck;
