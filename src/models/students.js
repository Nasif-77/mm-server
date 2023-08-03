const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    course: {
      type: String,
    },

    batch: {
      type: String,
    },
    password: {
      type: String
    },
    guardian: {
      relationship: {
        type: String,
      },
      name: {
        type: String,

      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },

    image: {
      type: String,
    },

    document: {
      type: Array,
    },

    fees: [{
      feesName: {
        type: String
      },
      totalAmount: {
        type: Number
      },
      feesHistory: [{
        amount: {
          type: Number
        },
        paymentDate: {
          type: Date
        }
      }]
    }],

    attendance: [{
      date: Date,
      status: Number,
      checkIn: Date,
      checkOut: Date,
    }],

    mentor: {
      type: String,
    },

    grade: {
      type: String,
    },

    joiningDate: {
      type: Date,
    },

    qualification: {
      type: String,
    },

    week: {
      type: Number,
    },

    remark: {
      type: String,
    },

    status: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" } });

const studentModel = mongoose.model("students", studentSchema);

module.exports = studentModel
