import catchAsyncError from '../middlewares/catchAsyncError';
import User from '../models/user';
import Role from '../models/role';
import Alumni from '../models/alumni';
import APIFeatures from '../utils/apiFeatures';
import ErrorHandler from '../utils/errorHandler';
import { roleOf } from '../constants/role';
import mongoose from 'mongoose';

let schoolYearVsClasses = {
  school_year: {
    id: 0,
    name: '',
    class_id: 0,
    school_id: 0,
  },
  classes: {
    id: 0,
    name: '',
    alumni_id: 0,
    alumni_head: 0,
    teacher_id: 0,
  },
};

const allUser = catchAsyncError(async (req, res) => {
  const resPerPage = 10;
  const usersCount = await User.countDocuments();
  const apiFeatures = new APIFeatures(User.find(), req.query).search().filter();

  let users = await apiFeatures.query.populate({
    path: 'role_id',
    select: 'name',
    Role,
  });
  let filteredUsersCount = users.length;

  apiFeatures.pagination(resPerPage);
  users = await apiFeatures.query;

  res.status(200).json({
    success: true,
    usersCount,
    resPerPage,
    filteredUsersCount,
    users,
  });
});

const userProfileById = catchAsyncError(async (req, res, next) => {
  let userId = req.query.id;

  if (userId) {
    let user = await User.findById(userId).populate({
      path: 'role_id',
      select: 'name',
      Role,
    });

    if (user && user.role_id.name !== roleOf.TEACHER) {
      if (!user.major) {
        await Alumni.findOneAndUpdate(
          { user_id: userId },
          {
            user_id: userId,
          },
          { upsert: true, new: true }, // options
          function (err, doc) {
            // callback
            if (err) {
              // handle error
            } else {
              user = {
                ...user._doc,
                major: {
                  major: doc.major ? doc.major : '',
                  user_id: doc.user_id,
                },
                //TODO: replace with real data
                ...schoolYearVsClasses,
              };
            }
          }
        ).clone();
      }
    }

    if (user) {
      res.status(200).json({
        success: true,
        //TODO: replace with real data
        user: {
          ...user,
          ...schoolYearVsClasses,
        },
      });
    } else {
      return next(new ErrorHandler('Invalid ID', 400));
    }
  } else {
    return next(new ErrorHandler('ID is empty', 400));
  }
});

export { allUser, userProfileById };
