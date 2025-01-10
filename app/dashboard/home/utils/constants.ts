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
  SiThreedotjs
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { DiRuby } from "react-icons/di";
import { BiLogoSpringBoot } from "react-icons/bi";
import { VscAzure } from "react-icons/vsc";

// constants.ts

export const Programming_languages = [
  { name: "Python", icon: "FaPython" },
  { name: "Java", icon: "FaJava" },
  { name: "JavaScript", icon: "FaJsSquare" },
  { name: "C++", icon: "SiCplusplus" },
  { name: "Dart", icon: "SiDart" },
  { name: "PHP", icon: "FaPhp" },
  { name: "Csharp", icon: "TbBrandCSharp" },
  { name: "Ruby", icon: "DiRuby" },
  { name: "GoLang", icon: "FaGolang" },
  { name: "Rust", icon: "FaRust" },
  { name: "Swift", icon: "FaSwift" },
  { name: "Kotlin", icon: "SiKotlin" },
  { name: "Typescript", icon: "SiTypescript" },
  { name: "GraphQL", icon: "SiGraphql" }
];

export const Frontend_technologies = [
  { name: "React", icon: "FaReact" },
  { name: "Vue.js", icon: "FaVuejs" },
  { name: "Angular", icon: "FaAngular" },
  { name: "Next.js", icon: "SiNextdotjs" },
  { name: "ThreeJS", icon: "SiThreedotjs" },
  { name: "Tailwind CSS", icon: "SiTailwindcss" },
  { name: "JQuery", icon: "SiJquery" },
  { name: "Svelte", icon: "SiSvelte" },
  { name: "Bootstrap", icon: "SiBootstrap" }
];

export const Backend_technologies = [
  { name: "Node.js", icon: "FaNodeJs" },
  { name: "Express", icon: "SiExpress" },
  { name: "Django", icon: "SiDjango" },
  { name: "NestJS", icon: "SiNestjs" },
  { name: "Flask", icon: "SiFlask" },
  { name: "Ruby on Rails", icon: "SiRubyonrails" },
  { name: "Laravel", icon: "SiLaravel" },
  { name: "Spring Boot", icon: "BiLogoSpringBoot" }
];

export const AI_and_ML_tools = [
  { name: "TensorFlow", icon: "SiTensorflow" },
  { name: "PyTorch", icon: "SiPytorch" },
  { name: "Keras", icon: "SiKeras" },
  { name: "Scikit", icon: "SiScikitlearn" },
  { name: "OpenCV", icon: "SiOpencv" },
  { name: "Pandas", icon: "SiPandas" }
];

export const DEVOPS_tools = [
  { name: "AWS", icon: "FaAws" },
  { name: "Azure", icon: "VscAzure" },
  { name: "Google Cloud", icon: "SiGooglecloud" },
  { name: "Vercel", icon: "SiVercel" },
  { name: "Netlify", icon: "SiNetlify" },
  { name: "Digital Ocean", icon: "SiDigitalocean" },
  { name: "Docker", icon: "FaDocker" },
  { name: "Kubernetes", icon: "SiKubernetes" }
];

export const Databases = [
  { name: "Postgresql", icon: "SiPostgresql" },
  { name: "MongoDB", icon: "SiMongodb" },
  { name: "Redis", icon: "SiRedis" },
  { name: "Supabase", icon: "SiSupabase" },
  { name: "Firebase", icon: "SiFirebase" },
  { name: "SQLite", icon: "SiSqlite" },
  { name: "MySQL", icon: "SiMysql" }
];

export const Version_control_and_collaboration =[
  { name: "Git", icon: "FaGitAlt" },
  { name: "GitHub", icon: "FaGithub" },
  { name: "GitLab", icon: "SiGitlab" },
  { name: "BitBucket", icon: "SiBitbucket" }
];

export const Design_tools = [
  { name: "Figma", icon: "FaFigma" },
  { name: "AdobeXD", icon: "SiAdobexd" },
  { name: "Canva", icon: "SiCanva" }
];

export const Others = [
  { name: "WebRTC", icon: "SiWebrtc" },
  { name: "Socket.io", icon: "SiSocketdotio" },
  { name: "Framer", icon: "SiFramer" }
];

// Grouped export for easier import
export const SKILLS = {
  Programming_languages,
  Frontend_technologies,
  Backend_technologies,
  Databases,
  Version_control_and_collaboration,
  AI_and_ML_tools,
  DEVOPS_tools,
  Design_tools,
  Others
};

