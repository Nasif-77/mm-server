const { Assignment } = require('../models/assignment')


module.exports = {

    createAssignment: async (req, res) => {
        if (req.files?.assignment) {
            // Single image upload
            const { filename } = req.files['assignment'][0];
            req.body.fileName = filename;
        }

        const assignment = new Assignment(req.body)
        const a = await assignment.save()
        console.log(a)
        res.status(201).json({ message: 'Created a assignment successfully' })

    },




    getAssignments: async (req, res) => {
        const assignments = await Assignment.find({ isDeleted: false }).populate('createdBy', 'name')
        res.status(200).json({
            status: "success",
            message: "All Staffs Fetched Successfully",
            data: assignments,
        });
    },



    getOneAssignment: async (req, res) => {

        const id = req.params.id
        const assignment = await Assignment.findById(id).populate('createdBy', 'name')

        if (!assignment) {
            return res.status(404).json({
                status: "failure",
                message: "assignment not found",
                error_message: "Field validation error:assignment not found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Succesfully fetched single assignment",
            data: assignment
        })

    },


    updateAssignments: async (req, res) => {
        if (req.files?.assignment) {
            // Single image upload
            const { filename } = req.files['assignment'][0];
            req.body.fileName = filename;
        }
        console.log(req.body)

        const assignment = await Assignment.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })

        console.log(assignment)

        if (assignment) {
            return res.status(200).json({
                status: "success",
                message: "Assignment data Succesfully updated",
                data: assignment
            })
        }
        res.status(404).json({
            status: "failure",
            message: "assignment not found",
            error_message: "Field validation error:assignment not found"
        });
    },


    deleteAssignments: async (req, res) => {

        const assignment = await Assignment.findByIdAndUpdate(req.params.id, {
            $set: {
                isDeleted: true
            }
        })
        res.status(201).json({
            status: "success",
            message: "Assignment deleted successfully",
            data: assignment
        });

    },

    submitAssignment: async (req, res) => {
        const id = req.params.id

        if (req.files?.assignment) {
            const { filename } = req.files['assignment'][0];
            req.body.assignment = filename;
        }

        const assignment = await Assignment.findByIdAndUpdate(id, {
            $push: { "submittedStudents": { ...req.body } }
        })

        if (assignment) {
            return res.status(200).json({
                status: "success",
                message: "Assignment data Succesfully updated",
                data: assignment
            })
        }

    },

    getSubmittedStudents: async (req, res) => {
        const id = req.params.id
        const assignment = await Assignment.findById(id).populate({
            path: 'submittedStudents',
            populate: {
                path: 'studentId',
                model: 'students',
                select: 'name'
            },
        }).select('submittedStudents')


        if (!assignment) {
            return res.status(404).json({
                status: "failure",
                message: "assignment not found",
                error_message: "Field validation error:assignment not found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Succesfully fetched submitted students",
            data: assignment
        })
    },


    gradeAndFeedback: async (req, res) => {
        const id = req.params.id
        const assignment = await Assignment.findById(id)

        const assignmentToUpdate = assignment.submittedStudents.findIndex(student => student.id === req.body.submittedId)
        assignment.submittedStudents[assignmentToUpdate].feedback = req.body.feedback ? req.body.feedback : "" 
        assignment.submittedStudents[assignmentToUpdate].grade = req.body.grade ? req.body.grade : ""

        await assignment.save()

        if (!assignment) {
            return res.status(404).json({
                status: "failure",
                message: "assignment not found",
                error_message: "Field validation error:assignment not found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Succesfully fetched submitted students",
            data: assignment
        })

    }





}


