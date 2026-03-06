/** Footer with copyright. Reads from config/site.ts. */

import { siteConfig } from "@/config/site";

export function Footer() {
  const { copyright } = siteConfig.footer;

  if (!copyright) return null;

  return (
    <footer className="border-t border-neutral-200/60 dark:border-white/5 bg-neutral-50 dark:bg-surface-1">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-sm text-neutral-500 dark:text-neutral-500">{copyright}</p>
      </div>
    </footer>
  );
}
