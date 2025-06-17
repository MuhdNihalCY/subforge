const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const catchAsync = require('../utils/catchAsync');

/**
 * @swagger
 * components:
 *   responses:
 *     Success:
 *       description: Success response with data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *     Error:
 *       description: Error response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *               errors:
 *                 type: object
 */

/**
 * Get all users with pagination
 */
exports.getUsers = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select('-__v').skip(skip).limit(limit),
    User.countDocuments()
  ]);

  const pages = Math.ceil(total / limit);

  return successResponse(res, 200, 'Users retrieved successfully', {
    users,
    pagination: { total, pages, page, limit }
  });
});

/**
 * Get user by ID
 */
exports.getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select('-__v');
  
  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  return successResponse(res, 200, 'User retrieved successfully', { user });
});

/**
 * Create new user
 */
exports.createUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, 409, 'Email already exists');
  }

  const user = await User.create({ name, email });
  return successResponse(res, 201, 'User created successfully', { user });
});

/**
 * Update user
 */
exports.updateUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  // Check if email is being changed and is already taken
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 409, 'Email already exists');
    }
  }

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  return successResponse(res, 200, 'User updated successfully', { user });
});

/**
 * Delete user
 */
exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return errorResponse(res, 404, 'User not found');
  }

  return successResponse(res, 200, 'User deleted successfully');
});
