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
import { TbBrandCSharp,TbBrandReactNative,TbBrandXamarin  } from "react-icons/tb";
import { DiRuby } from "react-icons/di";
import { BiLogoSpringBoot } from "react-icons/bi";
import { VscAzure } from "react-icons/vsc";
import { PiMicrosoftExcelLogo } from "react-icons/pi";

export const ICONS_MAP: Record<string, JSX.Element> = {
  FaPowerBi: (
    <svg
      viewBox=".8 0 32.3 34"
      className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#231f20">
        <path
          stroke="#ededed"
          d="m11.1 27.3c0 1.1-.9 2.1-2.1 2.1s-2.1-.9-2.1-2.1v-9c0-1.1.9-2.1 2.1-2.1s2.1.9 2.1 2.1zm6 2.4c0 1.1-.9 2.1-2.1 2.1s-2-.9-2-2.1v-13.7c0-1.1.9-2.1 2.1-2.1s2.1.9 2.1 2.1v13.7zm-12.1-4.4c0 1.1-.9 2.1-2.1 2.1s-2.1-.9-2.1-2.1v-4.9c0-1.1.9-2.1 2.1-2.1s2.1 1 2.1 2.1zm18.1 6.6c0 1.1-.9 2.1-2.1 2.1-1.1 0-2-1-2-2.1v-18.2c0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1v18.2z"
        />
        <path
          stroke="#ededed"
          d="m29.7 31c-.4 0-.7-.1-1.1-.2l-2.5-.8c-.4-.1-.7-.6-.5-1 .1-.4.6-.7 1-.5l2.6.8c.5.2 1.1.1 1.6-.3.5-.3.7-.9.7-1.4v-16.7c0-.8-.5-1.5-1.2-1.7l-24.5-7.4c-.5-.2-1.1-.1-1.6.2-.4.4-.7.9-.7 1.5v11.5c0 .5-.4.8-.8.8-.5 0-.8-.4-.8-.8v-11.5c0-1.1.5-2.1 1.4-2.7.9-.7 2-.8 3-.5l24.4 7.4c1.4.4 2.4 1.8 2.4 3.3v16.7c0 1.1-.5 2.1-1.4 2.8-.6.2-1.3.5-2 .5"
        />
      </g>
    </svg>
  ),
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
  PiMicrosoftExcel: (
    <PiMicrosoftExcelLogo className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiCplusplus: (
    <SiCplusplus className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiFlutter: (
    <SiFlutter className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiIonic: (
    <SiIonic className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiKubernetes: (
    <SiKubernetes className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiPlotly: (
    <SiPlotly className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiTailwindcss: (
    <SiTailwindcss className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  SiTableau : <SiTableau className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"/>,
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
  TbBrandReactNative: (
    <TbBrandReactNative className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  TbBrandXamarin: (
    <TbBrandXamarin className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  DiRuby: <DiRuby className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
  BiLogoSpringBoot: (
    <BiLogoSpringBoot className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />
  ),
  VscAzure: <VscAzure className="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]" />,
};
