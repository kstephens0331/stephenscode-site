# StephensCode Site

## Overview

The primary business platform for StephensCode LLC, built as a Next.js 16 monorepo. This marketing site showcases services, portfolio work, and provides integrated checkout capabilities for clients. The platform serves as the central hub for all StephensCode business operations and client engagement.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Architecture | Monorepo with submodules |
| Deployment | Vercel |

## Features

- **Service Showcase** -- Detailed breakdown of web development, hosting, and consulting services offered
- **Portfolio Display** -- Visual gallery of completed projects with case studies and technology highlights
- **Contact Forms** -- Client inquiry forms with validation and backend processing
- **Checkout Integration** -- Seamless payment flow for service packages and project deposits
- **Responsive Design** -- Fully optimized layout for mobile, tablet, and desktop viewports
- **SEO Optimized** -- Server-side rendering with metadata management for search engine visibility

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository with submodules
git clone --recurse-submodules https://github.com/kstephens0331/stephenscode-site.git
cd stephenscode-site

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with required API keys and configuration

# Start the development server
npm run dev
```

The application runs on `http://localhost:3000` by default.

## Project Structure

```
stephenscode-site/
├── app/                     # Next.js app directory (routes & layouts)
│   ├── (marketing)/         # Marketing pages group
│   ├── api/                 # API route handlers
│   └── layout.tsx           # Root layout
├── components/              # Shared UI components
│   ├── ui/                  # Base UI primitives
│   ├── forms/               # Form components
│   └── sections/            # Page section components
├── lib/                     # Utility functions & configs
├── public/                  # Static assets
├── styles/                  # Global styles & Tailwind config
├── submodules/              # Git submodules
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── README.md
```

## License

All rights reserved. Copyright Kyle Stephens, StephensCode LLC.

---

**Built by StephensCode LLC**
