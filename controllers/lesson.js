const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Lesson");
const Lesson = require("../models/Lesson");
const User = require("../models/User");
const Curriculum = require("../models/Curriculum");

// @desc      Get Lessons
// @route     GET /api/v1/lesson
// @route     GET /api/v1/lesson
// @access    Private
exports.getLessons = asyncHandler(async (req, res, next) => {
  const lessons = await Lesson.find({ user: req.user.id }).sort("-createdAt");

  res.status(200).json({
    success: true,
    data: lessons,
  });
});

// @desc      Get single lesson
// @route     GET /api/v1/lesson/:id
// @access    Public
exports.getLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`No lesson with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

// @desc      Add lesson
// @route     POST /api/v1/lesson
// @access    Private
exports.addLesson = asyncHandler(async (req, res, next) => {
  req.body.curriculum = req.params.curriculumId;
  req.body.user = req.user.id;

  const lesson = await Lesson.create(req.body);
  res.status(200).json({
    success: true,
    data: lesson,
  });
});

// @desc      Update Lesson
// @route     PUT /api/v1/lesson/:id
// @access    Private
exports.updateLesson = asyncHandler(async (req, res, next) => {
  let lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`No lesson with the id of ${req.params.id}`, 404)
    );
  }

  lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  lesson.save();

  res.status(200).json({
    success: true,
    data: lesson,
  });
});

// @desc      Delete lesson
// @route     DELETE /api/v1/lesson/:id
// @access    Private
exports.deleteLesson = asyncHandler(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(
      new ErrorResponse(`No Lesson with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is course owner
  if (lesson.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete course ${lesson._id}`,
        401
      )
    );
  }

  await lesson.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
