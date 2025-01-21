"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { ToastError, ToastSuccess } from "@/components/toast";
import { Loader } from "lucide-react";

const ToggleSwitch = ({ inputBoolean }: { inputBoolean: boolean }) => {
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
    <div
      onClick={() => handleUpdate(!inputBoolean)}
      className={`w-10 h-6 border-[0.5px] flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ease-out ${
        inputBoolean
          ? "bg-accent-bg border-accent-border"
          : "bg-secondary-bg border-secondary-border"
      }`}
    >
      <motion.div
        className="w-4 h-4 bg-gray-300 rounded-full shadow-md flex items-center justify-center"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        animate={{ x: inputBoolean ? 16 : 0 }}
      >
        {loading && (
          <Loader strokeWidth={1} className="animate-spin text-black w-3 h-3" />
        )}
      </motion.div>
    </div>
  );
};

export default ToggleSwitch;
