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
            background: theme ? theme.primary_bg : "#121212",
            borderColor: theme ? theme.border : "#4d4d4d",
          }}
          href={`https://${project.github_link}`}
          className="cursor-pointer px-1 py-0.5 flex items-center justify-center gap-2 rounded-md border"
        >
          <IoLogoGithub
            style={{
              color: theme ? theme.primary_text : "#ededed",
            }}
            className="text-sm "
          />
        </Link>
        <Link
          style={{
            background: theme ? theme.primary_bg : "#121212",
            borderColor: theme ? theme.strongerborder : "#4d4d4d",
          }}
          href={`https://${project.website_link}`}
          className="cursor-pointer px-1 py-0.5 flex items-center justify-center gap-2 rounded-md border"
        >
          <FiLink
            style={{
              color: theme ? theme.primary_text : "#ededed",
            }}
            className="text-sm "
          />
        </Link>
      </div>
      <div
        style={{
          background: theme ? theme.secondary_bg : "#262626",
          borderColor: theme ? theme.strongerborder : "#4d4d4d",
        }}
        className="w-60 rounded-md mt-2  p-4 border-[0.5px]"
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
            <a target="_blank" href={`https://${project.website_link}`}>
              <p
                style={{
                  color: theme ? theme.primary_text : "#ededed",
                }}
                className="hover:underline font-semibold text-sm -mb-1.5"
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
            borderColor: theme ? theme.strongerborder : "#4d4d4d",
          }}
          className="border-t  my-2 w-full"
        />
        <span
          style={{
            color: theme ? theme.primary_text : "#ededed",
          }}
          className="text-primary-text mt-2 text-mx markdown_content"
        >
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </span>
      </div>
    </div>
  );
};

export default ProjectPreviewRender;
