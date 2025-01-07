"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "../dashboard";
import Image from "next/image";
import {
  BatteryLow,
  ExternalLink,
  Eye,
  Loader,
  MapPin,
  SignalMedium,
  X,
} from "lucide-react";
import MarkdownParser from "@/components/markdown-parser";

const Projects = () => {
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (preview) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [preview]);
  return (
    <Dashboard>
      <div
        onClick={() => setPreview(true)}
        className="lg:hidden font-bold py-1 px-2 inline-flex items-center justify-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-400 w-[120px] bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
      >
        <Eye strokeWidth={1} className="text-primarytext text-lg mr-1" />
        <p className="text-primarytext font-semibold text-base">Preview</p>
      </div>
      <div className="flex gap-2 h-auto lg:h-[calc(100vh-100px)] relative">
        <div className="lg:w-[55%] w-full lg:overflow-y-auto">
          <div className="mt-2 items-center justify-center flex flex-col gap-4 p-4">
            <div className="h-44 w-full bg-secondary-bg rounded-md"></div>
            <div className="h-44 w-full bg-secondary-bg rounded-md"></div>
            <div className="h-44 w-full bg-secondary-bg rounded-md"></div>
            <div className="h-44 w-full bg-secondary-bg rounded-md"></div>
            <div className="h-44 w-full bg-secondary-bg rounded-md"></div>
            <div className="h-44 w-full bg-secondary-bg rounded-md"></div>
            <div className="h-44 w-full bg-secondary-bg rounded-md"></div>
          </div>
        </div>
        <div
          className={`${
            preview ? "flex" : "hidden"
          } lg:flex scale-90 md:scale-100 z-[49] bg-primary-bg lg:bg-transparent lg:z-10 w-full bg-darkbg rounded-lg p-6 lg:p-4 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-[calc(50%-28px)] lg:translate-x-0 lg:translate-y-0 lg:static lg:right-auto lg:top-auto lg:w-[45%] lg:h-[85vh]`}
        >
          <p
            onClick={() => setPreview(false)}
            className="block lg:hidden absolute top-0 right-0 text-primary-text cursor-pointer"
          >
            <X />
          </p>
          <div className="relative mx-auto border-black dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[130px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[90px] h-[5px] bg-gray-400 bottom-0.5 z-50 rounded-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[17%] -translate-x-1/2 absolute">
              9:41
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-[0.3rem] left-[85%] -translate-x-1/2 absolute">
              <BatteryLow size={15} />
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[78%] -translate-x-1/2 absolute">
              <SignalMedium size={15} />
            </div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[5px] bg-black absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="h-[10px] w-[10px] bg-white/10 absolute top-0 left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[5px] w-[5px] bg-white/20 absolute top-[2.5px] left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[10px] w-[50px] bg-white/10 absolute top-0 left-[53%] -translate-x-1/2 rounded-full"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-black">
              <div className="bg-primary-bg/80 w-[272px] h-[572px]"></div>
              <div className="absolute top-4 left-0 w-full h-full p-4">
                <div
                  style={{
                    backgroundColor: "#343434",
                  }}
                  className="absolute top-[-8px] right-0 m-4 rounded-md p-1 cursor-pointer"
                  title="share"
                >
                  <ExternalLink
                    style={{
                      color: "#ffffff",
                    }}
                    size={16}
                  />
                </div>
                <div className="flex items-center">
                  <Image
                    src={"/avatars/Annie.png"}
                    className="w-[50px] h-[50px] rounded-full p-0.5 border border-secondary-border object-cover"
                    alt="overlay"
                    referrerPolicy="no-referrer"
                    width={200}
                    height={200}
                  />
                  <div className="">
                    <h1 className="text-white text-sm font-bold ml-3">
                      Sai Prasad
                    </h1>
                    <div className="flex justify-center items-center text-gray-300 text-sm mt-[0.1rem] ml-[0.6rem]">
                      <MapPin size={12} />
                      <h2
                        title="India"
                        className="cursor-pointer text-xs ml-0.5 mr-1 max-w-12 text-ellipsis truncate"
                      >
                        India
                      </h2>
                      <div className="h-3 border-l border-secondary-border mr-1"></div>
                      <span className="text-xs">₹</span>
                      <span className="text-xs">20000</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-white text-sm font-semibold">Bio</h3>
                  <MarkdownParser
                    text="hello everyone"
                    className="text-primary-text/80 text-xs"
                  />
                </div>
                <div className="mt-4 border-t border-secondary-border"></div>
                <div className="mt-4">
                  <div className="bg-secondary-bg border border-secondary-border  h-[18px] w-[80px] rounded-[0.1875rem]"></div>
                  <div className="w-60 h-16 border border-secondary-border rounded-md mt-2 bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all ease-out duration-200"></div>
                  <div className="w-60 h-20 border border-secondary-border rounded-md mt-2 bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all ease-out duration-200"></div>
                  <div className="w-60 h-14 border border-secondary-border rounded-md mt-2 bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all ease-out duration-200"></div>
                  <div className="w-60 h-20 border border-secondary-border rounded-md mt-2 bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all ease-out duration-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Projects;
