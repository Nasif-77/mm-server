const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admins');
const { tokenVerify } = require('../../utils/jwttoken');
const { tryCatch } = require('../../utils/tryCatch');
const { upload } = require('../../helpers/multer');


router.route('/login')
    /**
      * Admin and Staff login:
      * POST /login
      * body: email, password
     */
    .post(tryCatch(adminController.adminLogin));

router.route('/staffs')
    /**
         * SuperAdmin can create staff and view all the staffs :
         * POST /staff
         * GET /staff
         * Requires token verification
         * body: {email, password , name , role , permissions} while creating
        */
    .post(tokenVerify, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 5 }]), tryCatch(adminController.registerAStaff))
    .get(tokenVerify, tryCatch(adminController.getAllStaffs));

router.route('/staffs/:id')
    /**
      * Admin can delete, edit and also view the specific data of staff:
      * Put /staff/:id
      * DELETE /staff/:id
      * GET /staff/:id
      * Requires token verification
      * body: {email, password , name , role , permissions} while editing
     */
    .get(tokenVerify, tryCatch(adminController.getAStaff))
    .put(tokenVerify, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'document', maxCount: 5 }]), tryCatch(adminController.updateAStaff))
    .patch(tokenVerify, tryCatch(adminController.deleteDocument))
    .delete(tokenVerify, tryCatch(adminController.deleteAStaff))



module.exports = router;