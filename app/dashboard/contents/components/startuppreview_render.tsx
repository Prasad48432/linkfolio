import { formatEarnings } from "@/lib/format-earnings";
import React from "react";
import StatusBadge from "./statusbadge";
import CategoryBadge from "./categorybadge";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const StartupPreviewRender = ({
  startup,
  theme,
}: {
  startup: any;
  theme?: any;
}) => {
  return (
    <div key={startup.id} className="relative">
      <div className="absolute top-5 right-2 flex items-center">
        <div className="text-primary-text flex items-center justify-between">
          <div className="flex items-center justify-center">
            {startup.status === "discontinued" ? (
              <span className="text-[0.6rem] bg-red-200 font-bold pl-1 rounded-l-full">
                🚫
              </span>
            ) : (
              <span className="text-[0.5rem] bg-violet-500 font-bold pl-1.5 pr-1 rounded-l-full">
                ₹
              </span>
            )}
            {startup.status === "discontinued" ? (
              <span className="text-[0.55rem] text-red-700 bg-red-200 rounded-r-lg pr-1 p-[0.055rem]">
                discontinued
              </span>
            ) : (
              <span className="text-[0.5rem] bg-primary-text text-black rounded-r-lg pl-0.5 pr-0.5 ">
                {formatEarnings(startup.estimated_revenue)}/m
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          background: theme ? theme.secondary_bg : "#262626",
          borderColor: theme ? theme.strongerborder : "#4d4d4d",
        }}
        className="w-60 rounded-md mt-2 p-4 border-[0.5px]"
      >
        <div className="flex items-center">
          <div
          style={{
            borderColor: theme ? theme.strongerborder : "#4d4d4d",
          }} className="w-[2.4rem] h-[2.4rem] p-0.5 rounded-full border border-dashed mr-2">
            <Image
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.website}`}
              title={startup.name}
              alt={startup.name}
              width={600}
              height={600}
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="">
            <a
              style={{
                color: theme ? theme.primary_text : "#ededed",
              }}
              target="_blank"
              href={`https://${startup.website}`}
            >
              <p className="hover:underline font-semibold text-sm -mb-1.5">
                {startup.name}
              </p>
            </a>
            {startup.show_status && startup.status !== "discontinued" && (
              <StatusBadge startup={startup} size={"sm"} />
            )}
            <CategoryBadge object={startup} size={"sm"} />
          </div>
        </div>
        {startup.status !== "discontinued" &&
          startup.show_toggle !== "none" && (
            <hr
              style={{
                borderColor: theme ? theme.strongerborder : "#4d4d4d",
              }}
              className="border-t  my-2 w-full"
            />
          )}
        {startup.status !== "discontinued" &&
          startup.show_toggle !== "none" && (
            <span
              style={{
                color: theme ? theme.primary_text : "#ededed",
              }}
              className=" mt-2 text-mx markdown_content"
            >
              {startup.status !== "discontinued" &&
                startup.show_toggle !== "none" && (
                  <>
                    {startup.show_toggle === "revn" ? (
                      <></>
                    ) : (
                      <ReactMarkdown>{startup.description}</ReactMarkdown>
                    )}
                  </>
                )}
            </span>
          )}
      </div>
    </div>
  );
};

export default StartupPreviewRender;
