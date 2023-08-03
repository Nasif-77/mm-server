const batchModel = require("../models/batches")
const students = require("../models/students")




module.exports= {

// creating a batch 


    Create:async(req,res)=>{
        const {name} = req.body
        if(!name){
          return res.status(400).json({
                status:"failure",
                message:"Field is empty. Please provide a value.",
                error_message:"Field validation error: empty value"
            })
        }
            const batchCreate = new batchModel(req.body)
            await batchCreate.save()
            res.status(201).json({
                status:"success",
                message:"Successfully created a batch.",
                data:batchCreate
            })
    },

    // get all batches

    get:async(req,res)=>{
            const allBatch = await batchModel.find({ isDeleted: false }).populate('students')
            if (allBatch) {
               return res.status(200).json({
                    status:"success",
                    message:"Successfully fetched all data",
                    data:allBatch
                })
            }
            res.status(404).json({
                status:"failure",
                message:"No any batches",
                error_message:"Field validation error:No any batches"
            })
    },

    // update a batch

    update:async(req,res)=>{
        const batchId = req.params.id
        const update = await batchModel.findByIdAndUpdate(batchId,{
        $set:req.body
        },{new: true})
        if (!update) {
        return res.status(400).json({
                status:"failure",
                message:"batch not found",
                error_message:"Field validation error:batch not found"
            })
        }
          res.status(200).json({
                status:"success",
                message: "Successfully updated the batch",
                data:update
             })
    },

    // delete a batch

    delete:async(req,res)=>{
        const batchId = req.params.id
        const deleteBatch = await batchModel.findByIdAndUpdate(batchId,{
            $set:{
                isDeleted:true
            }})
            if (!deleteBatch) {
            return res.status(404).json({
                    status:"failure",
                    message:"batch not found",
                    error_message:"Field validation error:batch not found"
                 })
            }
              res.status(201).json({
                    status:"success",
                    message: "Succesfully batch Deleted",
                    data:deleteBatch
                 })
    },

    // get one batch

    getOne: async(req,res)=>{
            const batchId = req.params.id
            const batch = await batchModel.findOne({_id:batchId}).populate('students')
            if (!batch) {
            return res.status(404).json({
                    status:"failure",
                    message:"batch not found",
                    error_message:"Field validation error:batch not found"
                 })
            }
              res.status(200).json({
                    status:"success",
                    message: "Succesfully fetched single batch",
                    data:batch 
                })       
    },

    // add student to a batch

    addStudenttoBatch:async(req,res)=>{
        const batchId = req.params.id
        const batch = await batchModel.findOne({_id:batchId})
        if (!batch) {
        return res.status(404).json({ 
                status:"failure",
                message:"batch not found",
                error_message:"Field validation error:batch not found"
             });
            }
        const studentName = req.body.students 
        studentName.forEach((student)=>{
        batch.students.push(student)
        })
        await batch.save()
        res.status(201).json({ 
            status:"success",
            message: "Student added to the batch successfully",
            data:batch
         });
    },


    // delete students from batch  

    deleteStudentFromBatch:async(req,res)=>{
        const batchId = req.params.id
        const batch = await batchModel.findOne({_id:batchId})
        if (!batch) {
        return  res.status(404).json({
                status:"failure",
                message:"batch not found",
                error_message:"Field validation error:batch not found"
             });
           
            }
        const studentName = req.body.students 
        studentName.forEach((studentToDelete)=>{
        batch.students = batch.students.filter(student=>{
            return student._id !== studentToDelete._id
        })
        })
  
        await batch.save()
        res.status(201).json({
            status:"success",
            message: "Successfully deleted the students from the batch",
            data:batch
         });
    }



}