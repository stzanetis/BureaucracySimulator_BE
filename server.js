import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import { APP_NAME } from './config/constants.js';

dotenv.config();

/**
 * Start the HTTP server and connect to the database.
 */
const startServer = async () => {
  const port = process.env.PORT || 4000;

  // Try to connect to MongoDB (non-fatal if it fails; mock data is still used)
  await connectDatabase();

  const server = http.createServer(app);

  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`${APP_NAME} listening on port ${port}`);
  });
};

startServer().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal startup error:', err);
  process.exit(1);
});
