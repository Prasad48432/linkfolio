import React from "react";
import CategoryBadge from "./categorybadge";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { FiLink } from "react-icons/fi";
import Image from "next/image";
import GithubStarBadge from "./starbadge";

const ProjectPreviewRender = ({ project }: { project: any }) => {
  return (
    <div key={project.id} className="relative">
      <div className="absolute top-5 right-3 flex flex-col gap-1 items-center justify-center">
        <Link
          href={`https://${project.github_link}`}
          className="cursor-pointer bg-primary-bg border-secondary-strongerborder px-1 py-0.5 flex items-center justify-center gap-2 rounded-md"
        >
          <IoLogoGithub className="text-sm text-primary-text" />
        </Link>
        <Link
          href={`https://${project.website_link}`}
          className="cursor-pointer bg-primary-bg border-secondary-strongerborder px-1 py-0.5 flex items-center justify-center gap-2 rounded-md"
        >
          <FiLink className="text-sm text-primary-text" />
        </Link>
      </div>
      <div className="w-60 rounded-md mt-2 bg-secondary-bg p-4 border-[0.5px] border-secondary-strongerborder">
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
              <p className="text-primary-text hover:underline font-semibold text-sm -mb-1.5">
                {project.name}
              </p>
            </a>
            <span className="flex items-center justify-center gap-0.5">
              <CategoryBadge object={project} size={"sm"} />
              <GithubStarBadge link={project.github_link} size="sm" />
            </span>
          </div>
        </div>
        <hr className="border-t border-secondary-strongerborder my-2 w-full" />
        <span className="text-primary-text mt-2 text-mx markdown_content">
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </span>
      </div>
    </div>
  );
};

export default ProjectPreviewRender;
