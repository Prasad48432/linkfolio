import React from "react";

const HeroLoader = () => {
  return (
    <div className="flex gap-4 items-center justify-center w-[504px] h-[76px] relative">
      <div className="absolute h-full w-28 bg-gradient-to-r from-lightprimary-bg dark:from-primary-bg to-transparent z-10 pointer-events-none left-0 top-0"></div>
      <div className="absolute h-full w-28 bg-gradient-to-l from-lightprimary-bg dark:from-primary-bg to-transparent z-10 pointer-events-none right-0 top-0"></div>
      <div className="w-12 md:w-14 h-12 md:h-14 bg-lightsecondary-loader dark:bg-secondary-bg rounded-full relative overflow-hidden opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
      </div>
      <div className="w-12 md:w-14 h-12 md:h-14 bg-lightsecondary-loader dark:bg-secondary-bg rounded-full relative overflow-hidden  opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
      </div>
      <div className="w-12 md:w-14 h-12 md:h-14 bg-lightsecondary-loader dark:bg-secondary-bg rounded-full relative overflow-hidden  opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
      </div>
      <div className="w-12 md:w-14 h-12 md:h-14 bg-lightsecondary-loader dark:bg-secondary-bg rounded-full relative overflow-hidden  opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
      </div>
      <div className="w-12 md:w-14 h-12 md:h-14 bg-lightsecondary-loader dark:bg-secondary-bg rounded-full relative overflow-hidden  opacity-70">
        <div className="absolute inset-0 bg-gradient-to-r from-lightsecondary-loader via-gray-300 to-lightsecondary-loader dark:from-secondary-bg dark:via-gray-400/10 dark:to-secondary-bg animate-shimmer" />
      </div>
    </div>
  );
};

export default HeroLoader;
