const express = require("express");
const {
  getLessons,
  getLesson,
  addLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lesson");

const Lesson = require("../models/Lesson");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("school", "teacher"), getLessons)
  .post(protect, authorize("school", "teacher"), addLesson);

router
  .route("/:id")
  .get(protect, authorize("school", "teacher"), getLesson)
  .put(protect, authorize("school", "teacher"), updateLesson)
  .delete(protect, authorize("school", "teacher"), deleteLesson);

module.exports = router;
