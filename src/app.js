const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const logger = require('./libs/winstonLogger')
const morganMiddleware = require('./utils/morganMiddleware')

const db_url = process.env.MONGODB_URL

mongoose.connect(db_url).then(() => {
    logger.info('Connected to MongoDB')
}).catch((error) => {
    logger.error('Error connecting to MongoDB', error.message)
})


app.use(express.json())
app.use(morganMiddleware)
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const adminAndStaffs = require('./routes/admins/staffs')
app.use('/api/admin', adminAndStaffs)

const inquiries = require('./routes/admins/inquiries')
app.use('/api/admin', inquiries)

const students = require('./routes/admins/students')
app.use('/api/admin', students)

const courses = require('./routes/admins/course')
app.use('/api/admin', courses)

const fees = require('./routes/admins/fees')
app.use('/api/admin', fees)

const batch = require('./routes/admins/batch')
app.use('/api/admin', batch)

const attendance = require('./routes/admins/attendance')
app.use('/api/admin', attendance)

const assignments = require('./routes/admins/assignment')
app.use('/api/admin', assignments)

const questions = require('./routes/admins/q&a')
app.use('/api/admin', questions)

const { ErrorHandler } = require('./utils/errorHandling')
app.use(ErrorHandler)

module.exports = app