const mongoose = require('mongoose')
const Schema = mongoose.Schema


const QandASchema = new Schema({
    question: {
        type: String,
        // required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    },
    description: {
        type: String,
        // required: true
    },
    answers: {
        type: [{
            staffId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'staffs'
            },
            submittedDate: Date,
            answer: String,
        }],
    },
    image: {
        type: String,
        // required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const QandA = mongoose.model('questions', QandASchema)

module.exports = { QandA }