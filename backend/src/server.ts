/** Entry point — starts the Express HTTP listener. */

import { config } from "./config/index.js";
import app from "./app.js";

app.listen(config.BACKEND_PORT, () => {
  console.log(`Backend running at http://localhost:${config.BACKEND_PORT} [${config.NODE_ENV}]`);
});
