const mongoose = require('mongoose');

/**
 * Middleware to track MongoDB operation durations
 */
const mongoDbMetrics = () => {
  return (req, res, next) => {
    const start = Date.now();
    
    // Add listener for current request
    const collection = mongoose.connection.db?.collection('system.profile');
    if (collection) {
      collection.find({
        ts: { $gte: new Date(start) },
        op: { $in: ['query', 'insert', 'update', 'remove'] }
      }).toArray()
      .then(operations => {
        req.mongoMetrics = {
          operationCount: operations.length,
          duration: Date.now() - start,
          operations: operations.map(op => ({
            operation: op.op,
            namespace: op.ns,
            duration: op.millis
          }))
        };
      })
      .catch(() => {
        req.mongoMetrics = {
          duration: Date.now() - start
        };
      });
    }

    next();
  };
};

module.exports = mongoDbMetrics;
