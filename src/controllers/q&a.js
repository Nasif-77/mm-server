const { QandA } = require('../models/q&a')


module.exports = {

    createQuestion: async (req, res) => {

        if (req.files?.image) {
            // Single image upload
            const { filename } = req.files['image'][0];
            req.body.image = filename;
        }

        const question = new QandA(req.body)
        await question.save()

        return res.status(201).json({
            status: "success",
            message: "Successfully created a question",
            data: question,
        });

    },




    getQuestions: async (req, res) => {
        const questions = await QandA.find({ isDeleted: false }).populate('createdBy', 'name')
        res.status(200).json({
            status: "success",
            message: "All Questions Fetched Successfully",
            data: questions,
        });
    },



    getOneQuestion: async (req, res) => {

        const id = req.params.id
        const question = await QandA.findById(id).populate('createdBy', 'name')

        if (!question) {
            return res.status(404).json({
                status: "failure",
                message: "question not found",
                error_message: "Field validation error:question not found"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Succesfully fetched single question",
            data: question
        })

    },


    addAnswer: async (req, res) => {

        const answer = await QandA.findById(req.params.id)
        answer.answers.push(req.body)
        await answer.save()

        if (answer) {
            return res.status(200).json({
                status: "success",
                message: "Answer added updated",
                data: answer
            })
        }
        res.status(404).json({
            status: "failure",
            message: "question not found",
            error_message: "Field validation error:question not found"
        });
    },


    getAnswers: async (req, res) => {

        const answer = await QandA.findById(req.params.id).populate({
            path: 'answers',
            populate: {
                path: 'staffId',
                model: 'staffs',
                select: 'name'
            },
        }).select('answers')

        res.status(201).json({
            status: "success",
            message: "Assignment deleted successfully",
            data: answer
        });

    },

    deleteQuestion: async (req, res) => {
        const id = req.params.id

        const question = await QandA.findByIdAndUpdate(id, {
            $set: {
                isDeleted: true
            }
        })

        if (question) {
            return res.status(200).json({
                status: "success",
                message: "Question deleted Succesfully",
                data: question
            })
        }

    },

    // getSubmittedStudents: async (req, res) => {
    //     const id = req.params.id
    //     const assignment = await Assignment.findById(id).populate({
    //         path: 'submittedStudents',
    //         populate: {
    //             path: 'studentId',
    //             model: 'students',
    //             select: 'name'
    //         },
    //     }).select('submittedStudents')


    //     if (!assignment) {
    //         return res.status(404).json({
    //             status: "failure",
    //             message: "assignment not found",
    //             error_message: "Field validation error:assignment not found"
    //         })
    //     }
    //     res.status(200).json({
    //         status: "success",
    //         message: "Succesfully fetched submitted students",
    //         data: assignment
    //     })
    // },


    // gradeAndFeedback: async (req, res) => {
    //     const id = req.params.id
    //     const assignment = await Assignment.findById(id)

    //     const assignmentToUpdate = assignment.submittedStudents.findIndex(student => student.id === req.body.submittedId)
    //     assignment.submittedStudents[assignmentToUpdate].feedback = req.body.feedback ? req.body.feedback : ""
    //     assignment.submittedStudents[assignmentToUpdate].grade = req.body.grade ? req.body.grade : ""

    //     await assignment.save()

    //     if (!assignment) {
    //         return res.status(404).json({
    //             status: "failure",
    //             message: "assignment not found",
    //             error_message: "Field validation error:assignment not found"
    //         })
    //     }
    //     res.status(200).json({
    //         status: "success",
    //         message: "Succesfully fetched submitted students",
    //         data: assignment
    //     })

    // }





}


