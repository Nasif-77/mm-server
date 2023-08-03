const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/students');
const { tokenVerify } = require('../../utils/jwttoken');
const { upload } = require('../../helpers/multer');
const { tryCatch } = require('../../utils/tryCatch');



router.route('/students')

  /**
     * SuperAdmin or staff can view all the Students and also they can create students :
     * POST /students
     * GET /students
     * Requires token verification
     * body: {name, address, phone, email, course, batch detatil, guardian details, fees details, attendance} while creating
    */
  .post(tokenVerify, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 5 }]), tryCatch(studentController.addAStudent))
  .get(tokenVerify, tryCatch(studentController.getAllStudents))

router.route('/students/:id')

  /**
    * SuperAdmin or staff can edit , delete and also view specific student:
    * PUT /students/:id
    * GET /students/:id
    * DELETE /students/:id
    * Requires token verification
    * body: {name, address, phone, email, course, batch detatil, guardian details, fees details, attendance} while editing
   */
  .get(tokenVerify, tryCatch(studentController.getAStudent))
  .put(tokenVerify, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 5 }]),
  tryCatch(studentController.updateAStudent))
  .patch(tokenVerify, tryCatch(studentController.deleteDocument))
  .delete(tokenVerify, tryCatch(studentController.deleteAStudent))

module.exports = router;
