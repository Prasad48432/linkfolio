"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { logout } from "../action";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { ToastError, ToastSuccess } from "@/components/toast";

const LogoutConfiramtion = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await logout();

      if (response.success) {
        ToastSuccess({message: "Logout successful!"})

        setLogoutLoading(false);
        setModal(false);
        router.push("/login");
      }
    } catch (error) {
      setLogoutLoading(false);
      ToastError({message: "An unexpected error occurred. Please try again."});
    }
  };

  return (
    <AnimatePresence>
      {modal && (
        <div
          className="px-5 z-[100] fixed h-full w-full flex items-center justify-center top-0 left-0 bg-black/20 backdrop-blur"
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -50,
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            className="relative z-50 w-full border border-secondary-border bg-primary-bg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%] sm:rounded-lg md:w-full bg-dash-sidebar sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5 !block"
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b border-secondary-border">
              <h2
                id="radix-:r9q:"
                className="text-base leading-none font-normal"
              >
                <span className="break-words">Confirm Logout</span>
              </h2>
            </div>
            <div className="py-4 px-5 overflow-hidden">
              <div className="space-y-4">
                <p className="text-sm text-foreground-light">
                  Are you sure you want to logout of your account?
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-border" />
            <div className="flex gap-2 px-5 pt-5">
              <button
                onClick={() => setModal(false)}
                data-size="medium"
                type="button"
                className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border border-secondary-border text-primary-text hover:bg-secondary-selection bg-secondary-bg hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover w-full flex items-center justify-center text-sm px-4 py-2 h-[38px]"
              >
                {" "}
                <span className="truncate">Cancel</span>{" "}
              </button>
              <button
                data-size="medium"
                type="submit"
                onClick={() => handleLogout()}
                className={`relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border border-danger-border ${
                  !logoutLoading &&
                  "hover:bg-danger-selection hover:border-danger-strongerborder"
                } text-primary-text bg-danger-bg data-[state=open]:border-destructive data-[state=open]:bg-destructive-400 dark:data-[state=open]:bg-destructive-/50 data-[state=open]:outline-destructive w-full flex items-center justify-center text-sm px-4 py-2 h-[38px] truncate`}
              >
                {logoutLoading ? (
                  <Loader size={20} strokeWidth={1} className="animate-spin" />
                ) : (
                  <span className="truncate">Logout</span>
                )}
              </button>
            </div>
            <button
              onClick={() => setModal(false)}
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-20 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutConfiramtion;
