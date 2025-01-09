"use client";
import { SKILLS } from "../utils/constants";
import React, { useState, useEffect } from "react";

const SkillsSection = () => {
  const [selectedSkills, setSelectedSkills] = useState<
    { name: string; icon: any }[]
  >([]);

  const toggleSkillSelection = (skill: { name: string; icon: any }) => {
    setSelectedSkills(
      (prev) =>
        prev.some((s) => s.name === skill.name)
          ? prev.filter((s) => s.name !== skill.name) // Remove if already selected
          : [...prev, skill] // Add if not selected
    );
  };


  return (
    <div className="flex flex-col gap-2 focus:outline-none">
      {selectedSkills.length > 0 && (
        <div className="mt-6 border-t border-secondary-strongerborder pt-4">
          <p className="text-primary-text/80 font-semibold text-lg mb-3">
            Selected Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 p-2 border border-white rounded-lg bg-secondary-selection text-primary-text"
              >
                <skill.icon className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
                <span className="text-xs lg:text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
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
  skills: { name: string; icon: any }[];
  selectedSkills: { name: string; icon: any }[];
  toggleSkillSelection: (skill: { name: string; icon: any }) => void;
}) => (
  <div className="px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
    <p className="text-primary-text/80 font-medium text-lg mb-3">{title}</p>
    <div className="flex items-center justify-start flex-wrap gap-2.5">
      {skills.map((skill) => {
        const isSelected = selectedSkills.some((s) => s.name === skill.name);
        return (
          <div
            key={skill.name}
            onClick={() => toggleSkillSelection(skill)}
            className={`flex cursor-pointer items-center gap-2 p-2 border rounded-lg ${
              isSelected
                ? "border-accent-border bg-accent-bg text-primary-text"
                : "border-secondary-border bg-secondary-bg text-primary-text/70"
            } transition-all duration-200 ease-out`}
          >
            <skill.icon className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
            <span className="text-xs lg:text-sm select-none">{skill.name}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export default SkillsSection;
