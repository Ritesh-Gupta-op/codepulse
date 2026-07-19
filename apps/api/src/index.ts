import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";

async function bootstrap(): Promise<void> {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Create Express application
    const app = createApp();

    // Mount API routes
    app.use("/api", apiRouter);

    // Start server
    const server = app.listen(env.PORT, () => {
      console.log(
        `CodePulse AI API listening on port ${env.PORT}`
      );
    });

    // Graceful shutdown
    const shutdown = (signal: string) => {
      console.log(`${signal} received. Shutting down server...`);

      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (error) {
    console.error("Failed to start the API:", error);
    process.exit(1);
  }
}

void bootstrap();