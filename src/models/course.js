const mongoose = require('mongoose')

const course = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
    },
    duration:{
        type:Number
    },
    isDeleted:{
        type: Boolean,
        default:false
   }
    },{
    timestamps:{createdAt:"createdDate",updatedAt:"updatedDate"}
   })

const courseModel = mongoose.model("courses",course)
module.exports = courseModel