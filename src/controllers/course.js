const { error } = require("winston");
const courseModel = require("../models/course");

module.exports = {
  addAcourse: async (req, res, next) => {
    const course = new courseModel(req.body);
    await course.save();
    res.status(201).json({
      status: "success",
      message: "Successfully created a course.",
      data: course
    });
  },

  getAllCourse: async (req, res, next) => {
    const course = await courseModel.find({ isDeleted: false });

    if (course) {
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched all the courses detail.",
        data: course,
      });
    }
    res.status(404).json({
      status: "failure",
      message: "No any courses",
      error_message: "Field validation error: No any courses"
    });
  },

  getAnCourse: async (req, res, next) => {
    const id = req.params.id;
    const course = await courseModel.findById(id);
    if (course) {
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched a data",
        data: course
      });
    }
    res.status(404).json({
      status: "failure",
      message: "course not found",
      error_message: "Field validation error:course not found"
    });
  },
  updateAnCourse: async (req, res, next) => {
    const id = req.params.id;
    const course = await courseModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (course) {
      return res.status(200).json({
        status: "success",
        message: "Successfully updated the course details.",
        data: course
      });
    }
    res.status(400).json({
      status: "failure",
      message: "Course not found",
      error_message: "Field validation error:course not found"
    });
  },

  deleteAnCourse: async (req, res, next) => {
    const id = req.params.id;
    if (!id)
      return res.status(400).json({
        status: "failure",
        message: "course not found",
        error_message: "Field validation error:Id not found"
      });
    const course = await courseModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });
    if (!course) {
      return res.status(404).json({
        status: "failure",
        message: "course not found",
        error_message: "Field validation error:course not found"
      });
    }
    res.status(201).json({
      status: "success",
      message: "Successfully deleted the course.",
      data: course
    });
  },
};
