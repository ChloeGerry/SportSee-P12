import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "light-black": "#020203",
        "dark-grey": "#282D30",
        grey: "#74798C",
        red: "#E60000",
        "light-grey": "#FBFBFB",
        "red-icon": "#FF0000",
        "blue-icon": "#4AB8FF",
        "yellow-icon": "#F9CE23",
        "pink-icon": "#FD5181",
      },
      spacing: {
        "60": "60px",
      },
      borderRadius: {
        small: "5px",
      },
      boxShadow: {
        "extra-small": "0 4px 4px 0px #00000040",
      },
    },
  },
  plugins: [],
};

export default config;
