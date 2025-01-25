"use client";
import { ToastError } from "@/components/toast";
import React, { useState, useEffect } from "react";
import { DiGithubBadge } from "react-icons/di";
import { FaRegStar } from "react-icons/fa6";

const GithubStarBadge = ({ link, size }: { link: string; size: string }) => {
  const [stars, setStars] = useState(1200);
  // useEffect(() => {
  //   const fetchGitHubStars = async () => {
  //     const regex = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
  //     const match = link.match(regex);

  //     if (match) {
  //       const owner = match[1];
  //       const repo = match[2];
  //       const GITHUB_API_URL = `https://api.github.com/repos/${owner}/${repo}`;

  //       try {
  //         const response = await fetch(GITHUB_API_URL, {
  //           headers: {
  //             Accept: "application/vnd.github.v3+json",
  //             Authorization: "Bearer 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"
  //           },
  //         });

  //         if (!response.ok) {
  //           ToastError({ message: "Github API Error." });
  //         }

  //         const data = await response.json();
  //         setStars(data.stargazers_count); // Returns the star count
  //       } catch (error) {
  //         ToastError({ message: "Failed to fetch GitHub stars:" });
  //       }
  //     }
  //   };

  //   fetchGitHubStars();
  // }, [link]);

  function formatNumberToK(number: number) {
    if (number < 1000) {
      return number.toString();
    } else {
      const rounded = (number / 1000).toFixed(1); // Round to 1 decimal place
      return `${parseFloat(rounded)}k`; // Remove trailing zero if any
    }
  }

  return (
    <span
      className={`flex bg-primary-bg items-center justify-center rounded border border-secondary-strongerborder ${
        size === "sm"
          ? "text-[0.4rem] lg:text-[0.5rem]"
          : "text-[0.5rem] lg:text-[0.7rem]"
      } px-1 py-[0.1rem]`}
    >
      <span>{formatNumberToK(stars)}</span> ⭐
    </span>
  );
};

export default GithubStarBadge;
