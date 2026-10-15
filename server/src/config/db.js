import mongoose from 'mongoose';

let mongoMemoryServerInstance = null;

export const connectDB = async (customUri) => {
  // If already connected, reuse existing connection (critical for Serverless / Vercel)
  if (mongoose.connection && mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = customUri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/laposh_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to primary URI (${uri}): ${error.message}`);

    // If on serverless/production or Atlas URI, log error and rethrow so caller handles it
    if (process.env.NODE_ENV === 'production' || uri.includes('mongodb+srv://')) {
      console.error('[Database Error] Atlas/Production connection failed:', error.message);
      throw error;
    }

    // In local development mode without Atlas URI, launch embedded MongoDB automatically
    console.log('[Database] Initializing embedded MongoDB server for local development...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      if (!mongoMemoryServerInstance) {
        mongoMemoryServerInstance = await MongoMemoryServer.create();
      }
      const memUri = mongoMemoryServerInstance.getUri();

      const conn = await mongoose.connect(memUri);
      console.log(`[Database] Embedded MongoDB server running at: ${memUri}`);

      // Auto-seed initial data into the embedded database
      const { seedDatabase } = await import('../seed.js');
      await seedDatabase({ skipConnect: true });

      return conn;
    } catch (memError) {
      console.error(`[Database Error] Failed to start embedded MongoDB: ${memError.message}`);
      throw memError;
    }
  }
};
