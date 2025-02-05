"use client";
import React from "react";
import { ProfileData } from "@/types/user";
import { ArrowRight, Mail } from "lucide-react";
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";

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

const MobileSocialsRender = ({ profile }: { profile: ProfileData }) => {
  return (
    <>
      <p
        className="lg:hidden block text-base font-semibold text-center mt-8"
        style={{
          color: profile.theme.primary_text || "#ededed",
        }}
      >
        {profile.newsletter_config.newsletter_title}
      </p>

      <div className="lg:hidden flex items-center justify-center relative w-full mt-3">
        <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center">
          <Mail
            strokeWidth={1}
            size={17}
            style={{
              color: profile.theme.primary_text || "#ededed",
            }}
            className=" text-xl"
          />
        </span>
        <input
          type="text"
          name="full_name"
          value=""
          readOnly
          placeholder="email@google.com"
          style={{
            background: profile.theme.secondary_bg || "#262626",
            borderColor: profile.theme.strongerborder || "#4d4d4d",
            color: profile.theme.primary_text || "#ededed",
          }}
          className="border-r-0 w-full py-2 pl-9 text-sm border focus:outline-none rounded-l-md custom-placeholder"
        />
        <style jsx>{`
          .custom-placeholder::placeholder {
            color: ${hexToRgba(profile.theme.primary_text, 0.6) || "#ededed"};
          }
        `}</style>
        <button
          style={{
            background: profile.theme.secondary_bg || "#262626",
            borderColor: profile.theme.strongerborder || "#4d4d4d",
            color: profile.theme.primary_text || "#ededed",
          }}
          className="cursor-pointer py-2 px-4 text-sm rounded-r-md border "
        >
          <ArrowRight
            style={{
              color: profile.theme.primary_text || "#ededed",
            }}
            size={20}
          />
        </button>
      </div>
      <div className="w-full lg:hidden block">
        <p
          style={{
            color: profile.theme.primary_text || "#ededed",
          }}
          className="text-base font-semibold text-center mt-6 mb-4"
        >
          Follow my socials !
        </p>
        <div className="mt-3 mb-4 flex items-center justify-center gap-2">
          {profile.socials.facebook && (
            <a
              target="_blank"
              href={`https://facebook.com/${profile.socials.facebook}`}
              style={{
                background: profile.theme.secondary_bg || "#262626",
                color: profile.theme.primary_text || "#ededed",
                borderColor: profile.theme.strongerborder || "#4d4d4d",
              }}
              className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border"
            >
              <SiFacebook size={20} />
            </a>
          )}
          {profile.socials.instagram && (
            <a
              target="_blank"
              href={`https://instagram.com/${profile.socials.instagram}`}
              style={{
                background: profile.theme.secondary_bg || "#262626",
                color: profile.theme.primary_text || "#ededed",
                borderColor: profile.theme.strongerborder || "#4d4d4d",
              }}
              className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border"
            >
              <SiInstagram size={20} />
            </a>
          )}
          {profile.socials.x && (
            <a
              target="_blank"
              href={`https://x.com/${profile.socials.x}`}
              style={{
                background: profile.theme.secondary_bg || "#262626",
                color: profile.theme.primary_text || "#ededed",
                borderColor: profile.theme.strongerborder || "#4d4d4d",
              }}
              className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border"
            >
              <SiX size={20} />
            </a>
          )}
          {profile.socials.github && (
            <a
              target="_blank"
              href={`https://github.com/${profile.socials.github}`}
              style={{
                background: profile.theme.secondary_bg || "#262626",
                color: profile.theme.primary_text || "#ededed",
                borderColor: profile.theme.strongerborder || "#4d4d4d",
              }}
              className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border"
            >
              <SiGithub size={20} />
            </a>
          )}
          {profile.socials.linkedin && (
            <a
              target="_blank"
              href={`https://linkedin.com/${profile.socials.linkedin}`}
              style={{
                background: profile.theme.secondary_bg || "#262626",
                color: profile.theme.primary_text || "#ededed",
                borderColor: profile.theme.strongerborder || "#4d4d4d",
              }}
              className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border"
            >
              <SiLinkedin size={20} />
            </a>
          )}
          {profile.socials.youtube && (
            <a
              target="_blank"
              href={`https://youtube.com/@${profile.socials.youtube}`}
              style={{
                background: profile.theme.secondary_bg || "#262626",
                color: profile.theme.primary_text || "#ededed",
                borderColor: profile.theme.strongerborder || "#4d4d4d",
              }}
              className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border"
            >
              <SiYoutube size={20} />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileSocialsRender;
