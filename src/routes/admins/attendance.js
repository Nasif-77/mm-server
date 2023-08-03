const express = require("express");
const router = express.Router();
const attendance = require('../../controllers/attendance')
const {tryCatch} = require('../../utils/tryCatch')
const {tokenVerify} = require('../../utils/jwttoken')

router.route('/attendance/students')
.post(tokenVerify, tryCatch(attendance.addStudentAttendance))

router.route('/attendance/students')
.get(tokenVerify, tryCatch(attendance.getAllStudentAttendance))

router.route('/attendance/staffs')
.post(tokenVerify, tryCatch(attendance.addStaffAttendance))

router.route('/attendance/staffs')
.get(tokenVerify, tryCatch(attendance.getAllStaffAttendance))

module.exports = router