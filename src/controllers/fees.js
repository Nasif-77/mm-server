const { error } = require('winston')
const feesModel = require('../models/fees')
const StudentModel = require('../models/students')



module.exports = {

    //Fees structure

    createFee: async (req, res) => {
            const fees = new feesModel(req.body)
            if (fees) {
                await fees.save()
              return res.status(201).json({
                    status: "success",
                    message: "Successfully created a fees structure",
                    data:fees
                })
            }
                res.status(400).json({
                    status: "failure",
                    message: "Failed to create the fees. Please try again.",
                    error_message: "An error occurred while processing the request for creating a fees"
                })
    },


    getAllFees: async (req, res) => {
            const fees = await feesModel.find()
            if (fees) {
              return res.status(200).json({
                    status: "success",
                    message: "Successfully fetched all the fees structures",
                    data: fees 
                })
            }
                res.status(404).json({
                    status: "failure",
                    message:"No any fees detail",
                    error_message:"Field validation error:No any fees detail"
                })
    },


    updateAnFees: async (req, res) => {
            const id = req.params.id
            const fees = await feesModel.findByIdAndUpdate(id, {
                $set: req.body
            }, { new: true })
            if (!fees) {
           return res.status(400).json({
                    status: "failure",
                    message:"fees not found",
                    error_message:"Field validation error:fees not found"

                })
            } 
                res.status(201).json({
                    status: "success",
                    message: "Succesfully Updated the fees details",
                    data:fees
                })
    },

    deleteAFees: async (req, res) => {
            const id = req.params.id
            if (!id) 
            return res.status(400).json({
                status:"failure",
                message:"fees not found",
                error_message:"Field validation error:Id not found"
            })
            const fees = await feesModel.findByIdAndUpdate(id, {
                $set: {
                    isDelete: true
                }
            })
            if (!fees) {
            return res.status(404).json({
                    status: "failure",
                    message:"fees not found",
                    error_message:"Field validation error:fees not found"
                })
            }
                res.status(201).json({
                    status: "success",
                    message: "Successfully deleted the fees",
                    data:fees
                })
    },




    //Student fees handling
    //---------------------

    addFeeStructureToStudent: async (req, res) => {
            const id = req.params.id
            const student = await StudentModel.findByIdAndUpdate(id, {
                $set: {
                    fees: req.body.fees
                }
            })
            if (student) {
              return res.status(201).json({
                    status: "success",
                    message: "Successfully added the fee structure to the student",
                    data: student
                })
            }
            res.status(404).json({
                status: "failure",
                message:"Student not found",
                error_message:"Field validation error:student not found"
            })
    },


    feesPayment: async (req, res) => {
            const id = req.params.id
            const student = await StudentModel.findById(id)
            if (student) {
                const feeStructure = student.fees.find(fees => fees.feesName === req.body.feesName)

                const date = new Date(req.body.paymentDate)
                const timezoneOffset = date.getTimezoneOffset(); // Get the time zone offset in minutes
                date.setMinutes(date.getMinutes() - timezoneOffset); // Adjust the date by subtracting the offset
                const isoString = date.toISOString()

                feeStructure.feesHistory.push({ amount: req.body.amount, paymentDate: isoString })
                await student.save()
              return res.status(201).json({
                    status: "success",
                    message: "Successfully created a fees payment history",
                    data:feeStructure
                })
            }    
                res.status(404).json({
                    status: "failure",
                    message:"Student not found",
                    error_message:"Field validation error:Student not found"
                })
    },


    getAllStudentFeesCollection: async (req, res) => {
            const studentFeesCollection = await StudentModel.find({ isDeleted: false }).select({ 'name': 1, 'fees': 1 }).sort({ 'name': 1 })
            if (studentFeesCollection) {
                res.status(200).json({
                    status: "success",
                    message: "Successfully fetched all student fees collections",
                    data: studentFeesCollection
                })
            }
             return  res.status(404).json({
                    status: "failure",
                    message:"No any fees collections",
                    error_message:"Field validation error:No any fees collections"
                })
    },



    updateFeesPaymentHistory: async (req, res) => {
            const id = req.params.id
            const student = await StudentModel.findById(id)
            const feeStructure = student.fees.find(fees => fees.feesName === req.body.feesName)
            if (feeStructure !== undefined) {
                const feeHistory = feeStructure.feesHistory.find(fees => fees.id === req.body.feesId)
                if (feeHistory) {

                    const date = new Date(req.body.paymentDate)
                    const timezoneOffset = date.getTimezoneOffset(); // Get the time zone offset in minutes
                    date.setMinutes(date.getMinutes() - timezoneOffset); // Adjust the date by subtracting the offset
                    const isoString = date.toISOString()

                    feeHistory.amount = req.body.amount
                    feeHistory.paymentDate = isoString
                    await student.save()
                  return  res.status(201).json({
                        status: "success",
                        message: "Successfully updated the fees payment history",
                        data: feeHistory 
                    })
                }
                    res.status(404).json({
                        status: "failure",
                        message: "No payment history found for the selected fees",
                        error_message: "Field validation error: No fee history found for the given ID"
                    })
            }
                res.status(404).json({
                    status: "failure",
                    message: "No fees structure found for the given name",
                    error_message: "Field validation error: No fees structure found for the given name"
                })
    },


    deleteFeesPaymentHistory: async (req, res) => {
            const id = req.params.id
            const student = await StudentModel.findById(id)

            const feeStructure = student.fees.find(fees => fees.feesName === req.body.feesName)
            if (feeStructure !== undefined) {
                const newFeeHistory = feeStructure.feesHistory.filter(fees => fees.id !== req.body.feesId)
                if (newFeeHistory) {
                    feeStructure.feesHistory = newFeeHistory
                    await student.save()

                 return res.status(201).json({
                        data: student,
                        status: "success",
                        message: "Successfully deleted the student fees payment history"
                    })
                }
                    res.status(404).json({
                        status: "failure",
                        message: "No payment history found for the selected fees",
                        error_message: "Field validation error: No payment history found for the selected fees"
                    })
            }
                res.status(404).json({
                    status: "failure",
                    message: "No payment history found for the selected fees",
                    error_message: "Field validation error: No fees structure found for the given name"
                })
    }


}