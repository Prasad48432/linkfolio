import useWindowSize from "@/hooks/useWindowSize";
import React, { useState } from "react";
import DeleteConfirmation from "./deleteconfirm";
import {
  Globe,
  GripVertical,
  Link,
  OctagonAlert,
  Settings,
  Tag,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";
import { TbCategory } from "react-icons/tb";
import { motion } from "motion/react";
import CategorySelect from "./categoryselect";

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

  return (
    <>
      <DeleteConfirmation
        modal={deleteModel}
        setModal={setDeleteModel}
        object={project}
        table="projects"
      />
      <div className="w-full h-fit rounded-md bg-lightsecondary-bg dark:bg-secondary-bg flex flex-col items-center justify-center text-lightprimary-text  dark:text-primary-text px-2 py-2 relative">
        <span title="Drag handle" className="absolute top-3 left-2 lg:left-3">
          <GripVertical size={size.width > 1000 ? 18 : 15} />
        </span>
        <div className="flex flex-col items-center justify-end w-[95%] mt-3">
          <div className="flex items-center justify-center w-full gap-1 lg:gap-2">
            <div className="w-16 h-full p-1.5 rounded-full">
              <Image
                src={"/github.png"}
                title={project.name}
                alt={project.name}
                width={600}
                height={600}
                className="rounded-full w-full h-full mr-4 border border-lightsecondary-strongerborder dark:border-primary-text/90 border-dashed p-0.5 object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-[calc(100%-4rem)]">
              <div className="relative w-full">
                <span
                  title="Project name"
                  className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
                >
                  <Tag
                    strokeWidth={1}
                    size={size.width > 1000 ? 20 : 15}
                    className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
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
                  className="border-lightsecondary-border placeholder-gray-500 focus:border-lightsecondary-strongerborder dark:border-secondary-border dark:placeholder-gray-500 dark:focus:border-secondary-strongerborder w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
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
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
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
                    className="border-lightsecondary-border placeholder-gray-500 focus:border-lightsecondary-strongerborder dark:border-secondary-border dark:placeholder-gray-500 dark:focus:border-secondary-strongerborder w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
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
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                    />
                  </span>
                  <input
                    type="text"
                    name="project_githublink"
                    placeholder="Enter github link"
                    value={project.github_link}
                    readOnly
                    className="border-lightsecondary-border placeholder-gray-500 dark:border-secondary-border dark:placeholder-gray-500 cursor-default w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
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
              maxLength={160}
              rows={3}
              className="border-lightsecondary-border placeholder-gray-500 focus:border-lightsecondary-strongerborder dark:border-secondary-border dark:placeholder-gray-500 dark:focus:border-secondary-strongerborder w-full p-2 lg:p-3 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1"
            />
            <div className="absolute bottom-4 right-2 text-[0.6rem] text-gray-500">
              {project.description.length}/160
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around w-[95%] mb-3 px-3 mt-2">
          <div className="flex items-center space-x-2 w-full">
            <span className="text-ms lg:text-sm">Show on Profile</span>
            <button
              onClick={() =>
                handleFieldChange({
                  id: project.id,
                  field: "visibility_on_profile",
                  value: !project.visibility_on_profile,
                })
              }
              className={`relative inline-flex items-center h-4 w-[1.9rem] lg:h-5 rounded-full lg:w-[2.4rem] focus:outline-none border ${
                project.visibility_on_profile
                  ? "bg-lightsuccess-bg border-lightsuccess-border dark:bg-success-bg dark:border-success-border"
                  : "bg-lightprimary-bg border-lightsecondary-strongerborder dark:bg-primary-bg dark:border-secondary-strongerborder"
              }`}
            >
              <span
                className={`inline-block w-[0.7rem] h-[0.7rem] lg:w-[0.9rem] lg:h-[0.9rem] transform bg-lightprimary-text dark:bg-primary-text rounded-full transition-transform duration-200 ${
                  project.visibility_on_profile
                    ? "translate-x-[1rem] lg:translate-x-5"
                    : "translate-x-[0.2rem]"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-end w-full gap-1 lg:gap-2">
            <div
              onClick={() => toggleHandler("verficationSelected")}
              className={`w-6 lg:w-8 h-6 lg:h-8 bg-danger-selection border-danger-border border rounded-full flex items-center justify-center cursor-pointer`}
            >
              <OctagonAlert
                strokeWidth={1}
                size={size.width > 1000 ? 18 : 12}
              />
            </div>
            <div
              onClick={() => toggleHandler("settingsSelected")}
              className={`w-6 lg:w-8 h-6 lg:h-8 ${
                toggles.settingsSelected
                  ? "bg-lightprimary-text border-lightsecondary-border text-lightprimary-bg dark:bg-primary-text dark:border-secondary-border dark:text-primary-bg"
                  : "bg-lightprimary-bg border-lightsecondary-border text-lightprimary-text dark:bg-primary-bg dark:border-secondary-border dark:text-primary-text"
              }  border rounded-full flex items-center justify-center cursor-pointer`}
            >
              <Settings strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
            </div>
            <div
              onClick={() => toggleHandler("categorySelected")}
              className={`w-6 lg:w-8 h-6 lg:h-8 ${
                toggles.categorySelected
                  ? "bg-lightprimary-text border-lightsecondary-border text-lightprimary-bg dark:bg-primary-text dark:border-secondary-border dark:text-primary-bg"
                  : "bg-lightprimary-bg border-lightsecondary-border text-lightprimary-text dark:bg-primary-bg dark:border-secondary-border dark:text-primary-text"
              } border rounded-full flex items-center justify-center cursor-pointer`}
            >
              <TbCategory strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
            </div>
            <div
              onClick={() => {
                setDeleteModel(true);
              }}
              className="w-6 lg:w-8 h-6 lg:h-8 bg-danger-selection border-danger-border border rounded-full flex items-center justify-center cursor-pointer"
            >
              <Trash strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
            </div>
          </div>
        </div>
        <div className="w-[90%] flex items-center justify-center">
          {toggles.categorySelected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-center pb-2"
            >
              <CategorySelect
                value={project.category === "" ? "" : project.category}
                onChange={(e: any) =>
                  handleFieldChange({
                    id: project.id,
                    field: "category",
                    value: e.target.value,
                  })
                }
              />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
