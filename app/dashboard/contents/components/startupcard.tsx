"use client";
import {
  Banknote,
  Flag,
  Globe,
  GripVertical,
  Link,
  OctagonAlert,
  Settings,
  Tag,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import { TbCategory } from "react-icons/tb";
import { motion } from "framer-motion";
import CategorySelect from "./categoryselect";
import StatusSelect from "./statusselect";
import DeleteConfirmation from "./deleteconfirm";

type HandleFieldChange = (params: {
  id: string;
  field: string;
  value: any;
  isNumber? : boolean;
}) => void;

interface StartupCardProps {
  startup: any;
  handleFieldChange: HandleFieldChange;
}

type IndexConversion =
  | "settingsSelected"
  | "statusSelected"
  | "categorySelected"
  | "verficationSelected";

const StartupCard = ({ startup, handleFieldChange }: StartupCardProps) => {
  const size = useWindowSize();
  const [toggles, setToggles] = useState<{
    settingsSelected: boolean;
    statusSelected: boolean;
    categorySelected: boolean;
    verficationSelected: boolean;
  }>({
    settingsSelected: false,
    statusSelected: false,
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
        object={startup}
        table="startups"
      />
      <div className="w-full h-fit rounded-md bg-secondary-bg flex flex-col items-center justify-center text-primary-text px-2 py-2 relative">
        <span title="Drag handle" className="absolute top-3 left-2 lg:left-3">
          <GripVertical size={size.width > 1000 ? 18 : 15} />
        </span>
        <div className="flex flex-col items-center justify-end w-[95%] mt-3">
          <div className="flex items-center justify-center w-full gap-1 lg:gap-2">
            <div className="w-16 h-full p-1.5 rounded-full">
              <Image
                src={`https://www.google.com/s2/favicons?sz=128&domain_url=${startup.website}`}
                title={startup.name}
                alt={startup.name}
                width={600}
                height={600}
                className="rounded-full w-full h-full mr-4 border border-dashed p-0.5 object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-[calc(100%-4rem)]">
              <div className="relative w-full">
                <span
                  title="Startup link"
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
                  name="startup_website"
                  value={startup.website}
                  readOnly
                  className="border-secondary-border cursor-not-allowed w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
                />
              </div>
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="relative w-1/2">
                  <span
                    title="Startup name"
                    className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
                  >
                    <Tag
                      strokeWidth={1}
                      size={size.width > 1000 ? 20 : 15}
                      className="text-primary-text/80 text-xl"
                    />
                  </span>
                  <input
                    type="text"
                    name="startup_name"
                    placeholder="Startup name"
                    value={startup.name}
                    onChange={(e) =>
                      handleFieldChange({
                        id: startup.id,
                        field: "name",
                        value: e.target.value,
                      })
                    }
                    className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1"
                  />
                </div>
                <div className="relative w-1/2">
                  <span
                    title="Startup Revenue"
                    className="absolute top-[55%] -translate-y-1/2 left-2 lg:left-3 flex items-center"
                  >
                    <Banknote
                      strokeWidth={1}
                      size={size.width > 1000 ? 20 : 15}
                      className="text-primary-text/80 text-xl"
                    />
                  </span>
                  <input
                    type="number"
                    name="startup_revenue"
                    placeholder="Estimated revenue"
                    value={startup.estimated_revenue}
                    onChange={(e) =>
                      handleFieldChange({
                        id: startup.id,
                        field: "estimated_revenue",
                        value: e.target.value,
                        isNumber: true
                      })
                    }
                    className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <textarea
              placeholder="how crazy is your startup?"
              name="startup_description"
              value={startup.description}
              onChange={(e) =>
                handleFieldChange({
                  id: startup.id,
                  field: "description",
                  value: e.target.value,
                })
              }
              rows={3}
              className="border-secondary-border placeholder-gray-500 focus:border-secondary-strongerborder w-full p-2 lg:p-3 text-xs lg:text-sm bg-primary-bg/70 border focus:outline-none rounded-md mt-1"
            />
          </div>
        </div>
        {/* </div> */}
        <div className="flex items-center justify-around w-[95%] mb-3 px-3 mt-2">
          <div className="flex items-center space-x-2 w-full">
            <span className="text-ms lg:text-sm">Show on Profile</span>
            <button
              onClick={() =>
                handleFieldChange({
                  id: startup.id,
                  field: "visibility_on_profile",
                  value: !startup.visibility_on_profile,
                })
              }
              className={`relative inline-flex items-center h-4 w-[1.9rem] lg:h-5 rounded-full lg:w-[2.4rem] focus:outline-none border ${
                startup.visibility_on_profile
                  ? "bg-success-bg border-success-border"
                  : "bg-[#1a1a1a] border-secondary-strongerborder"
              }`}
            >
              <span
                className={`inline-block w-[0.7rem] h-[0.7rem] lg:w-[0.9rem] lg:h-[0.9rem] transform bg-primary-text rounded-full transition-transform duration-200 ${
                  startup.visibility_on_profile
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
              <OctagonAlert strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
            </div>
            <div
              onClick={() => toggleHandler("settingsSelected")}
              className={`w-6 lg:w-8 h-6 lg:h-8 ${
                toggles.settingsSelected
                  ? "bg-primary-text border-secondary-border text-primary-bg"
                  : "bg-primary-bg border-secondary-border text-primary-text"
              }  border rounded-full flex items-center justify-center cursor-pointer`}
            >
              <Settings strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
            </div>
            <div
              onClick={() => toggleHandler("statusSelected")}
              className={`w-6 lg:w-8 h-6 lg:h-8 ${
                toggles.statusSelected
                  ? "bg-primary-text border-secondary-border text-primary-bg"
                  : "bg-primary-bg border-secondary-border text-primary-text"
              } border rounded-full flex items-center justify-center cursor-pointer`}
            >
              <Flag strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
            </div>
            <div
              onClick={() => toggleHandler("categorySelected")}
              className={`w-6 lg:w-8 h-6 lg:h-8 ${
                toggles.categorySelected
                  ? "bg-primary-text border-secondary-border text-primary-bg"
                  : "bg-primary-bg border-secondary-border text-primary-text"
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
                value={startup.category === "" ? "" : startup.category}
                onChange={(e: any) =>
                  handleFieldChange({
                    id: startup.id,
                    field: "category",
                    value: e.target.value,
                  })
                }
              />
            </motion.div>
          )}
          {toggles.statusSelected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center justify-center pb-2"
            >
              <StatusSelect
                value={startup.status === "" ? "" : startup.status}
                onChange={(e: any) =>
                  handleFieldChange({
                    id: startup.id,
                    field: "status",
                    value: e.target.value,
                  })
                }
              />
              <div className="flex items-center justify-between mt-2 w-full px-1">
                <span className="text-ms lg:text-sm">
                  Show status in profile
                </span>
                <button
                  onClick={() =>
                    handleFieldChange({
                      id: startup.id,
                      field: "show_status",
                      value: !startup.show_status,
                    })
                  }
                  className={`relative inline-flex items-center h-4 w-[1.9rem] lg:h-5 rounded-full lg:w-[2.4rem] focus:outline-none border ${
                    startup.show_status
                      ? "bg-success-bg border-success-border"
                      : "bg-[#1a1a1a]  border-secondary-strongerborder"
                  }`}
                >
                  <span
                    className={`inline-block w-[0.7rem] h-[0.7rem] lg:w-[0.9rem] lg:h-[0.9rem] transform bg-white rounded-full transition-transform duration-200 ${
                      startup.show_status ? "translate-x-[1rem] lg:translate-x-5" : "translate-x-[0.2rem]"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default StartupCard;
