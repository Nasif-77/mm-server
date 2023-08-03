const mongoose = require('mongoose')

const batch = new mongoose.Schema({
    name: {
        type: String,
    },
    batchStarted:{
        type:Date
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" }
})

const batchModel = mongoose.model("batches", batch)
module.exports = batchModel