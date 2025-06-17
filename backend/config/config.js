/**
 * Application configuration
 */
require('dotenv').config();

/**
 * Validate environment variables
 */
const validateEnvVariables = () => {
  const required = ['NODE_ENV', 'MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  // Validate MongoDB URI format
  const mongoUriPattern = /^mongodb\+srv:\/\/[^:]+:[^@]+@[^/]+\/?\??(?:[^&]+&?)*$/;
  if (!mongoUriPattern.test(process.env.MONGO_URI)) {
    throw new Error('Invalid MongoDB Atlas URI format');
  }
};

// Validate environment variables before creating config
validateEnvVariables();

const config = {
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  db: {
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '10', 10),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '50', 10),
    connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || '30000', 10),
    socketTimeoutMS: parseInt(process.env.DB_SOCKET_TIMEOUT_MS || '45000', 10)
  }
};

module.exports = config;

// password: process.env.DB_PASSWORD || '2Yd3iYkoJGQprsV8',
// dbName: process.env.DB_NAME || 'mnihalcy',

// mongodb+srv://mnihalcy:<db_password>@cluster0.ri0o8a7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0