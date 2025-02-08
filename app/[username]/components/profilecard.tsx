"use client";
import React, { useState } from "react";
import Image from "next/image";
import MarkdownParser from "@/components/markdown-parser";
import { ArrowRight, FileUser, Link, Mail } from "lucide-react";
import { formatEarnings } from "@/lib/format-earnings";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { ProfileData } from "@/types/user";
import { ICONS_MAP_SMALL } from "@/app/dashboard/home/components/icons-map-small";
import { ICONS_MAP } from "@/app/dashboard/home/components/icons-map";
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { motion } from "framer-motion";
import useWindowSize from "@/hooks/useWindowSize";
import { createClient } from "@/utils/supabase/client";
import { subscribeUser } from "../functions/addSubscriber";

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

interface Skill {
  name: string;
  icon: string;
}

const ProfileCard = ({ profile }: { profile: ProfileData }) => {
  const supabase = createClient();
  const size = useWindowSize();
  const [email, setEmail] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center py-3"
    >
      <div className="flex items-center justify-center mb-4">
        <Image
          alt="User profile"
          width={600}
          height={600}
          style={{
            borderColor: profile.theme.strongerborder || "#363636",
          }}
          src={profile.avatar_url || "/avatars/annie.png"}
          className="w-[4.5rem] lg:w-20 h-[4.5rem] lg:h-20 rounded-full border-2 border-dashed p-1 object-cover flex-shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col items-start justify-center ml-4 flex-shrink-0">
          <h1
            style={{
              color: profile.theme.primary_text || "#ededed",
            }}
            className="text-xl lg:text-2xl font-semibold mb-1 text-start cursor-pointer"
          >
            {profile.full_name}
          </h1>
          <div
            style={{
              color: profile.theme.primary_text || "#ededed",
            }}
            className="flex items-center text-base"
          >
            <FaMapMarkerAlt className="mr-1 flex-shrink-0" />
            <span
              title={profile.country}
              className="truncate max-w-[6rem] cursor-pointer"
            >
              {profile.country}
            </span>
            <div
              style={{
                background: profile.theme.strongerborder || "#4d4d4d",
              }}
              className="mx-2 h-4 w-px flex-shrink-0"
            ></div>
            <FaRupeeSign className="mr-1 flex-shrink-0" />
            <span>{formatEarnings(2000000)}/mo</span>
          </div>
        </div>
      </div>
      <div
        style={{
          color:
            size.width > 1024
              ? hexToRgba(profile.theme.primary_text, 0.8) || "#ededed"
              : profile.theme.primary_text || "#ededed",
        }}
        className="flex items-center justify-center gap-3 mb-4 transition-all duration-200 ease-out"
      >
        {profile.profile_link && profile.profile_link_text && (
          <div className="mb-4 changeon_hover">
            <a
              target="_blank"
              href={profile.profile_link}
              className="text-sm md:text-base flex items-center justify-center gap-0.5 transition-colors duration-200 ease-out"
            >
              <Link strokeWidth={1} size={18} />
              <p className="underline underline-offset-2">
                {profile.profile_link_text}
              </p>
            </a>
          </div>
        )}
        {profile.resume_url && (
          <div className="mb-4 changeon_hover">
            <a
              target="_blank"
              href={`${profile.resume_url}?download`}
              className="text-sm md:text-base flex items-center justify-center gap-0.5 transition-colors duration-200 ease-out"
            >
              <FileUser strokeWidth={1} size={18} />
              <p className="underline underline-offset-2">Resume</p>
            </a>
          </div>
        )}
        <style jsx>{`
          .changeon_hover:hover {
            color: ${profile.theme.primary_text || "#ededed"};
          }
        `}</style>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center flex-wrap gap-2 ">
          {(profile.user_skills as Skill[]).map((skill) => (
            <div
              key={skill.name}
              style={{
                backgroundColor: profile.theme.secondary_bg || "#262626",
                color: profile.theme.primary_text || "#ededed",
                borderColor: profile.theme.border || "#363636",
              }}
              className="flex cursor-pointer items-center justify-center gap-1 md:gap-2 p-1 md:p-1.5 border rounded-md md:rounded-lg"
            >
              <span className="hidden md:block">{ICONS_MAP[skill.icon]}</span>
              <span className="block md:hidden">
                {ICONS_MAP_SMALL[skill.icon]}
              </span>
              <span className="text-xs lg:text-sm select-none">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-center md:text-base mb-0 lg:mb-4 w-[93%] lg:w-[90%] block text-primary-text/80">
        <MarkdownParser
          style={{
            color: profile.theme.primary_text || "#ededed",
          }}
          text={profile.bio}
        />
      </div>

      <p
        className="hidden lg:block text-lg font-semibold text-center mt-6"
        style={{
          color: profile.theme.primary_text || "#ededed",
        }}
      >
        {profile.newsletter_config.newsletter_title}
      </p>

      <div className="hidden lg:flex items-center justify-center relative w-full lg:w-[85%] mt-3">
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          onClick={() =>
            subscribeUser({
              supabase: supabase,
              email: email,
              setEmail: setEmail,
            })
          }
          disabled={email === ""}
          style={{
            background: profile.theme.secondary_bg || "#262626",
            borderColor: profile.theme.strongerborder || "#4d4d4d",
            color: profile.theme.primary_text || "#ededed",
          }}
          className="cursor-pointer py-2 px-4 text-sm rounded-r-md border disabled:opacity-55"
        >
          <ArrowRight
            style={{
              color: profile.theme.primary_text || "#ededed",
            }}
            size={20}
          />
        </button>
      </div>
      <div className="w-full hidden lg:block">
        <p
          style={{
            color: profile.theme.primary_text || "#ededed",
          }}
          className="text-lg font-semibold text-center mt-6 mb-4"
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
              className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border"
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
              className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border"
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
              className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border"
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
              className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border"
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
              className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border"
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
              className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center border"
            >
              <SiYoutube size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
