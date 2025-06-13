/**
 * Response utility functions
 */

/**
 * Send success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object} data - Response data
 */
exports.successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  const response = {
    success: true,
    message,
    ...(data && { data })
  };
  return res.status(statusCode).json(response);
};

/**
 * Send error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {object} errors - Error details
 */
exports.errorResponse = (res, statusCode = 500, message = 'Error', errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };
  return res.status(statusCode).json(response);
};

/**
 * Standard response handler
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {object} data - Response data
 */
exports.responseHandler = (res, statusCode = 200, message = '', data = null) => {
  return statusCode >= 400
    ? exports.errorResponse(res, statusCode, message, data)
    : exports.successResponse(res, statusCode, message, data);
};

/**
 * MongoDB specific response handlers
 */

/**
 * Send MongoDB connection status
 * @param {object} res - Express response object
 * @param {object} status - MongoDB connection status
 */
exports.mongoDbStatusResponse = (res, status) => {
  const statusCode = status.isConnected ? 200 : 503;
  const message = status.isConnected 
    ? 'MongoDB connection is healthy'
    : 'MongoDB connection is not available';
    
  return exports.responseHandler(res, statusCode, message, status);
};

/**
 * Send MongoDB metrics response
 * @param {object} res - Express response object
 * @param {object} metrics - MongoDB metrics
 */
exports.mongoDbMetricsResponse = (res, metrics) => {
  return exports.responseHandler(res, 200, 'MongoDB metrics retrieved successfully', metrics);
};

/**
 * Catch async errors in route handlers
 * @param {Function} fn - Async route handler
 */
exports.catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
