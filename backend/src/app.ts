/** Express application — middleware pipeline and route mounting. */

import express from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { isDatabaseConfigured } from "./config/index.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: isDatabaseConfigured ? "connected" : "not configured",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", apiRoutes);
app.use(errorHandler);

export default app;
