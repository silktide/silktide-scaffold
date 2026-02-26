/** Top navigation bar with theme toggle. Reads from config/site.ts. */

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-surface-1/80 backdrop-blur-xl border-b border-neutral-200/60 dark:border-white/5">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://github.com/silktide/silktide-scaffold"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
