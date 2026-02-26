# Silktide Scaffold

A production-ready full-stack scaffold for building web applications with **Next.js 16**, **Express.js 5**, **optional PostgreSQL** (via Prisma ORM 7), **Tailwind CSS v4**, and **TypeScript**. Supports light and dark mode out of the box.

> **For humans and LLMs** — every section explains _what_ each part does and _how_ to modify it.

---

## Quick Start

### Prerequisites

- **Node.js 22+** (24 LTS recommended)
- **npm** (ships with Node.js)
- **PostgreSQL** — only if you want database features (optional)

### Without a database

```bash
git clone https://github.com/silktide/silktide-scaffold.git && cd silktide-scaffold
npm install
npm run db:generate -w backend
npm run dev
```

### With a database

```bash
git clone https://github.com/silktide/silktide-scaffold.git && cd silktide-scaffold
npm install
cp .env.example .env          # then fill in DATABASE_URL
npm run db:generate -w backend
npm run db:migrate
npm run dev
```

Frontend: **http://localhost:3000** | Backend: **http://localhost:4000**

---

## Architecture

```
Browser (localhost:3000)
  │
  │  /api/* proxied by Next.js rewrites
  ▼
Frontend (Next.js 16, Tailwind v4, next-themes)
  │
  │  REST JSON
  ▼
Backend (Express.js 5, Zod validation)
  │
  │  Prisma Client (optional)
  ▼
PostgreSQL (optional — omit DATABASE_URL to run without)
```

**Request flow:** Browser → Next.js rewrite → Express route → controller → Zod validation → service → Prisma → PostgreSQL → JSON response.

---

## Project Structure

```
silktide-scaffold/
├── .env.example                  # Template for environment variables
├── package.json                  # Root workspace (dev, build, db:*)
│
├── frontend/
│   ├── next.config.ts            # API proxy rewrites
│   ├── postcss.config.mjs        # Tailwind v4 PostCSS plugin
│   └── src/
│       ├── app/
│       │   ├── globals.css       # Theme: colors, fonts, radii, dark mode
│       │   ├── layout.tsx        # Root layout with ThemeProvider
│       │   ├── page.tsx          # Landing page
│       │   └── dashboard/
│       │       └── page.tsx      # Example dashboard
│       ├── components/
│       │   ├── ThemeProvider.tsx  # next-themes wrapper (light/dark)
│       │   ├── ThemeToggle.tsx   # Sun/moon toggle button
│       │   ├── layout/
│       │   │   ├── Header.tsx    # Nav bar with theme toggle
│       │   │   └── Footer.tsx    # Copyright and links
│       │   ├── shared/
│       │   │   ├── PageHeader.tsx
│       │   │   ├── EmptyState.tsx
│       │   │   └── LoadingSpinner.tsx
│       │   └── ui/
│       │       ├── Button.tsx    # primary | secondary | outline | ghost | danger
│       │       ├── Card.tsx      # Card.Header, Card.Body, Card.Footer
│       │       ├── Input.tsx
│       │       ├── Textarea.tsx
│       │       ├── Select.tsx
│       │       ├── Badge.tsx     # default | success | warning | danger | outline
│       │       ├── Modal.tsx
│       │       └── Table.tsx     # Table.Head, Table.Body, Table.Row, etc.
│       ├── hooks/
│       │   └── useApi.ts         # Generic data-fetching hook
│       ├── lib/
│       │   └── utils.ts          # cn() class merger, formatDate()
│       ├── types/
│       │   └── index.ts          # User, Post, Category, PaginatedResponse
│       └── config/
│           └── site.ts           # App name, nav items, footer links
│
├── backend/
│   ├── prisma.config.ts          # Prisma 7 config (DB URL, migrations)
│   ├── prisma/
│   │   └── schema.prisma         # User, Post, Category models
│   └── src/
│       ├── server.ts             # HTTP listener entry point
│       ├── app.ts                # Express middleware + routes
│       ├── config/index.ts       # Env validation (Zod)
│       ├── lib/prisma.ts         # Prisma singleton (null when no DB)
│       ├── middleware/
│       │   ├── errorHandler.ts   # 400 / 503 / 500 error responses
│       │   ├── requestLogger.ts  # Method, URL, status, duration
│       │   └── cors.ts           # CORS for FRONTEND_URL
│       ├── routes/               # user.routes.ts, post.routes.ts
│       ├── controllers/          # user.controller.ts, post.controller.ts
│       ├── services/             # user.service.ts, post.service.ts
│       ├── schemas/              # Zod validation schemas
│       └── types/index.ts        # PaginatedResponse
```

