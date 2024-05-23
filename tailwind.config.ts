import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      customGray: '#333333',  // Your specific color
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderWidth: {
        "3": "3px",
        "10": "10px",
      },
      margin: {
        '4.5': '18px',
        '6.5': '26px'
      },
      padding: {
        '7.5': '30px',
        '6.5': '26px',
        '8.75': '35px'
      },
      height: {
        '18': '72px',
        '18.75': '75px'
      },
      width: {
        '18': '72px',
        '18.75': '75px'
      },
      gap: {
        '7.5': '30px'
      }
    },
  },
  plugins: [],
};
export default config;
