const express = require('express');
const router = express.Router();
const feesController = require('../../controllers/fees');
const { tokenVerify } = require('../../utils/jwttoken');
const { tryCatch } = require('../../utils/tryCatch');
const { validateSchema } = require('../../helpers/validate');
const validatorSchema = require('../../helpers/validatorSchema');


router.route('/fees')

    /**
    * Create a fees structure:
    * POST /fees
    * Requires token verification
    */
    .post(tokenVerify,validateSchema(validatorSchema.FeesSchema), tryCatch(feesController.createFee))

    /**
     * Get all fees structure:
     * GET /fees
     * Requires token verification
     */
    .get(tokenVerify, tryCatch(feesController.getAllFees))


router.route('/fees/:id')

    /**
     * Update a fees structure:
     * PUT /fees/:id
     * Requires token verification
     */
    .put(tokenVerify,validateSchema(validatorSchema.FeesSchema), tryCatch(feesController.updateAnFees))

    /**
     * Delete a fees structure  :
     * DELETE /fees/:id
     * Requires token verification
     */
    .delete(tokenVerify, tryCatch(feesController.deleteAFees))


router.route('/fees/collections')

    /**
    * Get all student fees collections:
    * GET /fees/collections
    * Requires token verification
    */
    .get(tokenVerify, tryCatch(feesController.getAllStudentFeesCollection))

router.route('/fees/student/:id')

    /**
    * Fees payment of student:
    * POST /fees/student/:id
    * Requires token verification
    */
    .post(tokenVerify, tryCatch(feesController.feesPayment))

    /**
    * Update fee payment history of student:
    * PUT /fees/student/:id
    * Requires token verification
    */
    .put(tokenVerify,validateSchema(validatorSchema.FeesSchema), tryCatch(feesController.updateFeesPaymentHistory))

    /**
    * Add fee structure to student:
    * PATCH /fees/student/:id
    * Requires token verification
    */
    .patch(tokenVerify,validateSchema(validatorSchema.FeesSchema), tryCatch(feesController.addFeeStructureToStudent))
  
    /**
    * Delete fee history of student:
    * DELETE /fees/student/:id
    * Requires token verification
    */
    .delete(tokenVerify, tryCatch(feesController.deleteFeesPaymentHistory))



module.exports = router;