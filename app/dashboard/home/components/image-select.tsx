"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { RiImageAddLine } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import { Loader } from "lucide-react";
import { handleImageClick } from "../utils/handle-image-click";

const Images = [
  "Annie",
  "Buster",
  "Chester",
  "Chloe",
  "Daisy",
  "Dusty",
  "Felix",
  "Kitty",
  "Lilly",
  "Luna",
  "Midnight",
  "Misty",
  "Nala",
  "Oreo",
  "Oscar",
  "Rocky",
  "Sam",
  "Shadow",
  "Simba",
  "Snickers",
  "Sophie",
  "Tiger",
  "Tinkerbell",
  "Toby",
];

const ImageSelect = ({
  modal,
  setModal,
  image,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <AnimatePresence>
      {modal && (
        <div
          style={{ pointerEvents: "auto" }}
          className="px-5 z-[100] fixed h-full w-full flex items-center justify-center top-0 left-0 bg-black/20 backdrop-blur"
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
            style={{ pointerEvents: "auto" }}
            className="absolute z-10 py-5 bg-lightprimary-bg dark:bg-primary-bg h-[60vh] lg:h-[60vh] w-[90vw] sm:w-[40vw] rounded-lg border border-secondary-border text-primary-text"
          >
            <button
              onClick={() => {
                setModal((modal) => !modal);
                setLoading(false);
              }}
              className="absolute top-0 right-0 -mt-4 -mr-4 bg-lightprimary-bg dark:bg-primary-bg text-lightprimary-text dark:text-primary-text border border-secondary-border hover:border-secondary-strongerborder h-8 w-8 block mb-2 rounded-full font-bold text-lg duration-200 transition-all ease-out"
            >
              &times;
            </button>
            <h1 className="text-lg md:text-xl text-center mt-2 font-normal text-lightprimary-text/90 dark:text-primary-text/90">
              Select Image
            </h1>
            <p className="text-center text-xs md:text-base mb-8 text-lightprimary-text/70 dark:text-primary-text/70 font-light">
              Select from Basic Avatars or pick local image
            </p>
            <div className="divide-y divide-lightsecondary-strongerborder dark:divide-secondary-strongerborder">
              <div
                onClick={() => {
                  document.getElementById("fileInput")?.click();
                  setLoading(true);
                }}
                title="Select Local Image"
                className="flex items-center justify-center mb-4 "
              >
                {loading ? (
                  <Loader
                    className="animate-spin text-lightprimary-text/70 dark:text-primary-text/70"
                    strokeWidth={1}
                    size={30}
                  />
                ) : (
                  <RiImageAddLine className="text-lightprimary-text/80 dark:text-primary-text/80 text-4xl md:text-5xl hover:text-gray-500 dark:hover:text-gray-400 hover:border-lightsecondary-strongerborder dark:hover:border-secondary-strongerborder cursor-pointer p-2 border border-dashed border-lightsecondary-border dark:border-secondary-border duration-200 transition-all ease-out" />
                )}
              </div>
              <div className="mt-8 sm:mx-auto sm:w-full px-8 lg:px-12 grid grid-cols-6 lg:grid-cols-8 gap-2 pt-6 md:pt-8">
                {Images.map((simage, index) => (
                  <div
                    onClick={() => {
                      handleImageClick({
                        simage: simage,
                        image: image,
                        setModal: setModal,
                      });
                    }}
                    key={index}
                    className="relative cursor-pointer"
                  >
                    {image === `/avatars/${simage}.png` && (
                      <IoMdCheckmark
                        className="absolute text-green-500 text-xl md:text-3xl z-50"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                    <Image
                      key={index}
                      title={simage}
                      src={`/avatars/${simage}.png`}
                      width={500}
                      height={500}
                      className={`${
                        image === `/avatars/${simage}.png`
                          ? "border p-0.5 border-lightprimary-text dark:border-primary-text opacity-75"
                          : ""
                      } col-span-1 rounded-full`}
                      referrerPolicy="no-referrer"
                      alt="popoverimage"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={() => {
              setModal((modal) => !modal);
              setLoading(false);
            }}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageSelect;
