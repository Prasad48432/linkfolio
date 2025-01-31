import Image from "next/image";
import React from "react";

const LinkPreviewRender = ({ link, theme }: { link: any; theme?: any }) => {
  return (
    <div key={link.id} className="relative">
      <div
        style={{
          background: theme ? theme.secondary_bg : "#262626",
          borderColor: theme ? theme.strongerborder : "#4d4d4d",
        }}
        className="w-60 rounded-md mt-2  px-4 py-2 border-[0.5px] "
      >
        <div className="flex items-center w-full">
          <div className="w-[2.4rem] h-[2.4rem] p-0.5 rounded-full border border-dashed mr-2">
            <Image
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${link.link}`}
              title={link.title}
              alt={link.title}
              width={600}
              height={600}
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-center w-[78%]">
            <a target="_blank" href={`${link.link}`}>
              <p
                style={{
                  color: theme ? theme.primary_text : "#ededed",
                }}
                className=" hover:underline font-semibold text-sm"
              >
                {link.title}
              </p>
            </a>
            <p
              style={{
                color: theme ? theme.primary_text : "#ededed",
              }}
              className="text-mx -mt-0.5 cursor-default overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {link.link}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPreviewRender;
