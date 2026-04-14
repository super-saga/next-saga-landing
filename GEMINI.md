# Project: Sahabat Warga by Saga (Next.js Landing Page)

## Project Overview
This project is a high-performance, SEO-optimized landing page for **Sahabat Warga by Saga**, a digital platform designed to simplify community management (iuran, data warga, surat pengantar, and communication) in Indonesia.

The application is built using **Next.js 16 (App Router)** and is designed to be deployed on **Cloudflare Workers/Pages** using **OpenNext**. It features a modern, responsive UI with deep integration for lead capture, scheduling, and content management.

### Key Technologies
- **Framework**: Next.js 16 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0 alpha, Radix UI (Shadcn components), Framer Motion
- **CMS**: Ghost Content API (for blog and career posts)
- **Database/Auth**: Supabase (Backend service role for data management)
- **Analytics**: PostHog (Client-side tracking)
- **Integrations**: 
    - **Cal.com**: For scheduling demo bookings.
    - **Nodemailer**: For email notifications.
    - **Google APIs**: Likely for calendar or sheets integration.

## Building and Running

### Development
```bash
# Install dependencies (Bun or NPM)
bun install # or npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Standard Next.js build
npm run build

# Cloudflare Pages build (Next-on-Pages)
npm run pages:build

# Cloudflare Worker build (OpenNext)
npm run worker:build
```

### Deployment
```bash
# Deploy to Cloudflare Pages
npm run deploy

# Deploy to Cloudflare Workers (OpenNext)
npm run worker:deploy
```

## Development Conventions

### Architecture
- `src/app/`: Contains the App Router pages and API routes.
- `src/components/`: Modular UI components. Landing page sections are prefixed with `landing-`.
- `src/components/ui/`: Reusable primitive components (Radix UI based).
- `src/lib/`: Core service integrations (Ghost, Supabase, PostHog, Email, Calendar).
- `src/constants/`: Shared constants and event definitions.

### Coding Style
- **Functional Components**: Use modern React 19 patterns and hooks.
- **Strict Typing**: Ensure all props and API responses are correctly typed.
- **Tailwind CSS 4.0**: Use the new Tailwind CSS 4.0 features via `@tailwindcss/postcss`.
- **Performance**: Heavy use of `content-visibility: auto` and static optimization (`export const dynamic = "force-static"`).

### Environment Variables
Ensure the following variables are configured in `.env` (refer to `.env.example` for details):
- **Analytics**: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_GA_ID`
- **Cal.com**: `CALCOM_API_KEY`, `CALCOM_USERNAME`, `CALCOM_EVENT_TYPE_ID`, etc.
- **Supabase**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Ghost CMS**: `GHOST_API_URL`, `GHOST_CONTENT_API_KEY`
- **SMTP**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- **General**: `NEXT_PUBLIC_SITE_URL` (Defaults to `https://saga.co.id`)

## Key Features
- **Lead Capture**: Integrated demo request form via `src/app/api/demo/route.ts`.
- **Blog & Career**: Dynamically fetched from Ghost CMS via `src/lib/ghost.ts`.
- **Scheduling**: Real-time booking via Cal.com API.
- **Mobile First**: Fully responsive design with specific mobile-app preview sections.
