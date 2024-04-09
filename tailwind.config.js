/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    fontFamily: {
      sans: "Open Sans, sans-serif",
    },
    extend: {
      colors: {
        "dodger-blue": {
          DEFAULT: "#1677FF",
          50: "#CEE2FF",
          100: "#B9D6FF",
          200: "#90BEFF",
          300: "#68A7FF",
          400: "#3F8FFF",
          500: "#1677FF",
          600: "#005CDD",
          700: "#0045A5",
          800: "#002D6D",
          900: "#001635",
          950: "#000A19",
        },
      },
    },
  },
  plugins: [],
};
