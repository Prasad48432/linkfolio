"use client";
import { SKILLS } from "../utils/constants";
import React, { useState, useEffect } from "react";
// constants.ts
import {
  FaPython,
  FaJava,
  FaJsSquare,
  FaReact,
  FaVuejs,
  FaAngular,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaPhp,
  FaRust,
  FaSwift,
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import {
  SiCplusplus,
  SiKubernetes,
  SiTailwindcss,
  SiNextdotjs,
  SiPytorch,
  SiMongodb,
  SiTensorflow,
  SiTypescript,
  SiKotlin,
  SiDart,
  SiJquery,
  SiSvelte,
  SiExpress,
  SiDjango,
  SiNestjs,
  SiFlask,
  SiRubyonrails,
  SiLaravel,
  SiKeras,
  SiScikitlearn,
  SiOpencv,
  SiPandas,
  SiGitlab,
  SiBitbucket,
  SiPostgresql,
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiSqlite,
  SiMysql,
  SiGooglecloud,
  SiVercel,
  SiNetlify,
  SiDigitalocean,
  SiAdobexd,
  SiCanva,
  SiGraphql,
  SiWebrtc,
  SiSocketdotio,
  SiFramer,
  SiBootstrap,
  SiThreedotjs,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { DiRuby } from "react-icons/di";
import { BiLogoSpringBoot } from "react-icons/bi";
import { VscAzure } from "react-icons/vsc";
import { Loader, Save } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { ToastError, ToastSuccess } from "@/components/toast";

const ICONS_MAP: Record<string, JSX.Element> = {
  FaPython: <FaPython className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaJava: <FaJava className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaJsSquare: (
    <FaJsSquare className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  FaReact: <FaReact className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaVuejs: <FaVuejs className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaAngular: (
    <FaAngular className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  FaNodeJs: <FaNodeJs className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaDocker: <FaDocker className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaAws: <FaAws className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaFigma: <FaFigma className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaGitAlt: <FaGitAlt className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaGithub: <FaGithub className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaDatabase: (
    <FaDatabase className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  FaPhp: <FaPhp className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaRust: <FaRust className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaSwift: <FaSwift className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  FaGolang: <FaGolang className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiCplusplus: (
    <SiCplusplus className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiKubernetes: (
    <SiKubernetes className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiTailwindcss: (
    <SiTailwindcss className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiNextdotjs: (
    <SiNextdotjs className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiPytorch: (
    <SiPytorch className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiMongodb: (
    <SiMongodb className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiTensorflow: (
    <SiTensorflow className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiTypescript: (
    <SiTypescript className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiKotlin: <SiKotlin className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiDart: <SiDart className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiJquery: <SiJquery className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiSvelte: <SiSvelte className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiExpress: (
    <SiExpress className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiDjango: <SiDjango className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiNestjs: <SiNestjs className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiFlask: <SiFlask className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiRubyonrails: (
    <SiRubyonrails className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiLaravel: (
    <SiLaravel className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiKeras: <SiKeras className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiScikitlearn: (
    <SiScikitlearn className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiOpencv: <SiOpencv className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiPandas: <SiPandas className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiGitlab: <SiGitlab className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiBitbucket: (
    <SiBitbucket className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiPostgresql: (
    <SiPostgresql className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiRedis: <SiRedis className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiSupabase: (
    <SiSupabase className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiFirebase: (
    <SiFirebase className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiSqlite: <SiSqlite className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiMysql: <SiMysql className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiGooglecloud: (
    <SiGooglecloud className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiVercel: <SiVercel className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiNetlify: (
    <SiNetlify className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiDigitalocean: (
    <SiDigitalocean className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiAdobexd: (
    <SiAdobexd className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiCanva: <SiCanva className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiGraphql: (
    <SiGraphql className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiWebrtc: <SiWebrtc className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiSocketdotio: (
    <SiSocketdotio className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiFramer: <SiFramer className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  SiBootstrap: (
    <SiBootstrap className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiThreedotjs: (
    <SiThreedotjs className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  TbBrandCSharp: (
    <TbBrandCSharp className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  DiRuby: <DiRuby className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  BiLogoSpringBoot: (
    <BiLogoSpringBoot className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  VscAzure: <VscAzure className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
};

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
    <div className="flex flex-col gap-2 focus:outline-none">
      <div className="flex flex-col">
        <h1 className="text-primary-text/90 font-medium text-xl px-1">
          Skills Section
        </h1>
        <p className="text-primary-text/70 font-normal text-sm mb-1 px-1">
          Pick up to 10 skills that represent you best.
        </p>
      </div>
      {!areSkillsEqual(selectedSkills, fetchedSkills) && (
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="font-thin relative ml-auto w-[70px] text-sm flex items-center justify-center mt-2 bg-success-bg border border-success-border hover:bg-success-selection hover:border-success-strongerborder transition-all ease-out duration-200 text-primary-text py-1 px-1.5 rounded-md disabled:opacity-80"
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
  <div className="px-3 pt-3 pb-4 border border-secondary-strongerborder rounded-md border-dashed">
    <p className="text-primary-text/80 font-medium text-lg mb-3">{title}</p>
    <div className="flex items-center justify-start flex-wrap gap-2.5">
      {skills.map((skill) => {
        const isSelected = selectedSkills.some((s) => s.name === skill.name);
        return (
          <div
            key={skill.name}
            onClick={() => {
              if (isSelected || selectedSkills.length < 10) {
                toggleSkillSelection(skill);
              }
            }}
            className={`flex cursor-pointer items-center gap-2 p-2 border rounded-lg ${
              isSelected
                ? "border-accent-border bg-accent-bg text-primary-text"
                : selectedSkills.length < 10
                ? "border-secondary-border bg-secondary-bg text-primary-text/60 hover:bg-secondary-selection hover:border-secondary-strongerborder"
                : "border-secondary-border bg-secondary-bg text-primary-text/60 opacity-50 cursor-not-allowed"
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
