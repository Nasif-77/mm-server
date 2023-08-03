const { error } = require("winston");
const { inqueryModel } = require("../models/inquery");
// const logger = require('../libs/winstonLogger')

module.exports = {
  addAnInquiry: async (req, res) => {

    const inquery = new inqueryModel(req.body);
    if (inquery) {
      await inquery.save();
      return res.status(201).json({
        status: "success",
        message: "Successfully created a inquiry",
        data: inquery,
      });
    }
    res.status(400).json({
      status: "failure",
      message: "Failed to create an inquery. Please try again.",
      error_message:
        "An error occurred while processing the request for creating an inquery",
    });
  },

  getAnInquiry: async (req, res) => {
    const id = req.params.id;
    const inquery = await inqueryModel.findById(id);
    if (inquery) {
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched the inquiry details",
        data: inquery,
      });
    }
    res.status(404).json({
      status: "failure",
      message: "inquery not found",
      error_message: "Field validation error:inquery not found",
    });
  },

  getAllInquiries: async (req, res) => {
    const inquiries = await inqueryModel.find({ isDeleted: false });
    if (inquiries) {
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched all the inquiries detail",
        data: inquiries,
      });
    }
    res.status(404).json({
      status: "failure",
      message: "No any inqueries",
      error_message: "Field validation error:No any inqueries",
    });
  },

  updateAnInquiry: async (req, res) => {
    const id = req.params.id;

    const updatedInquiry = await inqueryModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (updatedInquiry) {
      return res.status(200).json({
        status: "success",
        message: "Successfully updated the Inquiry detail",
        data: updatedInquiry,
      });
    }
    res.status(400).json({
      status: "failure",
      message: "inquery not found",
      error_message: "Field validation error:inquery not found",
    });
  },

  convertToStudent: async (req, res) => {
    const id = req.params.id;
    const convertedInquiry = await inqueryModel.findByIdAndUpdate(id, {
      $set: {
        isConvertToStudent: true,
      },
    });
    if (convertedInquiry) {
      return res.status(201).json({
        status: "success",
        message: "Successfully converted the Inquiry into a student",
        data: convertedInquiry,
      });
    }
    res.status(400).json({
      status: "failure",
      message: "inquery not found",
      error_message: "Field validation error:inquery not found",
    });
  },

  deleteAnInquiry: async (req, res) => {
    const id = req.params.id;

    const deletedInquiry = await inqueryModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });
    if (deletedInquiry) {
      return res.status(201).json({
        status: "success",
        message: "Successfully deleted an Inquiry",
        data: deletedInquiry,
      });
    }
    res.status(400).json({
      status: "failure",
      message: "inquery not found",
      error_message: "Field validation error:inquery not found",
    });
  },
  validatePhoneNumber: async (req, res) => {
    const phoneNumber = Number(req.query.number);
    const existingInquiry = await inqueryModel.findOne({ phone: phoneNumber });
    if (existingInquiry) {
      const user = existingInquiry.name;
      return res.status(400).json({
        status: "failure",
        message: "Phone number already exists",
        data: user,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Phone number is available",
      });
    }
    
  },
};
