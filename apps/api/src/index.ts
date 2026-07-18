import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`CodePulse AI API listening on port ${env.PORT}`);
  });
}

void bootstrap().catch((error) => {
  console.error('Failed to start the API', error);
  process.exit(1);
});
