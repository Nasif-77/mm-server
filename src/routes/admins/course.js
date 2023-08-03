const express = require("express");
const router = express.Router();
const courseController = require("../../controllers/course");
const { tokenVerify } = require("../../utils/jwttoken");
const { tryCatch } = require("../../utils/tryCatch");
// const { validateSchema } = require("../../helpers/validate");
// const validatorSchema = require("../../helpers/validatorSchema");

router.route("/courses")
  /**
   * Add an course and also admin or staff can view all courses:
   * POST /course
   * GET / course
   * Requires token verification
   * body: {title,description} while creating
   */
  .post(tokenVerify, tryCatch(courseController.addAcourse))
  .get(tokenVerify, tryCatch(courseController.getAllCourse));

router.route("/courses/:id")

  /**
        * SuperAdmin or staff can edit , delete and also view specific courses:
        * PUT /course/:id
        * GET /course/:id
        * DELETE /course/:id
        * Requires token verification
        * body: {title, description} while editing
       */
  .get(tokenVerify, tryCatch(courseController.getAnCourse))
  .put(tokenVerify, tryCatch(courseController.updateAnCourse))
  .delete(tokenVerify, tryCatch(courseController.deleteAnCourse));

module.exports = router;
