/**
 * Validated application configuration from environment variables.
 *
 * DATABASE_URL is optional — the app starts without a database.
 * Routes that require the database return 503 until it is configured.
 */

import dotenv from "dotenv";
import path from "node:path";
import { z } from "zod";

dotenv.config({ path: path.resolve(import.meta.dirname, "..", "..", "..", ".env") });

const envSchema = z.object({
  DATABASE_URL: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().min(1).optional()
  ),
  BACKEND_PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "production", "test", "staging"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:\n", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
export const isDatabaseConfigured = Boolean(config.DATABASE_URL);
