const express = require("express");
const router = express.Router();
const QandAController = require('../../controllers/q&a')
const { tokenVerify } = require("../../utils/jwttoken");
const { tryCatch } = require("../../utils/tryCatch");
const { upload } = require('../../helpers/multer');




router.route('/questions')
    .post(tokenVerify, upload.fields([{ name: 'image', maxCount: 1 }]), tryCatch(QandAController.createQuestion))
    .get(tokenVerify, tryCatch(QandAController.getQuestions))

router.route('/questions/:id')
    .put(tokenVerify, tryCatch(QandAController.addAnswer))
    .get(tokenVerify, tryCatch(QandAController.getOneQuestion))
    .delete(tokenVerify, tryCatch(QandAController.deleteQuestion))
// .post(tokenVerify, tryCatch(QandAController.addStudenttoBatch))
// .patch(tokenVerify, tryCatch(QandAController.deleteStudentFromBatch))


router.route('/questions/answers/:id')
    .get(tokenVerify, tryCatch(QandAController.getAnswers))
//     .post(tokenVerify, upload.fields([{ name: 'assignment', maxCount: 1 }]), tryCatch(QandAController.submitAssignment))
//     .put(tokenVerify, tryCatch(QandAController.gradeAndFeedback))

module.exports = router;
