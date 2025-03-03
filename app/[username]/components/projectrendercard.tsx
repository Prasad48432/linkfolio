import React from "react";
import CategoryBadge from "@/app/dashboard/contents/components/categorybadge";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import Image from "next/image";
import GithubStarBadge from "@/app/dashboard/contents/components/starbadge";
import { handleClick } from "../functions/addClick";

const ProjectRenderCard = ({
  project,
  theme,
}: {
  project: any;
  theme?: any;
}) => {
  return (
    <div key={project.id} className="relative col-span-2 lg:col-span-1">
      <div className="absolute top-5 right-3 flex flex-col gap-1 items-center justify-center">
        <span
          style={{
            background: theme ? theme.primary_bg : "#121212",
            borderColor: theme ? theme.strongerborder : "#4d4d4d",
          }}
          onClick={() => {
            handleClick({ table: "projects", docId: project.id });
            window.open(project.github_link, "_blank");
          }}
          className="cursor-pointer px-2 py-1 flex items-center justify-center gap-2 rounded-md border"
        >
          <IoLogoGithub
            style={{
              color: theme ? theme.primary_text : "#ededed",
            }}
            className="text-lg"
          />
        </span>
        <span
          style={{
            background: theme ? theme.primary_bg : "#121212",
            borderColor: theme ? theme.strongerborder : "#4d4d4d",
          }}
          onClick={() => {
            handleClick({ table: "projects", docId: project.id });
            window.open(project.website_link, "_blank");
          }}
          className="cursor-pointer px-2 py-1 flex items-center justify-center gap-2 rounded-md border"
        >
          <FiLink
            style={{
              color: theme ? theme.primary_text : "#ededed",
            }}
            className="text-lg"
          />
        </span>
      </div>
      <div
        style={{
          background: theme ? theme.secondary_bg : "#262626",
          borderColor: theme ? theme.strongerborder : "#4d4d4d",
        }}
        className="w-full rounded-md mt-2  p-4 border h-[11rem]"
      >
        <div className="flex items-center">
          <div
            style={{
              borderColor: theme ? theme.strongerborder : "#4d4d4d",
            }}
            className="w-[3.5rem] h-[3.5rem] p-1 rounded-full border lg:border-2 border-dashed mr-2"
          >
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
            <span
              onClick={() => {
                handleClick({ table: "projects", docId: project.id });
                window.open(project.website_link, "_blank");
              }}
            >
              <p
                style={{
                  color: theme ? theme.primary_text : "#ededed",
                }}
                className="hover:underline font-semibold text-base cursor-pointer"
              >
                {project.name}
              </p>
            </span>
            <span className="flex items-center justify-center gap-0.5">
              <CategoryBadge object={project} size={"lg"} />
              <GithubStarBadge
                link={project.github_link}
                theme={theme}
                size="lg"
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
          className="mt-2 text-xs lg:text-sm markdown_content"
        >
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </span>
      </div>
    </div>
  );
};

export default ProjectRenderCard;
