const svgToDataUri = require("mini-svg-data-uri");
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
      fontSize: {
        xxs: ["0.5rem", "0.75rem"],
        ms: ["0.6rem", "0.75rem"],
        mx: ["0.7rem", "0.8rem"],
        sx: ["0.8rem", "1.25rem"],
        herosize: ["2.1rem", "2.3rem"],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          bg: "#121212",
          text: "#ededed",
          foreground: "hsl(var(--primary-foreground))",
          lighter: "#1a1a1a",
        },
        lightprimary: {
          bg: "#eeeae3",
          text: "#3c402b",
          lighter: "#ece7df",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          bg: "#262626",
          text: "#6c757d",
          selection: "#333333",
          border: "#363636",
          strongerborder: "#4d4d4d",
          foreground: "hsl(var(--secondary-foreground))",
        },
        lightsecondary: {
          bg: "#ededed",
          selection: "#d9d9d9",
          text: "#3c402b",
          border: "#3c402b",
          strongerborder: "#656b47",
          loader: "#b8b8b8",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          bg: "#991f00",
          text: "#ff5733",
          selection: "#b32400",
          border: "#ff471a",
          strongerborder: "#ff704d",
          foreground: "hsl(var(--accent-foreground))",
        },
        lightaccent: {
          bg: "#ff9980",
          selection: "#ff8566",
          border: "#625053",
          strongerborder: "#46393b",
          text: "#ff8266",
        },
        danger: {
          DEFAULT: "hsl(10.2deg 77.9% 53.9%)",
          bg: "#4d231d",
          selection: "#e34a3f80",
          border: "#823529",
          strongerborder: "#e6563c",
        },
        lightdanger: {
          DEFAULT: "hsl(10.2deg 77.9% 53.9%)",
          bg: "#ff8080",
          selection: "#ff4d4d",
          border: "#cc0000",
          strongerborder: "#b30000",
        },
        success: {
          DEFAULT: "hsl(154.9deg 100% 19.2%)",
          bg: "#006239",
          selection: "hsl(153.1deg 60.2% 52.7%/0.5)",
          border: "#3ecf8e",
          strongerborder: "hsl(153.1deg 60.2% 52.7%)",
        },
        lightsuccess: {
          DEFAULT: "hsl(154.9deg 100% 19.2%)",
          bg: "#1aff9f",
          selection: "#00e686",
          border: "#009959",
          strongerborder: "#00663c",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
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
          "0%": {
            transform: "translateX(-10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        pingCustom: {
          "75%, 100%": {
            transform: "scale(1.07)",
            opacity: "0.5",
          },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        shine: {
          "0%": {
            backgroundPosition: "0 0",
          },
          "33.33%": {
            backgroundPosition: "-220% 0",
          },
          "100%": {
            backgroundPosition: "-220% 0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        pingCustom: "pingCustom 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        shimmer: "shimmer 1.5s infinite",
        shine: "shine 4s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
