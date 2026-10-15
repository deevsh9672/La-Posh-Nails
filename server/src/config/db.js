import mongoose from 'mongoose';

let mongoMemoryServerInstance = null;

export const connectDB = async (customUri) => {
  const uri = customUri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/laposh_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to primary URI (${uri}): ${error.message}`);

    // If in production, fail hard
    if (process.env.NODE_ENV === 'production') {
      console.error('[Database Error] Primary connection failed in production. Exiting.');
      process.exit(1);
    }

    // In local / development mode, launch embedded MongoDB automatically
    console.log('[Database] Initializing embedded MongoDB server for instant live execution...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServerInstance = await MongoMemoryServer.create();
      const memUri = mongoMemoryServerInstance.getUri();

      const conn = await mongoose.connect(memUri);
      console.log(`[Database] Embedded MongoDB server running at: ${memUri}`);

      // Auto-seed initial data into the embedded database
      const { seedDatabase } = await import('../seed.js');
      await seedDatabase({ skipConnect: true });

      return conn;
    } catch (memError) {
      console.error(`[Database Error] Failed to start embedded MongoDB: ${memError.message}`);
      process.exit(1);
    }
  }
};