---

## Important: Use the Built-in UI Components

**Never create custom UI primitives.** The scaffold ships with a complete set of reusable components in `frontend/src/components/ui/`. All pages and features **must** use these instead of creating their own.

| Need a... | Use this |
|-----------|----------|
| Button | `import { Button } from "@/components/ui/Button"` |
| Card / panel | `import { Card } from "@/components/ui/Card"` |
| Text input | `import { Input } from "@/components/ui/Input"` |
| Textarea | `import { Textarea } from "@/components/ui/Textarea"` |
| Dropdown | `import { Select } from "@/components/ui/Select"` |
| Status label | `import { Badge } from "@/components/ui/Badge"` |
| Dialog | `import { Modal } from "@/components/ui/Modal"` |
| Data table | `import { Table } from "@/components/ui/Table"` |
| Page title | `import { PageHeader } from "@/components/shared/PageHeader"` |
| Empty list | `import { EmptyState } from "@/components/shared/EmptyState"` |
| Spinner | `import { LoadingSpinner } from "@/components/shared/LoadingSpinner"` |

This ensures visual consistency, automatic dark/light mode support, and a single place to update styling across the entire application.

---

## Customization Guide

### Change the Theme

Edit `frontend/src/app/globals.css`. The `@theme` block defines all design tokens:

```css
@theme {
  --color-primary-500: #8b5cf6;   /* Brand accent */
  --color-surface-0: #0c0a1d;     /* Dark mode background */
  --color-surface-2: #1a1535;     /* Dark mode cards */
  --font-sans: "Inter", system-ui; /* Font family */
}
```

Every component uses `dark:` variants, so both light and dark mode update automatically.

### Toggle Dark/Light Mode

The app uses [next-themes](https://github.com/pacocoursey/next-themes) with a `class` strategy. The `ThemeToggle` component in the header lets users switch. Default is dark mode.

To change the default, edit `frontend/src/components/ThemeProvider.tsx`:

```tsx
<NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
```

### Change the Branding

Edit `frontend/src/config/site.ts`:

```typescript
export const siteConfig = {
  name: "My App",
  description: "My app description",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Customers", href: "/customers" },
  ],
  footer: { ... },
};
```

### Add a New Page

Create `frontend/src/app/customers/page.tsx`, export a default component, add to `siteConfig.navigation`.

### Add a New API Endpoint

Follow: **schema** → **service** → **controller** → **routes** → **register in routes/index.ts**.

### Modify the Database

1. Edit `backend/prisma/schema.prisma`
2. `npm run db:generate -w backend`
3. `npm run db:migrate`
4. Add matching service, controller, routes, and frontend types

---

## Components

| Component | Props / Variants |
|-----------|-----------------|
| `Button` | `variant`: primary, secondary, outline, ghost, danger / `size`: sm, md, lg |
| `Card` | Sub-components: `Card.Header`, `Card.Body`, `Card.Footer` |
| `Input` | `label`, `error`, all `<input>` attributes |
| `Textarea` | `label`, `error`, all `<textarea>` attributes |
| `Select` | `label`, `error`, `options: {value, label}[]`, `placeholder` |
| `Badge` | `variant`: default, success, warning, danger, outline |
| `Modal` | `open`, `onClose`, `title`, `children` |
| `Table` | `Table.Head`, `Table.Body`, `Table.Row`, `Table.Header`, `Table.Cell` |
| `PageHeader` | `title`, `description`, `action` (ReactNode) |
| `EmptyState` | `title`, `message`, `action` (ReactNode) |
| `LoadingSpinner` | `size`: sm, md, lg |
| `ThemeToggle` | Sun/moon icon button |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend in watch mode |
| `npm run build` | Production build (frontend + backend) |
| `npm run db:migrate` | Create and apply Prisma migrations |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |
| `npm run db:generate -w backend` | Regenerate Prisma client |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | No | — | PostgreSQL connection string |
| `BACKEND_PORT` | No | `4000` | Express server port |
| `FRONTEND_URL` | No | `http://localhost:3000` | CORS origin |
| `NODE_ENV` | No | `development` | `development` or `production` |

---

## License

MIT
