const mongoose = require('mongoose');
const validator = require('validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *           example: 60d725b4e2f7c91234567890
 *         name:
 *           type: string
 *           description: User's full name
 *           minLength: 2
 *           maxLength: 50
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User's email address
 *           format: email
 *           example: john@example.com
 *         isActive:
 *           type: boolean
 *           description: Whether the user account is active
 *           default: true
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: User creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxLength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index on email field
userSchema.index({ email: 1 }, { unique: true });

/**
 * Find user by email
 * @param {string} email - User's email address
 * @returns {Promise<User>}
 */
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

/**
 * Find active users
 * @returns {Promise<User[]>}
 */
userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

/**
 * Pre-save middleware to handle any necessary data transformations
 */
userSchema.pre('save', function(next) {
  // Any pre-save operations can go here
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
