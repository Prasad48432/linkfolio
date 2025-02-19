"use client";
import {
  Banknote,
  Flag,
  Globe,
  GripVertical,
  Link,
  Loader,
  OctagonAlert,
  Settings,
  Tag,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";
import { TbCategory } from "react-icons/tb";
import { motion } from "motion/react";
import CategorySelect from "./categoryselect";
import StatusSelect from "./statusselect";
import DeleteConfirmation from "./deleteconfirm";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ToastError } from "@/components/toast";
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type HandleFieldChange = (params: {
  id: string;
  field: string;
  value: any;
  isNumber?: boolean;
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
      <div className="w-full h-fit rounded-md bg-lightsecondary-bg dark:bg-secondary-bg flex flex-col items-center justify-center text-lightprimary-text  dark:text-primary-text px-2 py-2 relative">
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
                    className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
                  />
                </span>
                <input
                  type="text"
                  name="startup_website"
                  value={startup.website}
                  readOnly
                  className="border-lightsecondary-border dark:border-secondary-border cursor-not-allowed w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1 truncate overflow-hidden text-ellipsis whitespace-nowrap"
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
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
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
                    className="border-lightsecondary-border focus:border-lightsecondary-strongerborder dark:border-secondary-border dark:focus:border-secondary-strongerborder w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1"
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
                      className="text-lightprimary-text/80 dark:text-primary-text/80 text-xl"
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
                        isNumber: true,
                      })
                    }
                    className="border-lightsecondary-border focus:border-lightsecondary-strongerborder dark:border-secondary-border dark:focus:border-secondary-strongerborder w-full py-2 pl-[1.6rem] lg:pl-9 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
              maxLength={160}
              rows={3}
              className="border-lightsecondary-border dark:border-secondary-border resize-none placeholder-secondary-text/70 dark:placeholder-gray-500 focus:border-lightsecondary-strongerborder dark:focus:border-secondary-strongerborder w-full p-2 lg:p-3 text-xs lg:text-sm bg-lightprimary-bg/70 dark:bg-primary-bg/70 border focus:outline-none rounded-md mt-1"
            />
            <div className="absolute bottom-4 right-2 text-[0.6rem] text-gray-500 dark:text-gray-500">
              {startup.description.length}/160
            </div>
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
                  ? "bg-lightsuccess-bg border-lightsuccess-border dark:bg-success-bg dark:border-success-border"
                  : "bg-lightprimary-bg border-lightsecondary-strongerborder dark:bg-primary-bg dark:border-secondary-strongerborder"
              }`}
            >
              <span
                className={`inline-block w-[0.7rem] h-[0.7rem] lg:w-[0.9rem] lg:h-[0.9rem] transform bg-lightprimary-text dark:bg-primary-text rounded-full transition-transform duration-200 ${
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
              onClick={() => toggleHandler("statusSelected")}
              className={`w-6 lg:w-8 h-6 lg:h-8 ${
                toggles.statusSelected
                  ? "bg-lightprimary-text border-lightsecondary-border text-lightprimary-bg dark:bg-primary-text dark:border-secondary-border dark:text-primary-bg"
                  : "bg-lightprimary-bg border-lightsecondary-border text-lightprimary-text dark:bg-primary-bg dark:border-secondary-border dark:text-primary-text"
              } border rounded-full flex items-center justify-center cursor-pointer`}
            >
              <Flag strokeWidth={1} size={size.width > 1000 ? 18 : 12} />
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
          {toggles.verficationSelected && (
            <div className="bg-morelightbg rounded-md mt-2 w-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="flex rounded-md shadow-sm items-center justify-start pl-2 pr-2"
              >
                <p className="py-2 px-1 text-primary-text text-sm">
                  Verify your domain email for additional security
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex rounded-md shadow-sm items-center justify-center pl-2 pr-2 pb-2"
              >
                <input
                  value={"mail"}
                  onChange={(e) => {}}
                  placeholder="mail address"
                  type="text"
                  autoComplete="off"
                  className="flex-1 h-10 text-primary-text placeholder-gray-500 form-input bg-primary-bg pl-3 block w-[70%] rounded-l-md border border-r-0 border-secondary-strongerborder transition duration-150 ease-in-out sm:text-sm focus:outline-none"
                />
                <span className="inline-flex bg-primary-bg h-10 items-center pr-3 rounded-none border border-l-0 border-secondary-strongerborder  text-gray-400 sm:text-sm">
                  @{startup.website.split("https://")}
                </span>
                <button
                  onClick={() => {}}
                  className="bg-primary-bg h-10 text-primary-text font-normal py-2 px-4 rounded-r-md border border-l-0 border-secondary-strongerborder sm:text-sm"
                >
                  {false ? "Send Email" : "Send Email"}
                </button>
              </motion.div>
            </div>
          )}
          {toggles.settingsSelected && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex items-center justify-start pb-2"
            >
              <div className="h-20 p-2 mt-2 rounded-md flex flex-col items-center justify-center text-primarytext">
                <TabGroup>
                  <TabList className="flex gap-1 lg:gap-2 p-1 bg-primarybg rounded-md">
                    <Tab className="rounded-[0.00875rem] border dark:border-0 border-lightsecondary-border lg:rounded-md py-1 px-3 text-[0.8rem] font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightsecondary-selection data-[hover]:bg-lightprimary-bg/40 data-[selected]:data-[hover]:bg-lightprimary-bg/70 dark:data-[selected]:bg-primary-bg dark:data-[hover]:bg-primary-bg/40 dark:data-[selected]:data-[hover]:bg-primary-bg/70">
                      Visibility on Profile
                    </Tab>
                    <Tab className="rounded-[0.00875rem] border dark:border-0 border-lightsecondary-border lg:rounded-md py-1 px-1.5 text-[0.8rem] font-semibold text-lightprimary-text dark:text-primary-text focus:outline-none data-[selected]:bg-lightsecondary-selection data-[hover]:bg-lightprimary-bg/40 data-[selected]:data-[hover]:bg-lightprimary-bg/70 dark:data-[selected]:bg-primary-bg dark:data-[hover]:bg-primary-bg/40 dark:data-[selected]:data-[hover]:bg-primary-bg/70">
                      API Keys
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <div className="flex m-2">
                        <div className="mr-2 flex items-center justify-center">
                          <input
                            id={`radio-1`}
                            aria-describedby={`radio-text-1`}
                            type="radio"
                            name={`show_toggle-${startup.id}`}
                            value="default"
                            onChange={() =>
                              handleFieldChange({
                                id: startup.id,
                                field: "show_toggle",
                                value: "none",
                              })
                            }
                            checked={startup.show_toggle === "none"}
                            className="w-3 h-3 text-blue-600 bg-gray-100"
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ms-1 text-base font-medium text-lightprimary-text dark:text-gray-300"
                          >
                            None
                          </label>
                        </div>
                        <div className="mr-2 flex items-center justify-center">
                          <input
                            id={`radio-1`}
                            aria-describedby={`radio-text-1`}
                            type="radio"
                            name={`show_toggle-${startup.id}`}
                            value="default"
                            onChange={() =>
                              handleFieldChange({
                                id: startup.id,
                                field: "show_toggle",
                                value: "description",
                              })
                            }
                            checked={startup.show_toggle === "description"}
                            className="w-3 h-3 text-blue-600 bg-gray-100 "
                          />
                          <label
                            htmlFor="default-radio-1"
                            className="ms-1 text-base underline underline-offset-4 decoration-dashed font-medium text-lightprimary-text dark:text-gray-300 interactable"
                            data-type="desc_place"
                          >
                            Description
                          </label>
                        </div>
                        <div
                          onClick={() => {
                            if (Object.keys(startup.api_info).length === 0) {
                              ToastError({ message: "Add API Info first." });
                            }
                          }}
                          className="flex items-center justify-center"
                        >
                          <input
                            id={`radio-2`}
                            aria-describedby={`radio-text-2`}
                            type="radio"
                            disabled={
                              Object.keys(startup.api_info).length === 0
                            }
                            name={`show_toggle-${startup.id}`}
                            onChange={() =>
                              handleFieldChange({
                                id: startup.id,
                                field: "show_toggle",
                                value: "revenue",
                              })
                            }
                            checked={startup.show_toggle === "revenue"}
                            value="default"
                            className="w-3 h-3 text-blue-600 bg-gray-100 "
                          />
                          <label
                            htmlFor="default-radio-1"
                            data-type="revenue_place"
                            className={`interactable underline underline-offset-4 decoration-dashed ms-1 text-base font-medium ${
                              startup.api_info
                                ? "text-lightprimary-text/70 dark:text-gray-300"
                                : "text-lightprimary-text dark:text-gray-500"
                            }`}
                          >
                            Revenue Chart
                          </label>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="flex gap-1.5 m-2">
                        {Object.keys(startup.api_info).length === 0 && (
                          <span
                            onClick={() => {}}
                            className="bg-lightprimary-bg dark:bg-primary-bg p-1 rounded-md cursor-pointer"
                          >
                            <IoAdd size={20} />
                          </span>
                        )}
                        <span
                          className={`${
                            Object.keys(startup.api_info).length !== 0
                              ? "text-lightprimary-text dark:text-primary-text"
                              : "text-lightprimary-text/60 dark:text-primary-text/60"
                          }  p-1 pl-2  pr-2 bg-lightbg rounded-md w-[50%] text-sm`}
                        >
                          {Object.keys(startup.api_info).length !== 0
                            ? startup.api_info.api_id
                            : "NO API INFO FOUND"}
                        </span>
                        <span
                          className={`${
                            Object.keys(startup.api_info).length !== 0
                              ? "text-lightprimary-text dark:text-primary-text"
                              : "text-lightprimary-text/60 dark:text-primary-text/60"
                          } p-1 pl-2 pr-2 bg-lightbg rounded-md w-[50%] text-sm`}
                        >
                          {Object.keys(startup.api_info).length !== 0
                            ? startup.api_info.api_key
                            : "NO API INFO FOUND"}
                        </span>
                        {Object.keys(startup.api_info).length !== 0 && (
                          <span
                            onClick={() => {
                              handleFieldChange({
                                id: startup.id,
                                field: "api_info",
                                value: {},
                              });
                            }}
                            title="delete api info"
                            className="cursor-pointer bg-lightbg p-1 rounded-md text-red-400"
                          >
                            <MdDeleteOutline size={20} />
                          </span>
                        )}
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </motion.div>
          )}
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
                      ? "bg-lightsuccess-bg border-lightsuccess-border dark:bg-success-bg dark:border-success-border"
                      : "bg-lightprimary-bg border-lightsecondary-strongerborder dark:bg-primary-bg dark:border-secondary-strongerborder"
                  }`}
                >
                  <span
                    className={`inline-block w-[0.7rem] h-[0.7rem] lg:w-[0.9rem] lg:h-[0.9rem] transform bg-lightprimary-text dark:bg-primary-text rounded-full transition-transform duration-200 ${
                      startup.show_status
                        ? "translate-x-[1rem] lg:translate-x-5"
                        : "translate-x-[0.2rem]"
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
