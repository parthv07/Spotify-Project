// import scrollbar from "tailwind-scrollbar";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure paths are correct
//   theme: {
//     extend: {},
//   },
//   plugins: [scrollbar], // Use imported plugin
// };

import scrollbar from "./node_modules/tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure paths are correct
  theme: {
    extend: {},
  },
  plugins: [scrollbar],
  variants: {
    scrollbar: ["rounded", "dark"], // Force-enable scrollbar styles
  },
};
