import User from '../models/user';
import Role from '../models/role';
import Alumni from '../models/alumni';
import catchAsyncError from '../middlewares/catchAsyncError';
import absoluteUrl from 'next-absolute-url';
import ErrorHandler from '../utils/errorHandler';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { name_to_role_id_mapping, roleOf } from '../constants/role';

const registerUser = catchAsyncError(async (req, res) => {
  const {
    email,
    username,
    password,
    fullname,
    date_of_birth,
    phone,
    address,
    gender,
    career,
    school_year,
    classes,
  } = req.body;

  await User.create({
    email,
    username,
    password,
    fullname,
    date_of_birth,
    phone,
    address,
    gender,
    career,
    role_id: mongoose.mongo.ObjectId(name_to_role_id_mapping[roleOf.ALUMNI]),
    school_year,
    classes,
  });
  res.status(200).json({
    success: true,
    message: 'Đăng kí tài khoản thành công!',
  });
});

const forgotPassword = catchAsyncError(async (req, res, next) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }

  // Get token reset
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validationBeforeSave: false });

  // Get origin
  const { origin } = absoluteUrl(req);

  // Create reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n 
    If you have not requested this email, then ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: 'Easy10 Password Recovery',
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

const resetPassword = catchAsyncError(async (req, res, next) => {
  // Hash url token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.query.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Password reset token is invalid or has been expired',
        400
      )
    );
  }
  if (req.body.password !== req.body.passwordConfirmation) {
    return next(new ErrorHandler('Password does not match', 400));
  }
  // new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});

// Current user profile => /api/me
const currentUserProfile = catchAsyncError(async (req, res) => {
  let user = await User.findById(req.user._id).populate({
    path: 'role_id',
    select: 'name',
    Role,
  });

  if (user && user.role_id?.name !== roleOf.TEACHER) {
    if (!user.major) {
      await Alumni.findOneAndUpdate(
        { user_id: req.user._id },
        {
          user_id: req.user._id,
        },
        { upsert: true, new: true }, // options
        function (err, doc) {
          // callback
          if (err) {
            // handle error
          } else {
            user = {
              ...user,
              major: {
                major: doc.major ? doc.major : '',
                user_id: doc.user_id,
              },
              //TODO: replace with real data
              // ...schoolYearVsClasses,
            };
          }
        }
      ).clone();
    }
  }
  res.status(200).json({
    success: true,
    user: {
      ...user._doc,
      // ...schoolYearVsClasses,
    },
  });
});

const updateUserProfile = catchAsyncError(async (req, res) => {
  const {
    fullname,
    date_of_birth,
    phone,
    address,
    gender,
    career,
    marriage,
    facebook_url
  } = req.body;

  let user = await User.findById(req.user._id).populate({
    path: 'role_id',
    select: 'name',
    Role,
  });

  if (user) {
    user.fullname = fullname;
    user.date_of_birth = date_of_birth;
    user.phone = phone;
    user.address = address;
    user.gender = gender;
    user.career = career;
    user.marriage = marriage;
    user.facebook = { url: facebook_url };
    await user.save();
    res.status(200).json({
      status: true,
      message: 'Update succuess',
      user: user,
    })
  } else {
    res.status(400).json({
      status: false,
      message: 'Cannot find user',
    })
  }
});

export { registerUser, forgotPassword, resetPassword, currentUserProfile, updateUserProfile };
