const defaultTheme = require("tailwindcss/defaultTheme");
 
const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(0, 0%, 18%)",
          bg: "#121212",
          text: "#ededed",
        },
        secondary: {
          DEFAULT: "hsl(0deg 0% 14.1%)",
          bg: "#262626",
          text: "#6c757d",
          selection: "#333333",
          border: "#363636",
          strongerborder: "#4d4d4d",
        },
        accent: {
          DEFAULT: "#5769c1",
          bg: "#991f00",
          text: "#ff5733",
          selection: "#b32400",
          border: "#ff471a",
          strongerborder: "#ff8566",
        },
        brdr: {
          DEFAULT: "hsl(0deg 0% 21.2%)",
          strong: "#363636",
          stronger: "#666666",
        },
        danger: {
          DEFAULT: "hsl(10.2deg 77.9% 53.9%)",
          bg: "#4d231d",
          selection: "#e34a3f80",
          border: "#823529",
          strongerborder: "#e6563c",
        },
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        pingCustom: {
          '75%, 100%': { transform: 'scale(1.07)', opacity: '0.5' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        pingCustom: 'pingCustom 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        shimmer: 'shimmer 1.5s infinite'
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
