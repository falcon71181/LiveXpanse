/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background_dark: "#162536",
        background_card: "#151E27",
        saffron: "#fa4103",
        grny: "#8cff00",
      },
      screens: {
        tablet: "640px",
        navHide: "800px",
        laptop: "1024px",
      },
    },
    fontFamily: {
      heading: ["Monaco", "Bitstream Vera Sans Mono", "Lucida Console"],
    },
    animation: {
      "text-gradient": "text-gradient 1.5s linear infinite",
    },
    keyframes: {
      "text-gradient": {
        to: {
          backgroundPosition: "200% center",
        },
      },
    },
  },
  plugins: [],
};
