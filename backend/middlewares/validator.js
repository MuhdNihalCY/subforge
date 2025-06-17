const { body, param, query } = require('express-validator');
const { errorResponse } = require('../utils/responseHandler');

/**
 * Validate request middleware
 * @param {Array} validations - Array of validation rules
 * @returns {Function} Express middleware
 */
exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationChain.validationErrors();
    if (errors.length > 0) {
      const formattedErrors = errors.reduce((acc, err) => {
        acc[err.path] = err.msg;
        return acc;
      }, {});
      
      return errorResponse(res, 400, 'Validation Error', formattedErrors);
    }

    next();
  };
};

/**
 * User validation rules
 */
exports.userValidation = {
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail()
  ],

  update: [
    param('id')
      .isMongoId().withMessage('Invalid user ID'),
    
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    
    body('email')
      .optional()
      .trim()
      .isEmail().withMessage('Invalid email address')
      .normalizeEmail()
  ],

  getById: [
    param('id')
      .isMongoId().withMessage('Invalid user ID')
  ],

  list: [
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    
    query('sort')
      .optional()
      .isString()
      .matches(/^[a-zA-Z]+$/).withMessage('Sort field must contain only letters')
  ]
};
