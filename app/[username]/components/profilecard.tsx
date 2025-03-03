"use client";
import React, { useState } from "react";
import Image from "next/image";
import MarkdownParser from "@/components/markdown-parser";
import { ArrowRight, Copy, FileUser, Link, Mail } from "lucide-react";
import { formatEarnings } from "@/lib/format-earnings";
import { FaRupeeSign } from "react-icons/fa";
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
  SiWhatsapp,
  SiTelegram,
} from "react-icons/si";
// import { motion } from "motion/react";
import useWindowSize from "@/hooks/useWindowSize";
import { createClient } from "@/utils/supabase/client";
import { subscribeUser } from "../functions/addSubscriber";
import { BiLinkExternal } from "react-icons/bi";
import QRCodeGenerator from "@/components/qrcodegenerator";
import ResumeModal from "./resumemodal";

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
  const [modal, setModal] = useState(false);
  const [resumeModal, setResumeModal] = useState(false);
  const isSocialsEmpty = Object.values(profile.socials).every(
    (val) => val === ""
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`
    );
  };

  return (
    <>
      <ResumeModal
        modal={resumeModal}
        setModal={setResumeModal}
        downloadLink={`${profile.resume_url}?download`}
        theme={profile.theme}
      />
      <div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center py-3 relative"
      >
        <div
          style={{
            background: profile.theme.secondary_bg || "#262626",
            color: profile.theme.primary_text || "#ededed",
            borderColor: profile.theme.strongerborder || "#363636",
          }}
          onClick={() => setModal(true)}
          className="p-1 rounded-md absolute top-3 right-3 border"
        >
          <BiLinkExternal className="text-base lg:text-lg" />
        </div>
        {modal && (
          <div
            className="px-5 z-[100] fixed h-full w-full flex items-center justify-center top-0 left-0 backdrop-blur"
            style={{
              pointerEvents: "auto",
              background: hexToRgba(profile.theme.primary_bg, 0.2),
            }}
          >
            <div
              data-state={modal ? "open" : "closed"}
              className="relative z-50 w-full border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95  rounded-lg md:w-full bg-dash-sidebar sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5 !block"
              style={{
                pointerEvents: "auto",
                background: profile.theme.primary_bg || "#121212",
                borderColor: profile.theme.border || "#363636",
              }}
            >
              <div
                style={{
                  borderColor: profile.theme.border || "#363636",
                  color: profile.theme.primary_text || "#ededed",
                }}
                className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b"
              >
                <h2 className="text-base leading-none font-normal">
                  <span className="break-words">Share Page</span>
                </h2>
              </div>
              <div className="py-4 px-5 overflow-hidden">
                <div className="p-2 flex items-center justify-center mx-auto">
                  <QRCodeGenerator
                    link={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
                    color={profile.theme.primary_text || "#ededed"}
                  />
                </div>
                <div className="space-y-4">
                  <div
                    style={{
                      background: profile.theme.secondary_bg || "#262626",
                      borderColor: profile.theme.border || "#363636",
                      color: profile.theme.primary_text || "#ededed",
                    }}
                    className="rounded-md border w-full px-2 py-1 relative"
                  >
                    <p className="w-[93%] text-ellipsis truncate">
                    {process.env.NEXT_PUBLIC_BASE_URL?.replace(
                      /(^\w+:|^)\/\//,
                      ""
                    )}/{profile.username}
                    </p>
                    <p
                      onClick={handleCopy}
                      title="copy link"
                      style={{
                        background: profile.theme.primary_bg || "#121212",
                        borderColor: profile.theme.strongerborder || "#363636",
                        color: profile.theme.primary_text || "#ededed",
                      }}
                      className="p-1 rounded-md absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <Copy size={16} />
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: profile.theme.border || "#363636",
                }}
                className="w-full h-px"
              />
              <div className="flex gap-2 px-5 pt-5 items-center justify-center">
                <a
                  href={`whatsapp://send?text=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
                  data-action="share/whatsapp/share"
                  style={{
                    background: profile.theme.secondary_bg || "#262626",
                    borderColor: profile.theme.strongerborder || "#363636",
                    color: profile.theme.primary_text || "#ededed",
                  }}
                  className="p-2.5 lg:p-3 border rounded-full"
                >
                  <SiWhatsapp className="text-xl lg:text-2xl" />
                </a>
                <a
                  target="_blank"
                  href={`http://x.com/share?text=Checkout my Linkfolio page%0A&url=https://linkfolio-dev.vercel.app/${profile.username}`}
                  style={{
                    background: profile.theme.secondary_bg || "#262626",
                    borderColor: profile.theme.strongerborder || "#363636",
                    color: profile.theme.primary_text || "#ededed",
                  }}
                  className="p-2.5 lg:p-3 border rounded-full"
                >
                  <SiX className="text-xl lg:text-2xl" />
                </a>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
                  style={{
                    background: profile.theme.secondary_bg || "#262626",
                    borderColor: profile.theme.strongerborder || "#363636",
                    color: profile.theme.primary_text || "#ededed",
                  }}
                  className="p-2.5 lg:p-3 border rounded-full"
                >
                  <SiFacebook className="text-xl lg:text-2xl" />
                </a>{" "}
                <a
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}&text=Checkout my Linkfolio page`}
                  style={{
                    background: profile.theme.secondary_bg || "#262626",
                    borderColor: profile.theme.strongerborder || "#363636",
                    color: profile.theme.primary_text || "#ededed",
                  }}
                  className="p-2.5 lg:p-3 border rounded-full"
                >
                  <SiLinkedin className="text-xl lg:text-2xl" />
                </a>{" "}
                <a
                  target="_blank"
                  href={`https://telegram.me/share/url?url=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}&text=Checkout my Linkfolio page`}
                  style={{
                    background: profile.theme.secondary_bg || "#262626",
                    borderColor: profile.theme.strongerborder || "#363636",
                    color: profile.theme.primary_text || "#ededed",
                  }}
                  className="p-2.5 lg:p-3 border rounded-full"
                >
                  <SiTelegram className="text-xl lg:text-2xl" />
                </a>{" "}
              </div>
              <button
                onClick={() => setModal(false)}
                type="button"
                style={{
                  color: profile.theme.primary_text || "#ededed",
                }}
                className="absolute right-4 top-4 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x h-4 w-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        )}
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
              className="text-lg lg:text-2xl font-semibold mb-0 lg:mb-1 text-start cursor-pointer"
            >
              {profile.full_name}
            </h1>
            <div
              style={{
                color: profile.theme.primary_text || "#ededed",
              }}
              className="flex items-center text-base -ml-0.5"
            >
              <Image
                src={`https://flagsapi.com/${
                  profile.country.split("-")[1]
                }/flat/64.png`}
                height={50}
                width={50}
                alt={profile.country.split("-")[0]}
                className="h-5 w-5 object-cover mr-0.5"
              />
              <span
                title={profile.country.split("-")[0]}
                className="truncate max-w-[6rem] cursor-pointer text-sx lg:text-base"
              >
                {profile.country.split("-")[0]}
              </span>
              <div
                style={{
                  background: profile.theme.strongerborder || "#4d4d4d",
                }}
                className="mx-2 h-4 w-px flex-shrink-0"
              ></div>
              <FaRupeeSign className="mr-0.5 lg:mr-1 flex-shrink-0 text-sm lg:text-lg" />
              <span className="text-sx lg:text-base">
                {formatEarnings(2000000)}/mo
              </span>
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
              <button
                onClick={() => setResumeModal(true)}
                className="text-sm md:text-base flex items-center justify-center gap-0.5 transition-colors duration-200 ease-out"
              >
                <FileUser strokeWidth={1} size={18} />
                <p className="underline underline-offset-2">Resume</p>
              </button>
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
                className="flex cursor-pointer items-center justify-center gap-1 md:gap-2 py-1 px-1 md:px-1.5 md:py-1 border rounded-md"
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
          {!isSocialsEmpty && (
            <p
              style={{
                color: profile.theme.primary_text || "#ededed",
              }}
              className="text-lg font-semibold text-center mt-6 mb-4"
            >
              Follow my socials !
            </p>
          )}
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
      </div>
    </>
  );
};

export default ProfileCard;
