const express = require('express');
const router = express.Router();
const inqueryController = require('../../controllers/inquery');
const { tokenVerify } = require('../../utils/jwttoken');
const { tryCatch } = require('../../utils/tryCatch');
// const { validateSchema } = require('../../helpers/validate');
// const validatorSchema = require('../../helpers/validatorSchema');


router.route('/inquiries')

    /**
      * SuperAdmin or staff can view all the inqueries and also they can create inqueries :
      * POST /inquery
      * GET /inquery
      * Requires token verification
      * body: {phone, address , name , email , remark,isConverttoStudent} while creating
     */
    .post(tokenVerify, tryCatch(inqueryController.addAnInquiry))
    .get(tokenVerify, tryCatch(inqueryController.getAllInquiries))

router.route('/inquiries/:id')

    /**
        * SuperAdmin or staff can edit , delete and also view specific inquery:
        * PUT /inquery/:id
        * GET /inquery/:id
        * DELETE /inquery/:id
        * Requires token verification
        * body: {phone, address , name , email , remark,isConverttoStudent} while editing
       */
    .get(tokenVerify, tryCatch(inqueryController.getAnInquiry))

    /**
        * Convert student to inquiry:
        * PATCH /inquiry/:id
        * Requires token verification
        */
    .patch(tokenVerify, tryCatch(inqueryController.convertToStudent))

    /**
     * Update an inquiry:
     * PUT /inquiry/:id
     * Requires token verification
     */
    .put(tokenVerify, tryCatch(inqueryController.updateAnInquiry))

    /**
     * Delete an inquiry:
     * DELETE /inquiry/:id
     * Requires token verification
     */

    .delete(tokenVerify, tryCatch(inqueryController.deleteAnInquiry))

router.route('/inquirie')

     /**
     * Validate the phone number:
     * POST /inquiry/:number
     * Requires token verification
     */

    .get(tokenVerify, tryCatch(inqueryController.validatePhoneNumber))

module.exports = router;