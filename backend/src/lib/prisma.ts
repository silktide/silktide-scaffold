/**
 * Prisma client singleton using the Prisma 7 driver-adapter pattern.
 *
 * Returns `null` when DATABASE_URL is not set so the app can start
 * without a database. Use `requirePrisma()` in services to get a
 * non-null client or throw a descriptive 503 error.
 */

import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null };

function createClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log("DATABASE_URL not set — running without database.");
    return null;
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

export const prisma: PrismaClient | null = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** Returns the Prisma client or throws with code `NO_DATABASE`. */
export function requirePrisma(): PrismaClient {
  if (!prisma) {
    const err = new Error("Database not configured. Set DATABASE_URL in .env to enable database features.");
    (err as NodeJS.ErrnoException).code = "NO_DATABASE";
    throw err;
  }
  return prisma;
}
