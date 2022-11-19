import User from '../models/user';
import catchAsyncError from '../middlewares/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';

const viewMyWorkExperience = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    data: user.work_experience,
  });
});

const newWorkExperience = catchAsyncError(async (req, res, next) => {
  let user = await User.findOne({ id: req.user._id });
  if (user) {
    const data = {
      job_name: req.body.job_name,
      working_time: req.body.working_time,
      company_name: req.body.company_name,
      alumni_id: req.body.alumni_id || 0,
    };

    let workExperienceAfterSaved = null;

    user.work_experience.push(data);

    await user.save().then((user) => {
      workExperienceAfterSaved = user.work_experience;
    });
    res.status(200).json({
      success: true,
      data: workExperienceAfterSaved,
    });
  } else {
    return next(new ErrorHandler('Invalid ID', 400));
  }
});

const editWorkExperience = catchAsyncError(async (req, res, next) => {
  let userId = req.query.id;
  if (userId) {
    let user = await User.findOne({ id: req.user._id });
    if (user) {
      user.work_experience = req.body.data;

      await user.save().then((user) => {
        workExperienceAfterSaved = user.work_experience;
      });
      res.status(200).json({
        success: true,
        data: workExperienceAfterSaved,
      });
    } else {
      return next(new ErrorHandler('Invalid ID', 400));
    }
  }
});

const deleteWorkExperience = catchAsyncError(async (req, res, next) => {
  let userId = req.query.id;
  if (userId) {
    let user = await User.findOne({ id: req.user._id });
    if (user) {
      user.work_experience = req.body.data;

      await user.save().then((user) => {
        workExperienceAfterSaved = user.work_experience;
      });
      res.status(200).json({
        success: true,
        data: workExperienceAfterSaved,
      });
    } else {
      return next(new ErrorHandler('Invalid ID', 400));
    }
  }
});

// const reactionComment = catchAsyncError(async (req, res, next) => {
//   const commentModel = await Comment.findOne({ course: req.query.courseId });

//   if (!commentModel) {
//     return next(new ErrorHandler('Invalid course', 404));
//   }

//   let types = ['like', 'dislike'];

//   if (!types.includes(req.query.type)) {
//     return next(new ErrorHandler('Invalid type', 400));
//   }

//   const commentIndex = commentModel.comments.findIndex(
//     (comment) => comment._id == req.query.commentId
//   );
//   if (commentIndex === -1) {
//     return next(new ErrorHandler('Comment not found!', 400));
//   }
//   const commentAfterFilter = handleLike(
//     req.user,
//     commentModel.comments[commentIndex],
//     req.query.type
//   );

//   commentModel.comments[commentIndex] = commentAfterFilter;

//   await commentModel.save();

//   return res.status(200).json({
//     success: true,
//   });
// });

export {
  viewMyWorkExperience,
  newWorkExperience,
  editWorkExperience,
  deleteWorkExperience,
};
