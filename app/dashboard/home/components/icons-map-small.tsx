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
  SiTableau,
  SiPlotly,
  SiFlutter,
  SiIonic
} from "react-icons/si";
import { TbBrandCSharp,TbBrandReactNative,TbBrandXamarin} from "react-icons/tb";
import { DiRuby } from "react-icons/di";
import { BiLogoSpringBoot } from "react-icons/bi";
import { VscAzure } from "react-icons/vsc";
import { PiMicrosoftExcelLogo } from "react-icons/pi";

export const ICONS_MAP_SMALL: Record<string, JSX.Element> = {
  FaPowerBi: (
    <svg
      viewBox=".8 0 32.3 34"
      className="w-[10px] h-[10px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#231f20">
        <path d="m11.1 27.3c0 1.1-.9 2.1-2.1 2.1s-2.1-.9-2.1-2.1v-9c0-1.1.9-2.1 2.1-2.1s2.1.9 2.1 2.1zm6 2.4c0 1.1-.9 2.1-2.1 2.1s-2-.9-2-2.1v-13.7c0-1.1.9-2.1 2.1-2.1s2.1.9 2.1 2.1v13.7zm-12.1-4.4c0 1.1-.9 2.1-2.1 2.1s-2.1-.9-2.1-2.1v-4.9c0-1.1.9-2.1 2.1-2.1s2.1 1 2.1 2.1zm18.1 6.6c0 1.1-.9 2.1-2.1 2.1-1.1 0-2-1-2-2.1v-18.2c0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1v18.2z" />
        <path d="m29.7 31c-.4 0-.7-.1-1.1-.2l-2.5-.8c-.4-.1-.7-.6-.5-1 .1-.4.6-.7 1-.5l2.6.8c.5.2 1.1.1 1.6-.3.5-.3.7-.9.7-1.4v-16.7c0-.8-.5-1.5-1.2-1.7l-24.5-7.4c-.5-.2-1.1-.1-1.6.2-.4.4-.7.9-.7 1.5v11.5c0 .5-.4.8-.8.8-.5 0-.8-.4-.8-.8v-11.5c0-1.1.5-2.1 1.4-2.7.9-.7 2-.8 3-.5l24.4 7.4c1.4.4 2.4 1.8 2.4 3.3v16.7c0 1.1-.5 2.1-1.4 2.8-.6.2-1.3.5-2 .5" />
      </g>
    </svg>
  ),
  FaPython: <FaPython className="w-[10px] h-[10px]" />,
  FaJava: <FaJava className="w-[10px] h-[10px]" />,
  FaJsSquare: (
    <FaJsSquare className="w-[10px] h-[10px]" />
  ),
  FaReact: <FaReact className="w-[10px] h-[10px]" />,
  FaVuejs: <FaVuejs className="w-[10px] h-[10px]" />,
  FaAngular: (
    <FaAngular className="w-[10px] h-[10px]" />
  ),
  FaNodeJs: <FaNodeJs className="w-[10px] h-[10px]" />,
  FaDocker: <FaDocker className="w-[10px] h-[10px]" />,
  FaAws: <FaAws className="w-[10px] h-[10px]" />,
  FaFigma: <FaFigma className="w-[10px] h-[10px]" />,
  FaGitAlt: <FaGitAlt className="w-[10px] h-[10px]" />,
  FaGithub: <FaGithub className="w-[10px] h-[10px]" />,
  FaDatabase: (
    <FaDatabase className="w-[10px] h-[10px]" />
  ),
  FaPhp: <FaPhp className="w-[10px] h-[10px]" />,
  FaRust: <FaRust className="w-[10px] h-[10px]" />,
  FaSwift: <FaSwift className="w-[10px] h-[10px]" />,
  FaGolang: <FaGolang className="w-[10px] h-[10px]" />,
  PiMicrosoftExcel: <PiMicrosoftExcelLogo className="w-[10px] h-[10px]" />,
  SiCplusplus: (
    <SiCplusplus className="w-[10px] h-[10px]" />
  ),
  SiFlutter: (
    <SiFlutter className="w-[10px] h-[10px]" />
  ),
  SiIonic: (
    <SiIonic className="w-[10px] h-[10px]" />
  ),
  SiKubernetes: (
    <SiKubernetes className="w-[10px] h-[10px]" />
  ),
  SiPlotly: (
    <SiPlotly className="w-[10px] h-[10px]" />
  ),
  SiTailwindcss: (
    <SiTailwindcss className="w-[10px] h-[10px]" />
  ),
  SiTableau : <SiTableau className="w-[10px] h-[10px]" />,
  SiNextdotjs: (
    <SiNextdotjs className="w-[10px] h-[10px]" />
  ),
  SiPytorch: (
    <SiPytorch className="w-[10px] h-[10px]" />
  ),
  SiMongodb: (
    <SiMongodb className="w-[10px] h-[10px]" />
  ),
  SiTensorflow: (
    <SiTensorflow className="w-[10px] h-[10px]" />
  ),
  SiTypescript: (
    <SiTypescript className="w-[10px] h-[10px]" />
  ),
  SiKotlin: <SiKotlin className="w-[10px] h-[10px]" />,
  SiDart: <SiDart className="w-[10px] h-[10px]" />,
  SiJquery: <SiJquery className="w-[10px] h-[10px]" />,
  SiSvelte: <SiSvelte className="w-[10px] h-[10px]" />,
  SiExpress: (
    <SiExpress className="w-[10px] h-[10px]" />
  ),
  SiDjango: <SiDjango className="w-[10px] h-[10px]" />,
  SiNestjs: <SiNestjs className="w-[10px] h-[10px]" />,
  SiFlask: <SiFlask className="w-[10px] h-[10px]" />,
  SiRubyonrails: (
    <SiRubyonrails className="w-[10px] h-[10px]" />
  ),
  SiLaravel: (
    <SiLaravel className="w-[10px] h-[10px]" />
  ),
  SiKeras: <SiKeras className="w-[10px] h-[10px]" />,
  SiScikitlearn: (
    <SiScikitlearn className="w-[10px] h-[10px]" />
  ),
  SiOpencv: <SiOpencv className="w-[10px] h-[10px]" />,
  SiPandas: <SiPandas className="w-[10px] h-[10px]" />,
  SiGitlab: <SiGitlab className="w-[10px] h-[10px]" />,
  SiBitbucket: (
    <SiBitbucket className="w-[10px] h-[10px]" />
  ),
  SiPostgresql: (
    <SiPostgresql className="w-[10px] h-[10px]" />
  ),
  SiRedis: <SiRedis className="w-[10px] h-[10px]" />,
  SiSupabase: (
    <SiSupabase className="w-[10px] h-[10px]" />
  ),
  SiFirebase: (
    <SiFirebase className="w-[10px] h-[10px]" />
  ),
  SiSqlite: <SiSqlite className="w-[10px] h-[10px]" />,
  SiMysql: <SiMysql className="w-[10px] h-[10px]" />,
  SiGooglecloud: (
    <SiGooglecloud className="w-[10px] h-[10px]" />
  ),
  SiVercel: <SiVercel className="w-[10px] h-[10px]" />,
  SiNetlify: (
    <SiNetlify className="w-[10px] h-[10px]" />
  ),
  SiDigitalocean: (
    <SiDigitalocean className="w-[10px] h-[10px]" />
  ),
  SiAdobexd: (
    <SiAdobexd className="w-[10px] h-[10px]" />
  ),
  SiCanva: <SiCanva className="w-[10px] h-[10px]" />,
  SiGraphql: (
    <SiGraphql className="w-[10px] h-[10px]" />
  ),
  SiWebrtc: <SiWebrtc className="w-[10px] h-[10px]" />,
  SiSocketdotio: (
    <SiSocketdotio className="w-[10px] h-[10px]" />
  ),
  SiFramer: <SiFramer className="w-[10px] h-[10px]" />,
  SiBootstrap: (
    <SiBootstrap className="w-[10px] h-[10px]" />
  ),
  SiThreedotjs: (
    <SiThreedotjs className="w-[10px] h-[10px]" />
  ),
  TbBrandCSharp: (
    <TbBrandCSharp className="w-[10px] h-[10px]" />
  ),
  TbBrandReactNative: (
    <TbBrandReactNative className="w-[10px] h-[10px]" />
  ),
  TbBrandXamarin: (
    <TbBrandXamarin className="w-[10px] h-[10px]" />
  ),
  DiRuby: <DiRuby className="w-[10px] h-[10px]" />,
  BiLogoSpringBoot: (
    <BiLogoSpringBoot className="w-[10px] h-[10px]" />
  ),
  VscAzure: <VscAzure className="w-[10px] h-[10px]" />,
};