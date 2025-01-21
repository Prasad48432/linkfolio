"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  BatteryLow,
  ExternalLink,
  Eye,
  Loader,
  MapPin,
  Plus,
  SignalMedium,
  X,
} from "lucide-react";
import MarkdownParser from "@/components/markdown-parser";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { createClient } from "@/utils/supabase/client";
import StartupCard from "./components/startupcard";
import ProjectCard from "./components/projectcard";
import LinkCard from "./components/linkcard";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { ToastError, ToastSuccess } from "@/components/toast";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  fetchLinks,
  fetchProjects,
  fetchStartups,
} from "./functions/fetchContent";

type IndexConversion = "startupAdd" | "linkAdd" | "projectAdd";

const Projects = () => {
  const supabase = createClient();
  const [preview, setPreview] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [links, setLinks] = useState<any[] | null>([]);
  const [startups, setStartups] = useState<any[] | null>([]);
  const [projects, setProjects] = useState<any[] | null>([]);
  const [toggles, setToggles] = useState<{
    startupAdd: boolean;
    linkAdd: boolean;
    projectAdd: boolean;
  }>({
    startupAdd: false,
    linkAdd: false,
    projectAdd: false,
  });
  const [values, setValues] = useState<{
    startupAdd: string;
    linkAdd: string;
    projectAdd: string;
  }>({
    startupAdd: "",
    linkAdd: "",
    projectAdd: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const updateFieldInSupabase = async ({
    id,
    field,
    value,
  }: {
    id: string;
    field: string;
    value: any;
  }) => {
    try {
      const { data, error } = await supabase
        .from("startups")
        .update({ [field]: value })
        .eq("id", id);

      if (error) {
        ToastError({
          message: "An unexpected error occurred.",
        });
      }

      ToastSuccess({ message: "Updated successfully." });
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
    }
  };

  const debouncedUpdateField = useCallback(
    debounce(updateFieldInSupabase, 1000),
    []
  );

  const handleFieldChange = ({
    id,
    field,
    value,
  }: {
    id: string;
    field: string;
    value: any;
  }) => {
    // if (field === "revenue") {
    //   const parsedValue = parseInt(value, 10);
    //   if (!isNaN(parsedValue)) {
    //     value = parsedValue;
    //   } else {
    //     toast.error("invalid input", {
    //       duration: 1000,
    //       style: {
    //         background: "#131313",
    //         color: "#FF2E2E",
    //         border: "1px solid #3B3B3B",
    //       },
    //     });
    //     return;
    //   }
    // }

    setStartups((prev) =>
      // @ts-expect-error
      prev.map((startup) =>
        startup.id === id ? { ...startup, [field]: value } : startup
      )
    );
    // Pass arguments directly
    debouncedUpdateField({ id, field, value });
  };

  const StartupsDragStart = (start: any) => {
    setDraggingItemId(start.draggableId); // Set the ID of the currently dragged item
  };

  const StartupsDragEnd = async (result: any) => {
    setDraggingItemId(null);
    if (!result.destination || !startups) return;

    const reorderedStartups = Array.from(startups);
    const [reorderedStartup] = reorderedStartups.splice(result.source.index, 1);
    reorderedStartups.splice(result.destination.index, 0, reorderedStartup);

    try {
      // Update local state
      setStartups(reorderedStartups);

      // Update only the startups whose indices have changed
      await Promise.all(
        reorderedStartups.map(async (startup, index) => {
          if (startup.index !== index + 1) {
            // Only update if the index has changed
            const { error } = await supabase
              .from("startups")
              .update({ index: index + 1 })
              .eq("id", startup.id);

            if (error) {
              ToastError({ message: "An unexpected error occurred." });
            }
          }
        })
      );

      ToastSuccess({ message: "Indices updated successfully" });
    } catch (err) {
      console.error("Error during reordering:", err);
      ToastError({ message: "An unexpected error occurred." });
    }
  };

  const toggleHandler = (key: IndexConversion) => {
    setToggles((prev) => {
      const isTogglingOff = prev[key];
      if (isTogglingOff) {
        setValues((prevValues) => ({
          ...prevValues,
          [key]: "",
        }));
      }
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const handleChange = ({
    key,
    value,
  }: {
    key: IndexConversion;
    value: string;
  }) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAdd = async ({
    table,
    value,
  }: {
    table: string;
    value: string;
  }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userId = user?.id;

      if (!userId) return;

      if (value === "") {
        ToastError({ message: "Enter a valid link" });
        return;
      }

      setAddLoading(true);

      let exists = false;
      let secureValue = `https://${value}`;

      // Query the respective table based on the conditions
      if (table === "startups") {
        const { data } = await supabase
          .from("startups")
          .select("website")
          .eq("website", secureValue)
          .eq("verified", true);

        exists = (data && data.length > 0) || false;
      } else if (table === "links") {
        const { data } = await supabase
          .from("links")
          .select("link")
          .eq("link", secureValue);

        exists = (data && data.length > 0) || false;
      } else if (table === "projects") {
        const { data } = await supabase
          .from("projects")
          .select("github_link, website_link")
          .or(`github_link.eq.${secureValue},website_link.eq.${secureValue}`);

        exists = (data && data.length > 0) || false;
      }

      // If the value exists, stop further execution
      if (exists) {
        ToastError({ message: "Value already exists in the database." });
        setAddLoading(false);
        return;
      }

      if (table === "startups") {
        const { data: maxIndexData, error: maxIndexError } = await supabase
          .from("startups")
          .select("index")
          .order("index", { ascending: false })
          .limit(1);

        if (maxIndexError) {
          ToastError({ message: "Failed to fetch max index" });
          setAddLoading(false);
          return;
        }

        const newIndex =
          maxIndexData?.length > 0 ? maxIndexData[0].index + 1 : 1;

        const { error } = await supabase.from(table).insert({
          user_id: userId,
          name: "",
          description: "",
          category: "",
          website: value,
          status: "active",
          verified: false,
          index: newIndex,
          estimated_revenue: 0,
          visibility_on_profile: true,
          show_status: true,
        });

        if (error) throw error;
        else ToastSuccess({ message: "New entry inserted successfully" });
      }
      setAddLoading(false);
    } catch (error) {
      console.error("Error handling add logic:", error);
      setAddLoading(false);
    }
  };

  useEffect(() => {
    if (preview) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [preview]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;
        await Promise.all([
          fetchLinks({ userId, supabase, setLinks }),
          fetchStartups({ userId, supabase, setStartups }),
          fetchProjects({ userId, supabase, setProjects }),
        ]);
      } catch (error) {
        ToastError({ message: "An unexpected error occurred." });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const initializeListeners = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const userId = user?.id;

        const startupsSubscription = supabase
          .channel("startups-changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "startups",
              filter: `user_id=eq.${userId}`,
            },
            () => {
              fetchStartups({ userId, supabase, setStartups }); // Refetch data on any change
            }
          )
          .subscribe();

        const linksSubscription = supabase
          .channel("links-changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "links",
              filter: `user_id=eq.${userId}`,
            },
            () => {
              fetchLinks({ userId, supabase, setLinks }); // Refetch data on any change
            }
          )
          .subscribe();

        const projectsSubscription = supabase
          .channel("projects-changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "projects",
              filter: `user_id=eq.${userId}`,
            },
            () => {
              fetchProjects({ userId, supabase, setProjects }); // Refetch data on any change
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(startupsSubscription);
          supabase.removeChannel(linksSubscription);
          supabase.removeChannel(projectsSubscription);
        };
      } catch (error) {
        console.log(error);
      }
    };

    initializeListeners();
  }, []);

  return (
    <>
      <div
        onClick={() => setPreview(true)}
        className="lg:hidden font-bold py-1 px-2 inline-flex items-center justify-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-400 w-[120px] bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
      >
        <Eye strokeWidth={1} className="text-primarytext text-lg mr-1" />
        <p className="text-primarytext font-semibold text-base">Preview</p>
      </div>
      <div className="flex gap-2 h-auto lg:h-[calc(100vh-100px)] relative">
        <div className="lg:w-[55%] w-full lg:overflow-y-auto">
          <TabGroup
            onChange={() => {
              setValues({
                startupAdd: "",
                linkAdd: "",
                projectAdd: "",
              });
              setToggles({
                startupAdd: false,
                linkAdd: false,
                projectAdd: false,
              });
            }}
          >
            <TabList className="flex p-1.5 lg:p-2 bg-secondary-bg/40 gap-1 rounded-full mx-1">
              <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-primary-text focus:outline-none data-[selected]:bg-accent-bg border border-secondary-border data-[selected]:border-accent-border data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-accent-bg/80 data-[focus]:outline-1 data-[focus]:outline-white">
                Startups
              </Tab>
              <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-primary-text focus:outline-none data-[selected]:bg-accent-bg border border-secondary-border data-[selected]:border-accent-border data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-accent-bg/80 data-[focus]:outline-1 data-[focus]:outline-white">
                Projects
              </Tab>
              <Tab className="transition-all ease-out duration-200 rounded-full py-1 px-3 text-[0.8rem] lg:text-sm/6 font-semibold text-primary-text focus:outline-none data-[selected]:bg-accent-bg border border-secondary-border data-[selected]:border-accent-border data-[hover]:bg-secondary-selection data-[selected]:data-[hover]:bg-accent-bg/80 data-[focus]:outline-1 data-[focus]:outline-white">
                Links
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <>
                    <div className="w-full h-10 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-[260px] bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-[260px] bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-[260px] bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                  </>
                ) : (
                  <>
                    {!toggles.startupAdd && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => toggleHandler("startupAdd")}
                        className="w-full h-10 cursor-pointer rounded-md bg-secondary-bg/40 hover:bg-secondary-bg/70 text-primary-text/70 hover:text-primary-text transition-all duration-200 ease-out flex gap-2 items-center justify-center border border-secondary-border hover:border-secondary-strongerborder"
                      >
                        <Plus strokeWidth={1} />
                        Add
                      </motion.div>
                    )}
                    {toggles.startupAdd && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-14 rounded-md p-1 bg-secondary-bg/50 text-primary-text border border-secondary-border flex items-center justify-center"
                      >
                        <div className="flex rounded-md shadow-sm items-center justify-center w-[90%] gap-1 lg:gap-2">
                          <div className="w-full flex items-center justify-center">
                            <span className="inline-flex bg-secondary-bg h-8 lg:h-10 items-center pl-1.5 lg:pl-3 rounded-l-md border border-r-0 border-secondary-strongerborder text-gray-400 text-xs sm:text-sm">
                              https://
                            </span>
                            <input
                              placeholder="link to startup"
                              type="text"
                              value={values.startupAdd}
                              onChange={(e) => {
                                handleChange({
                                  key: "startupAdd",
                                  value: e.target.value,
                                });
                              }}
                              autoComplete="off"
                              className="flex-1 h-8 lg:h-10 text-primary-text placeholder-secondary-text form-input bg-secondary-bg pr-3 block w-[70%] focus:outline-none rounded-none border border-l-0 border-secondary-strongerborder transition duration-150 ease-in-out text-xs sm:text-sm"
                            />
                            <button
                              onClick={(e) => {
                                handleAdd({
                                  table: "startups",
                                  value: values.startupAdd,
                                });
                              }}
                              className="bg-secondary-bg h-8 lg:h-10 w-16 lg:w-20 text-primary-text font-medium py-2 px-4 rounded-r-md border border-l-0 border-secondary-strongerborder text-xs sm:text-sm flex items-center justify-center"
                            >
                              {addLoading ? (
                                <Loader
                                  strokeWidth={1}
                                  className="animate-spin"
                                />
                              ) : (
                                "Add"
                              )}
                            </button>
                          </div>
                          <p
                            onClick={() => {
                              toggleHandler("startupAdd");
                            }}
                            className="cursor-pointer px-2 py-2"
                          >
                            <RxCross2
                              size={25}
                              className="text-primarytext text-red-500"
                            />
                          </p>
                        </div>
                      </motion.div>
                    )}
                    <div className="items-center justify-center flex flex-col w-full">
                      <DragDropContext
                        onDragStart={StartupsDragStart}
                        onDragEnd={StartupsDragEnd}
                      >
                        <Droppable droppableId="startup-list">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="w-full flex flex-col gap-3"
                            >
                              {/* Render draggable items here */}
                              {startups?.map((startup, index) => (
                                <Draggable
                                  key={startup.id}
                                  draggableId={startup.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`transition-colors duration-300 border rounded-md ${
                                        draggingItemId === startup.id
                                          ? "border-white/70 border-dashed opacity-100"
                                          : draggingItemId
                                          ? "opacity-50 border border-dashed border-secondary-border"
                                          : "opacity-100 border border-secondary-border"
                                      }`}
                                    >
                                      <StartupCard
                                        key={startup.id}
                                        startup={startup}
                                        handleFieldChange={handleFieldChange}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </>
                )}
              </TabPanel>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <>
                    <div className="w-full h-10 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-36 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-36 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-36 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                  </>
                ) : (
                  <>
                    {!toggles.projectAdd && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => toggleHandler("projectAdd")}
                        className="w-full h-10 cursor-pointer rounded-md bg-secondary-bg/40 hover:bg-secondary-bg/70 text-primary-text/70 hover:text-primary-text transition-all duration-200 ease-out flex gap-2 items-center justify-center border border-secondary-border hover:border-secondary-strongerborder"
                      >
                        <Plus strokeWidth={1} />
                        Add
                      </motion.div>
                    )}
                    {toggles.projectAdd && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-14 rounded-md p-1 bg-secondary-bg/50 text-primary-text border border-secondary-border flex items-center justify-center"
                      >
                        <div className="flex rounded-md shadow-sm items-center justify-center w-[90%] gap-1 lg:gap-2">
                          <div className="w-full flex items-center justify-center">
                            <span className="inline-flex bg-secondary-bg h-8 lg:h-10 items-center pl-3 rounded-l-md border border-r-0 border-secondary-strongerborder text-gray-400 text-xs sm:text-sm">
                              https://
                            </span>
                            <input
                              placeholder="link to github or website"
                              type="text"
                              value={values.projectAdd}
                              onChange={(e) => {
                                handleChange({
                                  key: "projectAdd",
                                  value: e.target.value,
                                });
                              }}
                              autoComplete="off"
                              className="flex-1 h-8 lg:h-10 text-primary-text placeholder-secondary-text form-input bg-secondary-bg pr-3 block w-[70%] focus:outline-none rounded-none border border-l-0 border-secondary-strongerborder transition duration-150 ease-in-out text-xs sm:text-sm"
                            />
                            <button
                              onClick={(e) => {
                                handleAdd({
                                  table: "projects",
                                  value: values.projectAdd,
                                });
                              }}
                              className="bg-secondary-bg h-8 lg:h-10 w-16 lg:w-20 text-primary-text font-medium py-2 px-4 rounded-r-md border border-l-0 border-secondary-strongerborder text-xs sm:text-sm flex items-center justify-center"
                            >
                              {addLoading ? (
                                <Loader
                                  strokeWidth={1}
                                  className="animate-spin"
                                />
                              ) : (
                                "Add"
                              )}
                            </button>
                          </div>
                          <p
                            onClick={() => {
                              toggleHandler("projectAdd");
                            }}
                            className="cursor-pointer px-2 py-2"
                          >
                            <RxCross2
                              size={25}
                              className="text-primarytext text-red-500"
                            />
                          </p>
                        </div>
                      </motion.div>
                    )}
                    {projects?.map((project) => {
                      return <ProjectCard key={project.id} project={project} />;
                    })}
                  </>
                )}
              </TabPanel>
              <TabPanel className="max-w-2xl px-2.5 py-4 flex flex-col gap-4">
                {fetchLoading ? (
                  <>
                    <div className="w-full h-10 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-36 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-36 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                    <div className="w-full h-36 bg-secondary-bg rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary-bg via-gray-400/20 to-secondary-bg animate-shimmer" />
                    </div>
                  </>
                ) : (
                  <>
                    {!toggles.linkAdd && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => toggleHandler("linkAdd")}
                        className="w-full h-10 cursor-pointer rounded-md bg-secondary-bg/40 hover:bg-secondary-bg/70 text-primary-text/70 hover:text-primary-text transition-all duration-200 ease-out flex gap-2 items-center justify-center border border-secondary-border hover:border-secondary-strongerborder"
                      >
                        <Plus strokeWidth={1} />
                        Add
                      </motion.div>
                    )}
                    {toggles.linkAdd && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-14 rounded-md p-1 bg-secondary-bg/50 text-primary-text border border-secondary-border flex items-center justify-center"
                      >
                        <div className="flex rounded-md shadow-sm items-center justify-center w-[90%] gap-2">
                          <div className="w-full flex items-center justify-center">
                            <span className="inline-flex bg-secondary-bg h-10 items-center pl-3 rounded-l-md border border-r-0 border-secondary-strongerborder text-gray-400 text-xs sm:text-sm">
                              https://
                            </span>
                            <input
                              placeholder="enter your link"
                              type="text"
                              value={values.linkAdd}
                              onChange={(e) => {
                                handleChange({
                                  key: "linkAdd",
                                  value: e.target.value,
                                });
                              }}
                              autoComplete="off"
                              className="flex-1 h-10 text-primary-text placeholder-secondary-text form-input bg-secondary-bg pr-3 block w-[70%] focus:outline-none rounded-none border border-l-0 border-secondary-strongerborder transition duration-150 ease-in-out text-xs sm:text-sm"
                            />
                            <button
                              onClick={(e) => {
                                handleAdd({
                                  table: "links",
                                  value: values.linkAdd,
                                });
                              }}
                              className="bg-secondary-bg h-10 w-32 text-primary-text font-medium py-2 px-4 rounded-r-md border border-l-0 border-secondary-strongerborder text-xs sm:text-sm flex items-center justify-center"
                            >
                              {addLoading ? (
                                <Loader
                                  strokeWidth={1}
                                  className="animate-spin"
                                />
                              ) : (
                                "Add"
                              )}
                            </button>
                          </div>
                          <p
                            onClick={() => {
                              toggleHandler("linkAdd");
                            }}
                            className="cursor-pointer px-2 py-2"
                          >
                            <RxCross2
                              size={25}
                              className="text-primarytext text-red-500"
                            />
                          </p>
                        </div>
                      </motion.div>
                    )}
                    {links?.map((link) => {
                      return <LinkCard key={link.id} link={link} />;
                    })}
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
        <div
          className={`${
            preview ? "flex" : "hidden"
          } lg:flex scale-90 md:scale-100 z-[49] bg-primary-bg lg:bg-transparent lg:z-10 w-full bg-darkbg rounded-lg p-6 lg:p-4 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-[calc(50%-28px)] lg:translate-x-0 lg:translate-y-0 lg:static lg:right-auto lg:top-auto lg:w-[45%] lg:h-[85vh]`}
        >
          <p
            onClick={() => setPreview(false)}
            className="block lg:hidden absolute top-0 right-0 text-primary-text cursor-pointer"
          >
            <X />
          </p>
          <div className="relative mx-auto border-black dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[130px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[90px] h-[5px] bg-gray-400 bottom-0.5 z-50 rounded-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[17%] -translate-x-1/2 absolute">
              9:41
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-[0.3rem] left-[85%] -translate-x-1/2 absolute">
              <BatteryLow size={15} />
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[78%] -translate-x-1/2 absolute">
              <SignalMedium size={15} />
            </div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[5px] bg-black absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="h-[10px] w-[10px] bg-white/10 absolute top-0 left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[5px] w-[5px] bg-white/20 absolute top-[2.5px] left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[10px] w-[50px] bg-white/10 absolute top-0 left-[53%] -translate-x-1/2 rounded-full"></div>
            {fetchLoading ? (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-primary-bg flex items-center justify-center">
                <Loader strokeWidth={1.5} size={24} className="animate-spin" />
              </div>
            ) : (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-black">
                <div className="bg-primary-bg/80 w-[272px] h-[572px]"></div>
                <div className="absolute top-4 left-0 w-full h-[97.3%] rounded-b-[2.1rem] p-4 scrollbar-hidden">
                  <div
                    style={{
                      backgroundColor: "#343434",
                    }}
                    className="absolute top-[-8px] right-0 m-4 rounded-md p-1 cursor-pointer"
                    title="share"
                  >
                    <ExternalLink
                      style={{
                        color: "#ffffff",
                      }}
                      size={16}
                    />
                  </div>
                  <div className="flex items-center">
                    <Image
                      src={"/avatars/Annie.png"}
                      className="w-[50px] h-[50px] rounded-full p-0.5 border border-secondary-border object-cover"
                      alt="overlay"
                      referrerPolicy="no-referrer"
                      width={200}
                      height={200}
                    />
                    <div className="">
                      <h1 className="text-white text-sm font-bold ml-3">
                        Sai Prasad
                      </h1>
                      <div className="flex justify-center items-center text-gray-300 text-sm mt-[0.1rem] ml-[0.6rem]">
                        <MapPin size={12} />
                        <h2
                          title="India"
                          className="cursor-pointer text-xs ml-0.5 mr-1 max-w-12 text-ellipsis truncate"
                        >
                          India
                        </h2>
                        <div className="h-3 border-l border-secondary-border mr-1"></div>
                        <span className="text-xs">₹</span>
                        <span className="text-xs">20000</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-white text-sm font-semibold">Bio</h3>
                    <MarkdownParser
                      text="hello everyone"
                      className="text-primary-text/80 text-xs"
                    />
                  </div>
                  <div className="mt-4 border-t border-secondary-border"></div>
                  <div className="mt-4">
                    <TabGroup>
                      <TabList className="flex p-0.5 gap-2 rounded-full mx-0.5 items-center justify-center">
                        <Tab className="transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-[0.6rem] font-semibold text-primary-text data-[selected]:text-accent-text focus:outline-none data-[selected]:underline underline-offset-2 decoration-2  data-[selected]:decoration-accent-bg">
                          Startups
                        </Tab>
                        <Tab className="transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-[0.6rem] font-semibold text-primary-text data-[selected]:text-accent-text focus:outline-none data-[selected]:underline underline-offset-2 decoration-2  data-[selected]:decoration-accent-bg">
                          Projects
                        </Tab>
                        <Tab className="transition-all ease-out duration-200 rounded-full py-0.5 px-1.5 text-[0.6rem] font-semibold text-primary-text data-[selected]:text-accent-text focus:outline-none data-[selected]:underline underline-offset-2 decoration-2  data-[selected]:decoration-accent-bg">
                          Links
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel className="w-full px-1 py-2 flex flex-col gap-2">
                          {startups?.map((startup) => {
                            return (
                              <div
                                className="w-full h-24 text-xxs rounded-md bg-secondary-bg border-secondary-border flex flex-col items-center justify-center text-primary-text"
                                key={startup.id}
                              >
                                <p>{startup.id}</p>
                                <p>{startup.name}</p>
                                <p>{startup.description}</p>
                              </div>
                            );
                          })}
                        </TabPanel>
                        <TabPanel className="w-full px-1 py-2 flex flex-col gap-2">
                          {projects?.map((project) => {
                            return (
                              <div
                                className="w-full h-24 text-xxs rounded-md bg-secondary-bg border-secondary-border flex flex-col items-center justify-center text-primary-text"
                                key={project.id}
                              >
                                <p>{project.id}</p>
                                <p>{project.name}</p>
                                <p>{project.description}</p>
                                <p>{project.github_link}</p>
                              </div>
                            );
                          })}
                        </TabPanel>
                        <TabPanel className="w-full px-1 py-2 flex flex-col gap-2">
                          {links?.map((link) => {
                            return (
                              <div
                                className="w-full h-24 text-xxs rounded-md bg-secondary-bg border-secondary-border flex flex-col items-center justify-center text-primary-text"
                                key={link.id}
                              >
                                <p>{link.id}</p>
                                <p>{link.title}</p>
                                <p>{link.link}</p>
                              </div>
                            );
                          })}
                        </TabPanel>
                      </TabPanels>
                    </TabGroup>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
