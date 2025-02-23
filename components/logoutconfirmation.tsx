"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/action";
import { Loader } from "lucide-react";
import { ToastError, ToastSuccess } from "@/components/toast";

const LogoutConfirmation = ({
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
        router.refresh();
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
          className="px-5 z-[100] fixed h-full w-full flex items-center justify-center top-0 left-0 pointer-events-none bg-black/20 backdrop-blur"
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
            className="relative z-50 w-full border border-lightsecondary-border bg-lightprimary-bg dark:border-secondary-border dark:bg-primary-bg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%] sm:rounded-lg md:w-full bg-dash-sidebar sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5 !block"
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b border-lightsecondary-border dark:border-secondary-border">
              <h2
                id="radix-:r9q:"
                className="text-base leading-none font-normal"
              >
                <span className="break-words text-lightprimary-text dark:text-primary-text">Confirm Logout</span>
              </h2>
            </div>
            <div className="py-4 px-5 overflow-hidden">
              <div className="space-y-4">
                <p className="text-sm text-lightprimary-text/80 dark:text-primary-text/80">
                  Are you sure you want to logout of your account?
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-lightsecondary-border dark:bg-secondary-border" />
            <div className="flex gap-2 px-5 pt-5">
              <button
                onClick={() => setModal(false)}
                data-size="medium"
                type="button"
                className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border border-lightsecondary-border text-lightprimary-text hover:bg-lightsecondary-selection bg-lightsecondary-bg hover:border-lightsecondary-strongerborder dark:border-secondary-border dark:text-primary-text dark:hover:bg-secondary-selection dark:bg-secondary-bg dark:hover:border-secondary-strongerborder focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover w-full flex items-center justify-center text-sm px-4 py-2 h-[38px]"
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
                  "hover:bg-lightdanger-selection hover:border-lightdanger-strongerborder dark:hover:bg-danger-selection dark:hover:border-danger-strongerborder"
                } text-lightprimary-text bg-lightdanger-bg dark:text-primary-text dark:bg-danger-bg data-[state=open]:border-destructive data-[state=open]:bg-destructive-400 dark:data-[state=open]:bg-destructive-/50 data-[state=open]:outline-destructive w-full flex items-center justify-center text-sm px-4 py-2 h-[38px] truncate`}
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
              className="absolute right-4 text-lightprimary-text/60 dark:text-primary-text/60 top-4 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none "
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

export default LogoutConfirmation;
