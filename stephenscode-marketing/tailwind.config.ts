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
        // Brand primary = Tailwind orange family. This is the new "voice" of
        // the site — every CTA, link hover, focus ring, and key accent.
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Accent = amber (warmth highlight for stat values, badges, glow
        // edges). Pairs with primary without competing for the action role.
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
        // Surface layering — four shades of near-black for visual depth.
        // canvas = page bg; card = default tile bg; elevated = modals,
        // dropdowns, popovers; border = subtle dividers.
        surface: {
          DEFAULT: '#0a0a0a',
          canvas: '#0a0a0a',
          card: '#141414',
          elevated: '#1a1a1a',
          border: '#262626',
          // legacy aliases kept so any unmigrated `bg-surface-light` etc.
          // still renders (they were slate-800/-700 before; map to elevated).
          light: '#1a1a1a',
          lighter: '#262626',
        },
      },
      boxShadow: {
        // Signature orange glow on primary CTAs.
        glow: '0 0 30px rgba(249, 115, 22, 0.35)',
        'glow-lg': '0 0 60px rgba(249, 115, 22, 0.45)',
        'glow-amber': '0 0 30px rgba(251, 191, 36, 0.35)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
