import React from "react";

const FeatureShowcase = () => {
  return (
    <div className="">
      <div className="bg-lightprimary-bg dark:bg-primary-bg">
        <div className="h-auto lg:h-[85vh] max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8 mt-5">
          <div className="w-full lg:w-1/2 items-center justify-center flex">
            <div className="border border-lightsecondary-border dark:border-secondary-border lg:border-2 rounded-2xl p-0 lg:p-1 w-[90vw] h-auto md:w-[450px] md:h-[450px]">
              <img src="/holder.gif" className="rounded-2xl" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left p-4">
            <h1 className="text-2xl lg:text-5xl font-extrabold text-lightprimary-text dark:text-primary-text mb-4">
              Share your Startup story with everyone
            </h1>
            <p className="text-lg lg:text-xl text-lightprimary-text/60 dark:text-primary-text/60">
              Profile gives the viewers a brief description of yourself and your
              entrepreneurial journey which helps you connect with similar
              entrepreneurs and grow together
            </p>
          </div>
        </div>
      </div>
      <div className="bg-lightprimary-bg dark:bg-primary-bg">
        <div className="h-auto lg:h-[85vh] max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center justify-center gap-8 px-4 py-8 mt-5">
          <div className="w-full lg:w-1/2 items-center justify-center flex">
            <div className="border border-lightsecondary-border dark:border-secondary-border lg:border-2 rounded-2xl p-0 lg:p-1 w-[90vw] h-auto md:w-[450px] md:h-[450px]">
              <img src="/holder.gif" className="rounded-2xl" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left p-4">
            <h1 className="text-2xl lg:text-5xl font-extrabold text-lightprimary-text dark:text-primary-text mb-4">
              Add your Startup's and get ready to publish
            </h1>
            <p className="text-lg lg:text-xl text-lightprimary-text/60 dark:text-primary-text/60">
              A free startup page, accessible to everyone. Simply add your
              startup details and get ready to publish your page anytime to
              showcase your project and Startups.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-lightprimary-bg dark:bg-primary-bg">
        <div className="h-auto lg:h-[85vh] max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-8 mt-5">
          <div className="w-full lg:w-1/2 items-center justify-center flex">
            <div className="border border-lightsecondary-border dark:border-secondary-border lg:border-2 rounded-2xl p-0 lg:p-1 w-[90vw] h-auto md:w-[450px] md:h-[450px]">
              <img src="/holder.gif" className="rounded-2xl" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left p-4">
            <h1 className="text-2xl lg:text-5xl font-extrabold text-lightprimary-text dark:text-primary-text mb-4 tracking-wide">
              Truly your own verified Audience
            </h1>
            <p className="text-lg lg:text-xl text-lightprimary-text/60 dark:text-primary-text/60">
              discover you true audience with advanced analytics features
              newsletter keeps your audience up to date about your latest
              startup news
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
