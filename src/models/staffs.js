const mongoose = require("mongoose");

const staff = new mongoose.Schema(
  {
    email: {
      type: String,
      // required: true,
    },
    password: {
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    permissions: {
      type: Array
    },
    document: {
      type: Array,
    },
    joiningDate: {
      type: Date,
    },
    resignationDate: {
      type: Date,
    },
    status: {
      type: String,
    },
    image: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },

    guardian: {
      name: {
        type: String,
      },
      relationship: {
        type: String,
      },
      phone: {
        type: Number,
      },
    },
    employmentType: {
      type: String,
    },
    employeeId: {
      type: String,
    },
    address: {
      type: String,
    },
    attendance: [{
      date: Date,
      status: Number,
      checkIn: Date,
      checkOut: Date,
    }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

const staffModel = mongoose.model("staffs", staff);
module.exports = staffModel;
