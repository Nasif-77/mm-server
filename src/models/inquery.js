const mongoose = require('mongoose')


const inquerySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        //required:true
    },

    course: {
        type: String,
        //required:true
    },

    status: {
        type: String,
        //required:true
    },

    qualification: {
        type: String,
        //required:true
    },

    branch: {
        type: String,
        //required:true
    },

    staff: {
        type: String,
        //required:true
    },

    createdOn: {
        type: Date,
        //required:true
    },

    possibility: {
        type: String,
        //required:true
    },

    phone: {
        type: Number,
        //required:true
    },

    email: {
        type: String,
        //required:true
    },
    reference: {
        type: String,
        //required:true
    },
    nextFollowUp: {
        type: Date,
        // required:true
    },

    remark: {
        type: String,
        // required:true
    },
    isConvertToStudent: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } })


const inqueryModel = mongoose.model('inqueries', inquerySchema)

module.exports = { inqueryModel }