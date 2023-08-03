const mongoose = require('mongoose')
const Schema = mongoose.Schema


const assignmentSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staffs'
    },
    createdDate: {
        type: Date,
    },
    description: {
        type: String,
        // required: true
    },
    dueDate: {
        type: Date
    },
    submittedStudents: {
        type: [{
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'students'
            },
            submittedDate: Date,
            grade: String,
            feedback: String,
            assignment: String
        }],
    },
    fileName: {
        type: String,
        // required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Assignment = mongoose.model('assignment', assignmentSchema)

module.exports = { Assignment }