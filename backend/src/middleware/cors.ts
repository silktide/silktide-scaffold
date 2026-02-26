/** CORS configuration — allows the frontend origin defined by FRONTEND_URL. */

import cors from "cors";
import { config } from "../config/index.js";

export const corsMiddleware = cors({
  origin: config.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
