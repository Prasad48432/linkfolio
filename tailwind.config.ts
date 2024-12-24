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
          DEFAULT: 'hsl(0, 0%, 18%)',
          bg: '#121212',
          text: '#ededed',
        },
        secondary: {
          DEFAULT: 'hsl(0deg 0% 14.1%)',
          bg: '#262626',
          text: '#6c757d',
          selection: '#333333',
          border: '#363636',
          strongerborder: '#4d4d4d',
        },
        accent: {
          DEFAULT: '#5769c1',
          bg: '#b32400',
          text: '#ff5733',
          selection: '#cc2900',
          border: '#ff471a',
          strongerborder: '#ff5c33',
        },
        brdr: {
          DEFAULT: 'hsl(0deg 0% 21.2%)',
          strong: '#363636',
          stronger: '#666666'
        }
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: '0',
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: '1',
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
