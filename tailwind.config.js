/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arcade: "'Press Start 2P', 'serif'",
        minecraft: "'MinecraftiaRegular', 'serif'",
        poppins: "'Poppins', 'serif'",
      },
      colors: {
        "primary-color": "var(--primary-color)",
      },
    },
  },
  plugins: [],
}

