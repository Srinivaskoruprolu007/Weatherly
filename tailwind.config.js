/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "text-light": "#f9fafb",
        "text-dark": "#18181b",
        "text-primary": "#ffffff",
        "text-secondary": "#e0e7ef",
        "text-accent": "#1e293b",
        // Nature-inspired palette
        "earth-green": "#4e6e58",
        "earth-brown": "#a47551",
        "sky-blue": "#6ec6f1",
        "sunset-orange": "#ff914d",
        "forest": "#2e4637",
        "soil": "#7c5c38"
      },
      fontFamily: {
        serif: ["'Merriweather'", "serif", "ui-serif", "Georgia", "Times New Roman", "Times"],
        sans: ["'Space Grotesk'", "ui-sans-serif", "system-ui"]
      },
      backgroundImage: {
        "gradient-purple-orange":
          "linear-gradient(135deg, #a4508b 0%, #f7662e 100%)",
        "gradient-blue-teal":
          "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
      },
      transitionProperty: {
        gradient: "background-image",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
