import useWindowSize from "@/hooks/useWindowSize";
import React, { useState } from "react";
import DeleteConfirmation from "./deleteconfirm";
import { Globe, GripVertical, Link } from "lucide-react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";

type HandleFieldChange = (params: {
  id: string;
  field: string;
  value: any;
  isLink?: boolean;
}) => void;

interface ProjectCardProps {
  project: any;
  handleFieldChange: HandleFieldChange;
}

type IndexConversion =
  | "settingsSelected"
  | "categorySelected"
  | "verficationSelected";

const ProjectCard = ({ project, handleFieldChange }: ProjectCardProps) => {
  const size = useWindowSize();
  const [toggles, setToggles] = useState<{
    settingsSelected: boolean;
    categorySelected: boolean;
    verficationSelected: boolean;
  }>({
    settingsSelected: false,
    categorySelected: false,
    verficationSelected: false,
  });
  const [deleteModel, setDeleteModel] = useState(false);

  const toggleHandler = (key: IndexConversion) => {
    setToggles((prev) => {
      const updatedToggles = Object.keys(prev).reduce((acc, toggleKey) => {
        acc[toggleKey as IndexConversion] =
          toggleKey === key ? !prev[toggleKey as IndexConversion] : false;
        return acc;
      }, {} as typeof toggles);
      return updatedToggles;
    });
  };

  const fetchGitHubStars = async ({
    owner,
    repo,
  }: {
    owner: string;
    repo: string;
  }) => {
    const GITHUB_API_URL = `https://api.github.com/repos/${owner}/${repo}`;

    try {
      const response = await fetch(GITHUB_API_URL, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Stars for ${owner}/${repo}:`, data.stargazers_count);
      return data.stargazers_count; // Returns the star count
    } catch (error) {
      console.error("Failed to fetch GitHub stars:", error);
      return null;
    }
  };

  return (
    <>
      <DeleteConfirmation
        modal={deleteModel}
        setModal={setDeleteModel}
        object={project}
        table="projects"
      />
      <div className="w-full h-fit rounded-md bg-secondary-bg flex flex-col items-center justify-center text-primary-text px-2 py-2 relative">
        <span
          onClick={() =>
            fetchGitHubStars({ owner: "supabase", repo: "storage-js" })
          }
          title="Drag handle"
          className="absolute top-2 lg:top-3 left-2 lg:left-3"
        >
          <GripVertical size={18} />
        </span>
        <div className="flex flex-col items-center justify-end w-[95%] mt-3">
          <div className="flex items-center justify-center w-full gap-2">
            <div className="w-16 h-full p-1.5 rounded-full">
              <Image
                src={`https://www.google.com/s2/favicons?sz=128&domain_url=${
                  project.github_link || project.website_link
                }`}
                title={project.name}
                alt={project.name}
                width={600}
                height={600}
                className="rounded-full w-full h-full mr-4 border border-dashed p-0.5 object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-[calc(100%-4rem)]">
              <div className="relative w-full">
                <span
                  title="Project name"
                  className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
                >
                  <Globe
                    strokeWidth={1}
                    size={size.width > 1000 ? 20 : 15}
                    className="text-primary-text/80 text-xl"
                  />
                </span>
                <input
                  type="text"
                  name="project_name"
                  placeholder="Enter project name"
                  value={project.name}
                  onChange={(e) => {
                    handleFieldChange({
                      id: project.id,
                      field: "name",
                      value: e.target.value,
                    });
                  }}
                  className="border-secondary-border placeholder-gray-500 focus:border-secondary-strongerborder w-full py-2 pl-[1.75rem] lg:pl-9 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
                />
              </div>
              <div className="flex items-center justify-center gap-2 w-full">
                  <div className="relative w-1/2">
                    <span
                      title="Project link"
                      className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
                    >
                      <Link
                        strokeWidth={1}
                        size={size.width > 1000 ? 20 : 15}
                        className="text-primary-text/80 text-xl"
                      />
                    </span>
                    <input
                      type="text"
                      name="project_link"
                      placeholder="Enter website link"
                      value={project.website_link}
                      onChange={(e) => {
                        handleFieldChange({
                          id: project.id,
                          field: "website_link",
                          value: e.target.value,
                          isLink: true,
                        });
                      }}
                      className="border-secondary-border placeholder-gray-500 focus:border-secondary-strongerborder w-full py-2 pl-[1.75rem] lg:pl-9 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
                    />
                  </div>
                  <div className="relative w-1/2">
                    <span
                      title="Github link"
                      className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
                    >
                      <FiGithub
                        strokeWidth={1}
                        size={size.width > 1000 ? 20 : 15}
                        className="text-primary-text/80 text-xl"
                      />
                    </span>
                    <input
                      type="text"
                      name="project_githublink"
                      placeholder="Enter github link"
                      value={project.github_link}
                      readOnly
                      className="border-secondary-border placeholder-gray-500 cursor-default w-full py-2 pl-[1.75rem] lg:pl-9 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
                    />
                  </div>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <textarea
              placeholder="how crazy is your project?"
              name="project_description"
              value={project.description}
              onChange={(e) =>
                handleFieldChange({
                  id: project.id,
                  field: "description",
                  value: e.target.value,
                })
              }
              rows={3}
              className="border-secondary-border placeholder-gray-500 focus:border-secondary-strongerborder w-full p-2 lg:p-3 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
