"use client";
import React from "react";
import Image from "next/image";
import MarkdownParser from "@/components/markdown-parser";
import { Link, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { formatEarnings } from "@/lib/format-earnings";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  usernames: string;
  bio: string;
  theme: string[];
  country: string;
  profile_link: string;
  profile_link_text: string;
}

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const ProfileCard = ({ profile }: { profile: Profile }) => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerVariants}
        className="flex flex-col items-center justify-center py-3 lg:py-6"
      >
        <motion.div
          variants={staggerVariants}
          custom={1}
          className="flex items-center justify-center mb-4"
        >
          <Image
            alt="User profile"
            width={600}
            height={600}
            src={profile.avatar_url || "/avatars/annie.png"}
            className="w-20 h-20 rounded-full ring-2 ring-secondary-border p-1 object-cover flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col items-start justify-center ml-4 flex-shrink-0">
            <h1 className="text-primary-text text-xl lg:text-2xl font-semibold mb-1 text-start cursor-pointer">
              {profile.full_name}
            </h1>
            <div className="flex items-center text-primary-text/80 text-base">
              <FaMapMarkerAlt className="mr-1 flex-shrink-0" />
              <span
                title={profile.country}
                className="truncate max-w-[6rem] cursor-pointer"
              >
                {profile.country}
              </span>
              <div className="mx-2 h-4 w-px bg-gray-400 flex-shrink-0"></div>
              <FaRupeeSign className="mr-1 flex-shrink-0" />
              <span>{formatEarnings(2000000)}/mo</span>
            </div>
          </div>
        </motion.div>
        {profile.profile_link && profile.profile_link_text && (
          <motion.div variants={staggerVariants} custom={2} className="mb-4">
            <a
              target="_blank"
              href={profile.profile_link}
              className="flex items-center justify-center gap-0.5 text-primary-text hover:text-accent-text transition-colors duration-200 ease-out"
            >
              <Link strokeWidth={1} size={18} />
              <p className="underline underline-offset-2">
                {profile.profile_link_text}
              </p>
            </a>
          </motion.div>
        )}

        <motion.div
          variants={staggerVariants}
          custom={3}
          className="text-sm text-center md:text-base mb-0 lg:mb-4 w-[93%] lg:w-[90%] block text-primary-text/80"
        >
          <MarkdownParser text={profile.bio} />
        </motion.div>

        <motion.p
          variants={staggerVariants}
          custom={4}
          className="text-primary-text/80 text-lg font-medium text-center mt-6"
        >
          Subscribe to my weekly newsletter.
        </motion.p>

        <motion.div
          variants={staggerVariants}
          custom={5}
          className="flex items-center justify-center relative w-full lg:w-[85%] mt-3"
        >
          <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
            <Mail
              strokeWidth={1}
              size={17}
              className="text-primary-text/80 text-xl"
            />
          </span>
          <input
            type="text"
            name="full_name"
            value=""
            readOnly
            placeholder="youremail@example.com"
            className="border-secondary-border border-r-0 focus:border-secondary-strongerborder w-full py-2 pl-9 text-sm bg-secondary-bg border focus:outline-none rounded-l-md"
          />
          <button className="cursor-pointer py-2 px-4 text-sm rounded-r-md border border-accent-border bg-accent-bg text-primary-text">
            Subscribe
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProfileCard;
