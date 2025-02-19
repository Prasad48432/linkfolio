"use client";
import { SKILLS } from "../utils/constants";
import React, { useState } from "react";
import { Loader, Save } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { ToastError, ToastSuccess } from "@/components/toast";
import { ICONS_MAP } from "./icons-map";


interface Skill {
  name: string;
  icon: string;
}
type Skills = Skill[];
const SkillsSection = ({ fetchedSkills }: { fetchedSkills: Skills }) => {
  const supabase = createClient();
  const [selectedSkills, setSelectedSkills] =
    useState<{ name: string; icon: string }[]>(fetchedSkills);
  const [loading, setLoading] = useState(false);

  const toggleSkillSelection = (skill: { name: string; icon: string }) => {
    setSelectedSkills((prev) =>
      prev.some((s) => s.name === skill.name)
        ? prev.filter((s) => s.name !== skill.name) // Remove if already selected
        : [...prev, skill]
    );
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            user_skills: selectedSkills,
          })
          .eq("id", user.id);

        ToastSuccess({ message: "Update successfull." });
      }
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const areSkillsEqual = (
    skills1: { name: string; icon: string }[],
    skills2: { name: string; icon: string }[]
  ) => {
    if (skills1.length !== skills2.length) return false;
    return skills1.every((skill, index) => {
      return (
        skill.name === skills2[index].name && skill.icon === skills2[index].icon
      );
    });
  };

  return (
    <div className="flex flex-col gap-2 focus:outline-none mb-10 relative">
      <div className="flex flex-col">
        <h1 className="text-lightprimary-text/90 dark:text-primary-text/90 font-medium text-base lg:text-xl px-1">
          Skills Section
        </h1>
        <p className="text-lightprimary-text/70 dark:text-primary-text/70 font-normal text-xs lg:text-sm mb-1 px-1">
          Pick up to 7 skills that represent you best.
        </p>
      </div>
      {!areSkillsEqual(selectedSkills, fetchedSkills) && (
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="fixed bottom-16 lg:bottom-12 left-1/2 -translate-x-1/2 lg:left-1/4 lg:translate-x-[250%] z-[41] font-light w-[70px] text-sm lg:text-base flex items-center justify-center mt-2 bg-success-bg border border-success-border hover:bg-success-bg hover:border-success-strongerborder transition-all ease-out duration-200 text-primary-text py-1 px-1.5 rounded-md disabled:opacity-80"
        >
          {!loading && <span className="absolute -top-1 -right-1 w-2 h-2 flex items-center justify-center">
            <span className="absolute w-full h-full bg-green-500 rounded-full"></span>
            <span className="absolute w-full h-full bg-green-500 rounded-full opacity-75 animate-ping"></span>
          </span>}
          {loading ? (
            <Loader
              size={20}
              strokeWidth={1}
              className="animate-spin text-center"
            />
          ) : (
            <>
              <Save strokeWidth={1} size={18} className="mr-1" /> Save
            </>
          )}
        </button>
      )}
      {Object.entries(SKILLS).map(([category, skills]) => (
        <SkillSection
          key={category}
          title={category.replace(/_/g, " ")}
          skills={skills}
          selectedSkills={selectedSkills}
          toggleSkillSelection={toggleSkillSelection}
        />
      ))}
    </div>
  );
};

const SkillSection = ({
  title,
  skills,
  selectedSkills,
  toggleSkillSelection,
}: {
  title: string;
  skills: { name: string; icon: keyof typeof ICONS_MAP }[];
  selectedSkills: { name: string; icon: keyof typeof ICONS_MAP }[];
  toggleSkillSelection: (skill: {
    name: string;
    icon: keyof typeof ICONS_MAP;
  }) => void;
}) => (
  <div className="px-3 pt-3 pb-4 border border-lightsecondary-strongerborder dark:border-secondary-strongerborder rounded-md border-dashed">
    <p className="text-lightprimary-text/80 dark:text-primary-text/80 font-medium text-base lg:text-lg mb-3">{title}</p>
    <div className="flex items-center justify-start flex-wrap gap-2.5">
      {skills.map((skill) => {
        const isSelected = selectedSkills.some((s) => s.name === skill.name);
        return (
          <div
            key={skill.name}
            onClick={() => {
              if (isSelected || selectedSkills.length < 7) {
                toggleSkillSelection(skill);
              }
            }}
            className={`flex cursor-pointer items-center gap-2 p-2 border rounded-lg ${
              isSelected
                ? "border-lightaccent-border bg-lightaccent-bg text-lightprimary-text dark:border-accent-border dark:bg-accent-bg dark:text-primary-text"
                : selectedSkills.length < 7
                ? "border-lightsecondary-border bg-lightsecondary-bg text-lightprimary-text/60 hover:bg-lightsecondary-selection hover:border-lightsecondary-strongerborder dark:border-secondary-border dark:bg-secondary-bg dark:text-primary-text/60 dark:hover:bg-secondary-selection dark:hover:border-secondary-strongerborder"
                : "border-lightsecondary-border bg-lightsecondary-bg text-lightprimary-text/60 dark:border-secondary-border dark:bg-secondary-bg dark:text-primary-text/60 opacity-50 cursor-not-allowed"
            } transition-all duration-200 ease-out`}
          >
            {ICONS_MAP[skill.icon]}
            <span className="text-xs lg:text-sm select-none">{skill.name}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export default SkillsSection;
