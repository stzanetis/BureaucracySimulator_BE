import mongoose from 'mongoose';

/**
 * Connect to MongoDB. The app uses in-memory mock data for gameplay,
 * so a connection failure is logged but does not crash the server.
 *
 * @returns {Promise<void>}
 */
export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    // eslint-disable-next-line no-console
    console.warn(
      'No MONGODB_URI provided. Skipping MongoDB connection (mock data will be used).'
    );
    return;
  }

  try {
    await mongoose.connect(uri, {
      autoIndex: true
    });
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB (continuing with mock data):', error.message);
  }
};
