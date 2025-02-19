import React from "react";
import CategoryBadge from "./categorybadge";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import Image from "next/image";
import GithubStarBadge from "./starbadge";

const ProjectPreviewRender = ({
  project,
  theme,
}: {
  project: any;
  theme?: any;
}) => {
  return (
    <div key={project.id} className="relative">
      <div className="absolute top-5 right-3 flex flex-col gap-1 items-center justify-center">
        <Link
          style={{
            background: theme ? theme.primary_bg : "",
            borderColor: theme ? theme.border : "",
          }}
          href={`${project.github_link}`}
          className="cursor-pointer px-1 py-0.5 bg-lightprimary-bg border-lightsecondary-border dark:bg-primary-bg dark:border-secondary-border flex items-center justify-center gap-2 rounded-md border"
        >
          <IoLogoGithub
            style={{
              color: theme ? theme.primary_text : "",
            }}
            className="text-sm text-lightprimary-text dark:text-primary-text"
          />
        </Link>
        <Link
          style={{
            background: theme ? theme.primary_bg : "",
            borderColor: theme ? theme.strongerborder : "",
          }}
          href={`${project.website_link}`}
          className="cursor-pointer px-1 py-0.5 flex bg-lightprimary-bg border-lightsecondary-strongerborder dark:bg-primary-bg dark:border-secondary-strongerborder items-center justify-center gap-2 rounded-md border"
        >
          <FiLink
            style={{
              color: theme ? theme.primary_text : "",
            }}
            className="text-sm text-lightprimary-text dark:text-primary-text"
          />
        </Link>
      </div>
      <div
        style={{
          background: theme ? theme.secondary_bg : "",
          borderColor: theme ? theme.strongerborder : "",
        }}
        className="w-60 rounded-md mt-2  p-4 border-[0.5px] bg-lightsecondary-bg border-lightsecondary-strongerborder dark:bg-secondary-bg dark:border-secondary-strongerborder"
      >
        <div className="flex items-center">
          <div className="w-[2.4rem] h-[2.4rem] p-0.5 rounded-full border border-dashed mr-2">
            <Image
              src={"/github.png"}
              title={project.name}
              alt={project.name}
              width={600}
              height={600}
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1.5">
            <a target="_blank" href={`${project.website_link}`}>
              <p
                style={{
                  color: theme ? theme.primary_text : "",
                }}
                className="hover:underline font-semibold text-sm -mb-1.5 text-lightprimary-text dark:text-primary-text"
              >
                {project.name}
              </p>
            </a>
            <span className="flex items-center justify-center gap-0.5">
              <CategoryBadge object={project} size={"sm"} />
              <GithubStarBadge
                link={project.github_link}
                theme={theme}
                size="sm"
              />
            </span>
          </div>
        </div>
        <hr
          style={{
            borderColor: theme ? theme.strongerborder : "",
          }}
          className="border-t  my-2 w-full border-lightsecondary-strongerborder dark:border-secondary-strongerborder"
        />
        <span
          style={{
            color: theme ? theme.primary_text : "",
          }}
          className="text-lightprimary-text dark:text-primary-text mt-2 text-mx markdown_content"
        >
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </span>
      </div>
    </div>
  );
};

export default ProjectPreviewRender;
