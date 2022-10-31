import catchAsyncError from '../middlewares/catchAsyncError';
import User from '../models/user';
import APIFeatures from '../utils/apiFeatures';
import ErrorHandler from '../utils/errorHandler';

const allUser = catchAsyncError(async (req, res) => {
  const resPerPage = 10;
  const usersCount = await User.countDocuments();
  const apiFeatures = new APIFeatures(User.find(), req.query).search().filter();

  console.log(apiFeatures.query);
  let users = await apiFeatures.query;
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
    let user = await User.findOne({ id: userId });
    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      return next(new ErrorHandler('Invalid ID', 400));
    }
  } else {
    return next(new ErrorHandler('ID is empty', 400));
  }
});

export { allUser, userProfileById };
