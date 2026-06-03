import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary = the red-orange from Kyle's logo (#ef4e22 anchor).
        // Used sparingly: CTAs, link hover, key accents only.
        primary: {
          50: '#fff5f0',
          100: '#ffe6d9',
          200: '#ffc4a8',
          300: '#ffa07a',
          400: '#ff7547',
          500: '#ef4e22',
          600: '#d63912',
          700: '#b32a0a',
          800: '#8c2008',
          900: '#6b1a07',
          950: '#3d0e03',
        },
        // Accent: amber kept for stat values / small warmth highlights.
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Surface layering — anchored on pure black to match the logo bg.
        surface: {
          DEFAULT: '#000000',
          canvas: '#000000',
          card: '#0d0d0d',
          elevated: '#161616',
          border: '#262626',
          light: '#161616',
          lighter: '#262626',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
