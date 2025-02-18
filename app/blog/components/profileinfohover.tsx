import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import MarkdownParser from "@/components/markdown-parser";
import { ICONS_MAP_SMALL } from "@/app/dashboard/home/components/icons-map-small";

interface Skill {
  name: string;
  icon: string;
}

const ProfileHoverInfo = ({ profile }: { profile: any }) => {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger className="font-medium text-primary-text/80 cursor-pointer">
        {profile.full_name}
        <span className="block -mt-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 h-[2px] bg-primary-text/80"></span>
      </HoverCardTrigger>

      <HoverCardContent className="bg-primary-bg border border-secondary-strongerborder rounded-md z-50 relative">
        <div className="flex flex-col gap-3 p-2 w-full">
          <div className="flex items-center justify-start gap-3 w-full">
            <Image
              width={500}
              height={500}
              alt="user profile image"
              src={profile.avatar_url}
              className="w-12 h-12 flex-shrink-0 rounded-full object-cover"
            />
            <div className="flex flex-col items-start justify-center w-[calc(100%-3rem)]">
              <p title={profile.full_name} className="text-primary-text/90 font-medium text-lg line-clamp-1">
                {profile.full_name}
              </p>
              <div className="flex gap-1 items-center justify-start font-light text-sm">
                <p title={profile.country.split("-")[0]} className="text-primary-text/80 flex items-center justify-start gap-0.5 max-w-20">
                  <Image
                    src={`https://flagsapi.com/${
                      profile.country.split("-")[1]
                    }/flat/64.png`}
                    height={25}
                    width={25}
                    alt={profile.country.split("-")[0]}
                    className="h-4 w-4 object-cover"
                  />
                  <span className="text-ellipsis truncate">{profile.country.split("-")[0]}</span>
                </p>
                <div className="h-3 w-px bg-primary-text/70 flex-shrink-0"></div>
                <p className="text-primary-text/80 flex items-center justify-start gap-0.5">
                  <FaRupeeSign />
                  2.6cr/m
                </p>
              </div>
            </div>
          </div>
          <MarkdownParser
            className="text-primary-text/80 text-sm font-light line-clamp-3 text-center"
            text={profile.bio}
          />
          <div className="flex items-center justify-center flex-wrap gap-1">
            {(profile.user_skills as Skill[]).map((skill) => (
              <div
                key={skill.name}
                className="flex bg-secondary-bg border-secondary-strongerborder cursor-pointer items-center justify-center gap-1 px-1.5 py-1 border rounded-md"
              >
                <span className="">{ICONS_MAP_SMALL[skill.icon]}</span>
                <span className="text-xs font-light select-none">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProfileHoverInfo;
