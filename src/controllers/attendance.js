const jwt = require('jsonwebtoken')
const studentModel = require('../models/students')
const staffModel = require('../models/staffs')
const AppError = require('../utils/AppError')
const logger = require('../libs/winstonLogger')
const dayjs = require('dayjs')

module.exports = {
    addStudentAttendance: async (req, res) => {
        const { studentsToUpdate, date } = req.body
        /* studentsToUpdate = [{_id: String, status: Number, updateAttendance: Boolean}] */

        /* Check if attendance already exist for any student which is not being updated */
        for (const data of studentsToUpdate) {
            const student = await studentModel.findOne({ _id: data._id }).select('attendance')
            
            const isAttendanceExist = student.attendance.find((attendance) => {
                return dayjs(attendance.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
            })

            if (isAttendanceExist && !data.updateAttendance) {
                throw new AppError('Attendance Already Exist', 'Attendance Already Exist', 400)
            }
        }

        /* After validation creating a map method to bulk update */
        const bulkWriteOperations = studentsToUpdate.map((student) => {
            if (student.updateAttendance) {
                // Update existing attendance object
                return {
                    updateOne: {
                        filter: { _id: student._id, 'attendance.date': dayjs(date).format('YYYY-MM-DD') },
                        update: { $set: { 'attendance.$.status': student.status, 'attendance.$.checkIn': student.checkIn, 'attendance.$.checkOut': student.checkOut } },
                    },
                };
            } else {
                // Add new attendance object
                return {
                    updateOne: {
                        filter: { _id: student._id },
                        update: { $addToSet: { attendance: { date: dayjs(date).format('YYYY-MM-DD'), status: student.status, checkIn: student.checkIn, checkOut: student.checkOut } } },
                    },
                };
            }
        });

        studentModel.bulkWrite(bulkWriteOperations)
            .then(() => {
                res.json({ status: 'success', message: 'Attendance updated/added successfully for all students.' })
            })
            .catch((error) => {
                res.json({ status: 'failure', message: 'Error occurred while updating/adding attendance:' })
            });
    },

    addStaffAttendance: async (req, res) => {
        const { staffsToUpdate, date } = req.body
        /* saffToUpdate = [{_id: String, status: Number, updateAttendance: Boolean}] */
        
        /* Check if attendance already exist for any staff which is not being updated */
        for (const data of staffsToUpdate) {
            const staff = await staffModel.findOne({ _id: data._id }).select('attendance')
           
            const isAttendanceExist = staff.attendance.find((attendance) => {
                return dayjs(attendance.date).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
            })

            if (isAttendanceExist && !data.updateAttendance) {
                throw new AppError('Attendance Already Exist', 'Attendance Already Exist', 400)
            }
        }

        /* After validation creating a map method to bulk update */
        const bulkWriteOperations = staffsToUpdate.map((staff) => {
            if (staff.updateAttendance) {
                // Update existing attendance object
                return {
                    updateOne: {
                        filter: { _id: staff._id, 'attendance.date': dayjs(date).format('YYYY-MM-DD') },
                        update: { $set: { 'attendance.$.status': staff.status, 'attendance.$.checkIn': staff.checkIn, 'attendance.$.checkOut': staff.checkOut } },
                    },
                };
            } else {
                // Add new attendance object
                return {
                    updateOne: {
                        filter: { _id: staff._id },
                        update: { $addToSet: { attendance: { date: dayjs(date).format('YYYY-MM-DD'), status: staff.status, checkIn: staff.checkIn, checkOut: staff.checkOut } } },
                    },
                };
            }
        });

        staffModel.bulkWrite(bulkWriteOperations)
            .then(() => {
                res.json({ status: 'success', message: 'Attendance updated/added successfully for all staffs.' })
            })
            .catch((error) => {
                res.json({ status: 'failure', message: 'Error occurred while updating/adding attendance:' })
            });
    },

    getStudentAttendance: async (req, res) => {
        const studentId = req.params.id
        const studentDetails = await studentModel.findOne({ _id: studentId }).select(['_id', 'name', 'batch', 'attendance'])

        if (!studentDetails) {
            throw new AppError('Student Not Found', 'Student Not Found', 404)
        }

        res.status(200).json({ status: 'success', message: 'Successfully fetched the student attendance', data: studentDetails })
    },

    getAllStudentAttendance: async (req, res) => {
        const query = req.query
        const studentDetails = await studentModel.find({ isDeleted: false, ...query }).select(['_id', 'name', 'batch', 'attendance', 'mentor'])

        if (!studentDetails) {
            throw new AppError('No Students', 'No Students in the DB', 404)
        }

        res.status(200).json({ status: 'success', message: 'Successfully fetched the students attendance', data: studentDetails })
    },

    getAllStaffAttendance: async (req, res) => {
        const query = req.query
     
        const staffDetails = await staffModel.find({ isDeleted: false, ...query }).select(['_id', 'attendance', 'name'])
        
        if (!staffDetails) {
            throw new AppError('No Students', 'No Students in the DB', 404)
        }

        res.status(200).json({ status: 'success', message: 'Successfully fetched the staffs attendance', data: staffDetails })
    }
}
