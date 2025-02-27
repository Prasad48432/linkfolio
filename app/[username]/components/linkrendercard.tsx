import Image from "next/image";
import React from "react";

const LinkRenderCard = ({ link, theme }: { link: any; theme?: any }) => {
  return (
    <div key={link.id} className="relative col-span-2 lg:col-span-1">
      <div
        style={{
          background: theme ? theme.secondary_bg : "#262626",
          borderColor: theme ? theme.strongerborder : "#4d4d4d",
        }}
        className="w-full rounded-md mt-2 px-4 py-2 border"
      >
        <div className="flex items-center w-full gap-2">
          <div
            style={{
              borderColor: theme ? theme.strongerborder : "#4d4d4d",
            }}
            className="w-[3.5rem] h-[3.5rem] p-1 rounded-full border lg:border-2 border-dashed"
          >
            <Image
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${link.link}`}
              title={link.title}
              alt={link.title}
              width={600}
              height={600}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center w-[calc(100%-4.5rem)]">
            <a target="_blank" href={`${link.link}`}>
              <p
                style={{
                  color: theme ? theme.primary_text : "#ededed",
                }}
                className="hover:underline font-semibold text-base"
              >
                {link.title}
              </p>
            </a>
            <p
              style={{
                color: theme ? theme.primary_text : "#ededed",
              }}
              title={link.link}
              className="text-xs lg:text-sm -mt-0.5 cursor-default overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {link.link}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkRenderCard;
