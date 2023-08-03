const express = require("express");
const router = express.Router();
const batchController = require('../../controllers/batch')
const { tokenVerify } = require("../../utils/jwttoken");
const {tryCatch} = require("../../utils/tryCatch");
// const { validateSchema } = require("../../helpers/validate");
// const validatorSchema = require("../../helpers/validatorSchema");











// BatchesRouter

router.route('/batches')
     /**
     * Add a batch and also admin or staff can view all batches:
     * POST /batches
     * GET / batches
     * Requires token verification
     * body: {title,course} while creating
     */
        .post(tokenVerify, tryCatch(batchController.Create))
        .get(tokenVerify, tryCatch(batchController.get))
router.route('/batches/:id')
    /**
      * SuperAdmin or staff can edit , delete,add students to a batch,delete students from a batch and also view specific batch:
      * PUT /batches/:id
      * GET /batches/:id
      * DELETE /batches/:id
      * PATCH /batches/:id
      * POST /batches/:id
      * Requires token verification
      * body: {title, course} while editing
      * body:{students} while adding students to a batch and deleting also
     */

        .put(tokenVerify, tryCatch(batchController.update))
        .delete(tokenVerify, tryCatch(batchController.delete))
        .get(tokenVerify, tryCatch(batchController.getOne))
        .post(tokenVerify, tryCatch(batchController.addStudenttoBatch))
        .patch(tokenVerify, tryCatch(batchController.deleteStudentFromBatch))

// Batches end-------------------



module.exports = router;