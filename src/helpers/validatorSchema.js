const joi = require("joi");

module.exports = {
  // StaffSchema: joi.object({
  //   name: joi.string().required(),
  //   email: joi.string().email().required(),
  //   role: joi.string().required(),
  //   permissions: joi.array().items(joi.string()),
  //   joiningDate: joi.date(),
  //   resignationDate: joi.date(),
  //   status: joi.string(),
  //   image: joi.object(),
  //   phoneNumber: joi.string(),
  //   employmentType: joi.string(),
  //   employeeId: joi.string(),
  //   address: joi.string(),
  //   document: joi.array(),
  //   guardian: joi
  //     .object({
  //       guardianName: joi.string(),
  //       guardianRelationship: joi.string(),
  //       guardianPhone: joi.string(),
  //     })
  //     ,
  // }),

  BatchSchema: joi.object({
    title: joi.string().required(),
    course: joi.string(),
    students: joi.array().items(joi.string().min(5).max(25)),
  }),

  CourseSchema: joi.object({
    name: joi.string().required(),
    description: joi.string().min(10).max(100).required(),
  }),

  InquerySchema: joi.object({
    name: joi.string().required(),
    address: joi.string().min(10).max(100).required(),
    phone: joi
      .string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    email: joi.string().email(),
    reference: joi.string(),
    nextFollowUp: joi.date().greater("now"),
    remarks: joi.string(),
  }),

  StudentSchema: joi.object({
    name: joi.string().required(),
    address: joi.string().min(10).max(100).required(),
    phone: joi
      .string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    email: joi.string().email(),
    course: joi.string().required(),
    batch: joi.string(),
    guardian: joi
      .object({
        relationship: joi.string(),
        name: joi.string(),
        phone: joi.string().pattern(/^[0-9]{10}$/),
        email: joi.string().email(),
        image: joi
          .binary()
          .encoding("base64")
          .max(5 * 1024 * 1024),
      })
      .required(),
    fees: joi
      .object({
        feesName: joi.string(),
        totalAmount: joi.number(),
        feesHistory: joi.array().items(
          joi.object({
            amount: joi.number().required(),
            paymentDate: joi.date().iso(),
          })
        ),
      })
      .required(),
    attendance: joi
      .array()
      .items(
        joi.object({
          date: joi.date().iso(),
          status: joi.string(),
        })
      )
      .required(),
  }),

  FeesSchema: joi.object({
    title: joi.string().required(),
    type: joi.number().required(),
    amount: joi.number().required(),
  }),

  AdminSchema: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(8).required(),
  }),
};
