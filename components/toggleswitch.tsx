"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { ToastError, ToastSuccess } from "./toast";
import { Loader } from "lucide-react";

const ToggleSwitch = ({
  resumeUrlVisibility,
}: {
  resumeUrlVisibility: boolean;
}) => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (inputBoolean: boolean) => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            resume_url_visibility: inputBoolean,
          })
          .eq("id", user.id);

        if (error) {
          ToastError({ message: "Update unsuccessful." });
        } else {
          ToastSuccess({ message: "Update successful." });
        }
      }
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute bottom-0 lg:bottom-auto right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-3 lg:top-1/2 -translate-y-1/2 flex flex-row lg:flex-col items-center justify-center gap-1">
      <p className="text-primary-text/80 font-extralight">visibility</p>
      <div
        onClick={() => handleUpdate(!resumeUrlVisibility)}
        className={`w-10 h-6 border-[0.5px] flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ease-out ${
          resumeUrlVisibility
            ? "bg-success-bg border-success-border"
            : "bg-[#1a1a1a] border-secondary-strongerborder"
        }`}
      >
        <motion.div
          className="w-4 h-4 bg-gray-300 rounded-full shadow-md flex items-center justify-center"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          animate={{ x: resumeUrlVisibility ? 16 : 0 }}
        >
          {loading && (
            <Loader
              strokeWidth={1}
              className="animate-spin text-black w-3 h-3"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
