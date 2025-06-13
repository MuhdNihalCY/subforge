const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const { responseHandler } = require('../utils/responseHandler');

/**
 * Get MongoDB connection status and metrics
 */
exports.getMongoStatus = catchAsync(async (req, res) => {
  const {
    connection: {
      host,
      port,
      name,
      readyState,
      modelNames,
      collections,
      _hasOpened
    }
  } = mongoose;

  const stats = await mongoose.connection.db?.stats();
  const poolStats = mongoose.connection.db?.serverConfig?.s?.pool || {};
  
  const status = {
    isConnected: readyState === 1,
    host,
    port,
    database: name,
    readyState: ['disconnected', 'connected', 'connecting', 'disconnecting'][readyState] || 'unknown',
    hasOpened: _hasOpened,
    models: modelNames(),
    collections: collections ? Object.keys(collections) : [],
    poolInfo: {
      totalConnectionCount: poolStats.totalConnectionCount || 0,
      availableConnectionCount: poolStats.availableConnectionCount || 0,
      waitingRequestCount: poolStats.waitingRequestCount || 0,
      maxPoolSize: poolStats.options?.maxPoolSize || 'unknown',
      minPoolSize: poolStats.options?.minPoolSize || 'unknown'
    },
    dbStats: stats ? {
      collections: stats.collections,
      views: stats.views,
      objects: stats.objects,
      avgObjSize: stats.avgObjSize,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      indexSize: stats.indexSize
    } : null
  };

  return responseHandler(res, 200, 'MongoDB status retrieved successfully', status);
});

/**
 * Get detailed system metrics
 */
exports.getMetrics = catchAsync(async (req, res) => {
  // Get Node.js process metrics
  const processMetrics = {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    uptime: process.uptime(),
    pid: process.pid,
    versions: process.versions
  };

  // Get MongoDB metrics
  const mongoMetrics = {
    readyState: mongoose.connection.readyState,
    collections: mongoose.connection.collections ? Object.keys(mongoose.connection.collections).length : 0
  };

  // Get connection pool metrics
  const poolMetrics = mongoose.connection.db?.serverConfig?.s?.pool || {};
  
  const metrics = {
    process: processMetrics,
    mongoConnection: mongoMetrics,
    connectionPool: {
      total: poolMetrics.totalConnectionCount || 0,
      available: poolMetrics.availableConnectionCount || 0,
      waiting: poolMetrics.waitingRequestCount || 0,
      maxSize: poolMetrics.options?.maxPoolSize || 'unknown'
    },
    timestamp: new Date().toISOString()
  };

  return responseHandler(res, 200, 'System metrics retrieved successfully', metrics);
});

/**
 * Perform MongoDB health check
 */
exports.healthCheck = catchAsync(async (req, res) => {
  const startTime = Date.now();
  
  try {
    // Test basic connectivity
    await mongoose.connection.db.admin().ping();
    
    // Get server status
    const serverStatus = await mongoose.connection.db.admin().serverStatus();
    
    // Calculate response time
    const responseTime = Date.now() - startTime;

    const healthStatus = {
      status: 'healthy',
      responseTime: `${responseTime}ms`,
      version: serverStatus.version,
      uptime: serverStatus.uptime,
      connections: serverStatus.connections,
      operations: serverStatus.opcounters,
      timestamp: new Date().toISOString()
    };

    return responseHandler(res, 200, 'Health check successful', healthStatus);
  } catch (error) {
    return responseHandler(res, 503, 'Health check failed', {
      status: 'unhealthy',
      error: error.message,
      responseTime: `${Date.now() - startTime}ms`,
      timestamp: new Date().toISOString()
    });
  }
});
