/**
 * Global error-handling middleware.
 *
 * ZodError       → 400 with field-level details
 * NO_DATABASE    → 503 with setup instructions
 * Everything else → 500 (stack trace only in development)
 */

import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Validation error", details: err.flatten().fieldErrors });
    return;
  }

  if (err instanceof Error && (err as NodeJS.ErrnoException).code === "NO_DATABASE") {
    res.status(503).json({ error: err.message });
    return;
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  const stack = process.env.NODE_ENV === "development" && err instanceof Error ? err.stack : undefined;

  console.error("[ERROR]", message, stack);
  res.status(500).json({ error: message, ...(stack && { stack }) });
}
