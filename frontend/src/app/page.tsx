/** Landing page — replace the hero text and features to match your app. */

import { Button } from "@/components/ui/Button";
import Link from "next/link";

const features = [
  {
    title: "Full-Stack TypeScript",
    description:
      "Next.js 16 frontend and Express.js 5 backend, both fully typed with TypeScript for end-to-end type safety.",
  },
  {
    title: "PostgreSQL with Prisma",
    description:
      "Production-ready database access using Prisma ORM with migrations and type-safe queries.",
  },
  {
    title: "Themeable UI",
    description:
      "Tailwind CSS v4 theme system lets you change the entire look by editing a single CSS file.",
  },
  {
    title: "Reusable Components",
    description:
      "Pre-built Button, Card, Table, Modal, Input, and more — ready to compose into any application.",
  },
  {
    title: "Watch Mode",
    description:
      "Both frontend and backend run in watch mode. Every code change reflects instantly in your browser.",
  },
  {
    title: "LLM-Ready",
    description:
      "Thoroughly documented codebase designed to be understood and modified by AI assistants.",
  },
];

const logos = [
  "Next.js",
  "Express",
  "Prisma",
  "Tailwind",
  "TypeScript",
  "PostgreSQL",
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient dark:dot-pattern">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 sm:pt-32 sm:pb-40 lg:px-8 lg:pt-40 lg:pb-52">
          <h1 className="text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-6xl lg:text-8xl leading-[0.95]">
            Build anything.
            <br />
            Ship fast.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-neutral-800/80 dark:text-neutral-400">
            A production-ready scaffold for CRM apps, enterprise dashboards, blogs,
            and personal sites. Powered by Next.js, Express, and PostgreSQL.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="https://github.com/silktide/silktide-scaffold" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech logos bar */}
      <section className="border-t border-neutral-200/60 dark:border-white/5 bg-white dark:bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((name) => (
              <span
                key={name}
                className="text-sm font-bold tracking-wide text-neutral-400 dark:text-neutral-500 uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-surface-0">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              A complete full-stack foundation so you can focus on what makes your app unique.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-neutral-200/60 dark:border-white/5 bg-neutral-50 dark:bg-surface-2 p-8 transition-colors hover:bg-neutral-100/70 dark:hover:bg-surface-3"
              >
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-200/60 dark:border-white/5 bg-neutral-50 dark:bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            Clone the repo, run one command, and start building your next great application in minutes.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-neutral-300 dark:border-white/10 bg-white dark:bg-surface-2 px-5 py-3 font-mono text-sm text-neutral-600 dark:text-neutral-300 shadow-sm">
            <span className="text-neutral-400 dark:text-primary-400">$</span>
            npm run dev
          </div>
        </div>
      </section>
    </div>
  );
}
