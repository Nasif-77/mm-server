const express = require("express");
const router = express.Router();
const assignmentController = require('../../controllers/assignment')
const { tokenVerify } = require("../../utils/jwttoken");
const { tryCatch } = require("../../utils/tryCatch");
const { upload } = require('../../helpers/multer');




router.route('/assignments')
    .post(tokenVerify, upload.fields([{ name: 'assignment', maxCount: 1 }]), tryCatch(assignmentController.createAssignment))
    .get(tokenVerify, tryCatch(assignmentController.getAssignments))

router.route('/assignments/:id')
    .put(tokenVerify, upload.fields([{ name: 'assignment', maxCount: 1 }]), tryCatch(assignmentController.updateAssignments))
    .delete(tokenVerify, tryCatch(assignmentController.deleteAssignments))
    .get(tokenVerify, tryCatch(assignmentController.getOneAssignment))
// .post(tokenVerify, tryCatch(assignmentController.addStudenttoBatch))
// .patch(tokenVerify, tryCatch(assignmentController.deleteStudentFromBatch))


router.route('/assignments/students/:id')
    .post(tokenVerify, upload.fields([{ name: 'assignment', maxCount: 1 }]), tryCatch(assignmentController.submitAssignment))
    .get(tokenVerify, tryCatch(assignmentController.getSubmittedStudents))
    .put(tokenVerify, tryCatch(assignmentController.gradeAndFeedback))

module.exports = router;
