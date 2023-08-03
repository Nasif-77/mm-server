const mongoose = require('mongoose')

const feesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" }
})

const FeesModel = mongoose.model("Fees", feesSchema)
module.exports = FeesModel