const mongoose = require('mongoose');
const config = require('./config');

// Connection state tracking
let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 5;

// Pool monitoring intervals
let metricsInterval;

/**
 * Log database connection metrics
 */
const logConnectionMetrics = () => {
  const { 
    connectionPoolStats, 
    active, 
    available 
  } = mongoose.connection;

  console.log('\nMongoDB Connection Metrics:');
  console.log(`Active connections: ${active}`);
  console.log(`Available connections: ${available}`);
  console.log(`Total connections: ${connectionPoolStats?.totalConnectionCount || 0}`);
  console.log(`Connection pool size: ${config.db.minPoolSize}-${config.db.maxPoolSize}`);
};

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = async () => {
  try {
    if (metricsInterval) {
      clearInterval(metricsInterval);
    }

    if (mongoose.connection.readyState === 1) {
      console.log('Initiating graceful shutdown of MongoDB connection...');
      await mongoose.connection.close();
      console.log('MongoDB connection closed successfully');
    }
  } catch (error) {
    console.error('Error during MongoDB graceful shutdown:', error);
    process.exit(1);
  }
  process.exit(0);
};

/**
 * Connect to MongoDB database with enhanced monitoring and error handling
 */
const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  const options = {
    autoIndex: config.env === 'development',
    serverSelectionTimeoutMS: config.db.connectTimeoutMS || 30000,
    socketTimeoutMS: config.db.socketTimeoutMS || 45000,
    maxPoolSize: config.db.maxPoolSize || 50,
    minPoolSize: config.db.minPoolSize || 10,
    compressors: ['zlib'],
    retryWrites: true,
    w: 'majority'
  };

  try {
    const conn = await mongoose.connect(config.mongoUri, options);
    isConnected = true;
    connectionAttempts = 0;
    console.log(`MongoDB Atlas Connected: ${conn.connection.host} (${config.env})`);

    // Start monitoring connection pool metrics
    metricsInterval = setInterval(logConnectionMetrics, 300000); // Log every 5 minutes

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
      isConnected = false;
      
      if (connectionAttempts < MAX_RETRIES) {
        connectionAttempts++;
        console.log(`Attempting to reconnect (${connectionAttempts}/${MAX_RETRIES})...`);
        setTimeout(connectDB, Math.min(1000 * Math.pow(2, connectionAttempts), 30000));
      }
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
      isConnected = false;
      if (connectionAttempts < MAX_RETRIES) {
        connectionAttempts++;
        console.log(`Attempting to reconnect (${connectionAttempts}/${MAX_RETRIES})...`);
        setTimeout(connectDB, Math.min(1000 * Math.pow(2, connectionAttempts), 30000));
      }
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established');
      isConnected = true;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB connection reestablished');
      isConnected = true;
      connectionAttempts = 0;
    });

  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    isConnected = false;
    
    if (connectionAttempts < MAX_RETRIES) {
      connectionAttempts++;
      console.log(`Attempting to reconnect (${connectionAttempts}/${MAX_RETRIES})...`);
      setTimeout(connectDB, Math.min(1000 * Math.pow(2, connectionAttempts), 30000));
    } else {
      console.error('Max reconnection attempts reached. Exiting...');
      process.exit(1);
    }
  }
};

// Register graceful shutdown handlers
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // For nodemon restarts

module.exports = connectDB;
