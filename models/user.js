const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumni',
  },
  username: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [50, 'Your name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false,
  },
  avatar: {
    url: {
      type: String,
      default: 'https://graph.facebook.com/674527979558467/picture?type=large',
    },
  },
  facebook: {
    url: {
      type: String,
      default: 'https://graph.facebook.com/674527979558467/picture?type=large',
    },
  },
  status: {
    type: Boolean,
    default: true,
  },
  fullname: {
    type: String,
    required: [true, 'Please enter your full name'],
    maxLength: [50, 'Your full name cannot exceed 50 characters'],
  },
  date_of_birth: {
    type: String,
  },
  work_experience: {
    type: Array,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  phone: {
    type: String,
    minLength: [10, 'Your phone must be longer than 9 numbers'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  marriage: {
    type: Boolean,
    default: false,
  },
  career: {
    type: String,
  },
  school_year: {
    type: Object,
  },
  classes: {
    type: Object,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = async function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
