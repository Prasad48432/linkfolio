"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader } from "lucide-react";
import { IoIosArrowDropright, IoIosArrowRoundForward } from "react-icons/io";

const hexToRgba = (hex: string, opacity: number) => {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Extract RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ResumeModal = ({
  modal,
  setModal,
  downloadLink,
  theme,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  downloadLink: string;
  theme: any;
}) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  return (
    <AnimatePresence>
      {modal && (
        <div
          className="px-5 z-[100] fixed h-full w-full flex items-center justify-center top-0 left-0 pointer-events-none backdrop-blur"
          style={{
            pointerEvents: "auto",
            background: hexToRgba(theme.primary_bg, 0.2),
          }}
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
            className="relative z-50 w-full border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[0%] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-left-[0%] data-[state=open]:slide-in-from-top-[0%] sm:rounded-lg md:w-full bg-dash-sidebar sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5 !block"
            style={{
              pointerEvents: "auto",
              background: theme.primary_bg || "#121212",
              borderColor: theme.border || "#363636",
            }}
          >
            <div
              style={{
                borderColor: theme.border || "#363636",
                color: theme.primary_text || "#ededed",
              }}
              className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b "
            >
              <h2 className="text-base leading-none font-normal">
                <span className="break-words">Download Resume <span className="wave">😏</span></span>
              </h2>
            </div>
            <div className="py-4 px-5 overflow-hidden">
              <div className="space-y-4">
                <p
                  style={{
                    color: theme.primary_text || "#ededed",
                  }}
                  className="text-sm"
                >
                  A resume tells you what I've done, but this Page shows you
                  what I can do. Still want that PDF?
                </p>
              </div>
            </div>
            <div
              style={{
                background: theme.border || "#363636",
              }}
              className="w-full h-px"
            />
            <div className="flex gap-2 px-5 pt-5 items-center justify-center">
              {/* <button
                onClick={() => setModal(false)}
                data-size="medium"
                type="button"
                style={{
                  background: theme.primary_bg || "#121212",
                  borderColor: theme.border || "#363636",
                }}
                className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover w-full flex items-center justify-center text-sm px-4 py-2 h-[38px]"
              >
                {" "}
                <span className="truncate">Cancel</span>{" "}
              </button>
              <button
                data-size="medium"
                type="submit"
                onClick={() => {
                  setDownloadLoading(true);
                  window.open(downloadLink);
                }}
                className={`relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border border-success-border ${
                  !downloadLoading &&
                  "hover:bg-lightsuccess-selection hover:border-lightsuccess-strongerborder dark:hover:bg-success-selection dark:hover:border-success-strongerborder"
                } text-lightprimary-text bg-lightsuccess-bg dark:text-primary-text dark:bg-success-bg data-[state=open]:border-destructive data-[state=open]:bg-destructive-400 dark:data-[state=open]:bg-destructive-/50 data-[state=open]:outline-destructive w-full flex items-center justify-center text-sm px-4 py-2 h-[38px] truncate`}
              >
                {downloadLoading ? (
                  <Loader size={20} strokeWidth={1} className="animate-spin" />
                ) : (
                  <span className="truncate">Download</span>
                )}
              </button> */}

              <p
                style={{
                  color: theme.primary_text || "#ededed",
                }}
              >
                Download here
              </p>
              <IoIosArrowRoundForward
                size={20}
                style={{
                  color: theme.primary_text || "#ededed",
                }}
              />
              <a
                href={downloadLink}
                style={{
                  color: theme.primary_text || "#ededed",
                }}
                className="underline"
              >
                Resume
              </a>
            </div>
            <button
              onClick={() => setModal(false)}
              type="button"
              style={{
                color: theme.primary_text || "#ededed",
              }}
              className="absolute right-4 top-4 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none "
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

export default ResumeModal;
