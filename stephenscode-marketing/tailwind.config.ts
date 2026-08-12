import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

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
        // Surface layering -- anchored on pure black to match the logo bg.
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
      // Three-font system: Public Sans (body), Archivo (display, variable wdth
      // axis for font-stretch), JetBrains Mono (eyebrows, badges, numeric chrome).
      // CSS variables are set by next/font in app/layout.tsx.
      fontFamily: {
        sans: ['var(--font-public-sans)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-archivo)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      // Fluid display type: one smooth clamp() ramp instead of breakpoint jumps.
      // display = 40px floor on small phones up to 72px cap by 1280px.
      // display-sm = 28px to 36px, matching the text-3xl/sm:text-4xl h2 range.
      fontSize: {
        display: ['clamp(2.5rem, 1.55rem + 3.7vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.75rem, 1.55rem + 0.9vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      // Timing scale convention: 150ms = color/opacity micro (dropdown items,
      // icon tints), 200ms = default (buttons, links, arrow nudges), 250ms =
      // nav underline draw, 300ms = card lift/surfaces. All with ease-brand.
      // Swift-out curve: fast start, long soft settle.
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      // Dark-theme layered shadows: bare shadow-lg/xl is near-invisible on
      // near-black. Hairline top-light rings + ambient black + brand glow.
      boxShadow: {
        // Buttons: inset 1px white top-edge glint reads machined on dark.
        btn: 'inset 0 1px 0 rgb(255 255 255 / 0.12), 0 1px 2px rgb(0 0 0 / 0.4)',
        'btn-hover': 'inset 0 1px 0 rgb(255 255 255 / 0.16), 0 8px 24px -8px rgb(239 78 34 / 0.45)',
        // Cards on near-black: 1px top-light ring does the lifting, ambient black adds depth.
        card: '0 0 0 1px rgb(255 255 255 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.55), 0 8px 24px -8px rgb(0 0 0 / 0.65)',
        'card-hover': '0 12px 32px -16px rgb(0 0 0 / 0.6), 0 4px 24px -12px rgb(239 78 34 / 0.18)',
        // CTA button glow.
        'glow-primary': '0 1px 2px 0 rgb(0 0 0 / 0.4), 0 0 20px -4px rgb(239 78 34 / 0.5)',
        'glow-accent': '0 1px 2px 0 rgb(0 0 0 / 0.4), 0 0 20px -4px rgb(245 158 11 / 0.5)',
        // Inner top highlight for elevated panels.
        'inner-hairline': 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
