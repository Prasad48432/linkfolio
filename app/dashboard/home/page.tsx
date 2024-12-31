import React from "react";
import Dashboard from "../page";
import { BatteryLow, SignalMedium, ExternalLink, MapPin } from "lucide-react";

const Home = () => {
  return (
    <Dashboard>
      <div className="flex flex-col md:flex-row h-[calc(100vh-100px)]">
        {/* Left Part */}
        <div className="w-full md:w-[55%] overflow-y-auto md:overflow-y-scroll bg-primary-bg p-4">
          <h1 className="text-xl font-bold">Left Part</h1>
          <p className="mt-4">
            This is the left part. On medium and larger devices, this section
            occupies 70% of the width and is scrollable. On smaller devices,
            this section occupies 100% of the width.
          </p>
          <div className="space-y-4 mt-4">
            {Array.from({ length: 20 }).map((_, idx) => (
              <p key={idx} className="p-2 bg-secondary-bg rounded">
                Scrollable content item {idx + 1}
              </p>
            ))}
          </div>
        </div>

        {/* Right Part */}
        <div className="hidden md:block md:w-[45%] bg-primary-bg p-4 h-full sticky top-0">
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
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-black">
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
                    size={20}
                  />
                </div>
                <div className="flex items-center">
                  <img
                    src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jessica"
                    className="w-[50px] h-[50px] rounded-full p-0.5 border border-secondary-border object-cover"
                    alt="overlay"
                    referrerPolicy="no-referrer"
                  />
                  <div className="">
                    <h1 className="text-white text-sm font-bold ml-3">
                      Sai Prasad
                    </h1>
                    <div className="flex justify-center items-center text-gray-300 text-sm mt-[0.1rem] ml-[0.6rem]">
                      <MapPin  size={14} />
                      <h2 className="text-sm ml-0.5 mr-1">India</h2>
                      <div className="h-3 border-l border-secondary-border mr-1"></div>
                      <span className="text-xs">₹</span>
                      <span className="text-xs">2000000/month</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-white text-sm font-semibold">
                    Description
                  </h3>
                  <span className="text-gray-300 text-xs markdown_content">
                    Hello it prasad from downtown , Bang!, Bang!, curry knocks
                    it from downtown
                  </span>
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

export default Home;
