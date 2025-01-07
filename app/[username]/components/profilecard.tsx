"use client";
import React from "react";
import Image from "next/image";
import MarkdownParser from "@/components/markdown-parser";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  usernames: string;
  bio: string;
  theme: string[];
  country: string;
}

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 }
  })
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
      <motion.div variants={staggerVariants} custom={1}>
        <Image
          alt="User profile"
          width={600}
          height={600}
          src={profile.avatar_url || "/avatars/annie.png"}
          className="w-28 h-28 rounded-full ring-2 ring-secondary-border p-1 inline-block object-cover mb-4"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.p variants={staggerVariants} custom={2} className="text-primary-text text-2xl font-semibold">
        {profile.full_name}
      </motion.p>

      <motion.div variants={staggerVariants} custom={3} className="text-center text-sm md:text-base mb-0 lg:mb-4 w-[90%] block">
        <MarkdownParser
          text={profile.bio}
        />
      </motion.div>

      <motion.p variants={staggerVariants} custom={4} className="text-primary-text/80 text-lg font-medium text-center mt-6">
        Subscribe to my weekly newsletter.
      </motion.p>

      <motion.div variants={staggerVariants} custom={5} className="flex items-center justify-center relative w-full lg:w-[85%] mt-3">
        <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
          <Mail strokeWidth={1} size={17} className="text-primary-text/80 text-xl" />
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
