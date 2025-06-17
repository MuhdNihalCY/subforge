const { errorResponse } = require('../utils/responseHandler');

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Next middleware function
 */
module.exports = (err, req, res, next) => {
  // Log error for debugging
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
    return errorResponse(res, 400, 'Validation Error', errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return errorResponse(
      res, 
      409, 
      'Duplicate Error', 
      { [field]: `${field} already exists` }
    );
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return errorResponse(
      res,
      400,
      'Invalid ID',
      { [err.path]: `Invalid ${err.path}` }
    );
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal Server Error';
  
  return errorResponse(
    res,
    statusCode,
    message,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
};
