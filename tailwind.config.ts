import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      colors: {
        // Core backgrounds
        bg: "#0A0A0A",
        "bg-card": "#141414",
        "bg-card-hover": "#1A1A1A",
        "bg-elevated": "#1E1E1E",
        "bg-subtle": "#111111",

        // Gold
        gold: {
          DEFAULT: "#C8A04A",
          light: "#D4B86A",
          muted: "rgba(200, 160, 74, 0.15)",
          border: "rgba(200, 160, 74, 0.25)",
          glow: "rgba(200, 160, 74, 0.08)",
        },

        // Text
        "text-primary": "#FAFAFA",
        "text-secondary": "#9CA3AF",
        "text-muted": "#6B7280",

        // Status
        emerald: {
          DEFAULT: "#10B981",
          bg: "rgba(16, 185, 129, 0.12)",
        },
        amber: {
          DEFAULT: "#F59E0B",
          bg: "rgba(245, 158, 11, 0.12)",
        },
        red: {
          DEFAULT: "#EF4444",
          bg: "rgba(239, 68, 68, 0.12)",
        },
        blue: {
          DEFAULT: "#3B82F6",
          bg: "rgba(59, 130, 246, 0.12)",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          bg: "rgba(139, 92, 246, 0.12)",
        },

        // Borders
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          light: "rgba(255, 255, 255, 0.10)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
