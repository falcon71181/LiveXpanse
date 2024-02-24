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
      screens: {
        tablet: "640px",
        navHide: "800px",
        laptop: "1024px",
      },
    },
    fontFamily: {
      heading: ["Monaco", "Bitstream Vera Sans Mono", "Lucida Console"],
    },
  },
  plugins: [],
};
