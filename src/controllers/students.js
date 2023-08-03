const Student = require("../models/students");
const batchModel = require("../models/batches");
const studentModel = require("../models/students");
const fs = require('fs')
const bcrypt = require("bcrypt");

module.exports = {


  addAStudent: async (req, res, next) => {
    let hashedPassword = await bcrypt.hash(`${req.body.email}123`, 10);
    req.body.password = hashedPassword
    const batch = req.body.batch
    if (req.body.guardian) {
      req.body.guardian = JSON.parse(req.body.guardian)
      const guardian = req.body.guardian
      req.body.guardian.relationship = guardian.guardianRelationship
      req.body.guardian.name = guardian.guardianName
      req.body.guardian.phone = guardian.guardianPhone
    }
    const newStudent = new studentModel({ ...req.body });
    if (req.files?.image) {
      // Single image upload
      const { filename } = req.files['image'][0];
      newStudent.image = filename;
    }
    // multiple images upload
    if (Array.isArray(req.files['document']) && req.files['document'].length > 0) {
      const documentFiles = req.files['document'].map((file) => ({
        filename: file.filename,
      }));
      newStudent.document = documentFiles;
    }
    await newStudent.save();

    if (batch) {
      const batch = await batchModel.findOne({ name: req.body.batch })
      batch.students.push(newStudent.id)
      await batch.save()
    }

    res.status(201).json({
      status: "success",
      message: "Successfully created student",
      data: newStudent,
    });
  },

  getAllStudents: async (req, res, next) => {
    const activeStudent = await Student.find({ isDeleted: false });
    if (activeStudent) {
      return res.status(200).json({
        status: "success",
        message: "Fetched all the Students data",
        data: activeStudent
      })
    }
    res.status(404).json({
      status: "failure",
      message: "No any students",
      error_message: "Field validation error:No any students"
    });
  },

  getAStudent: async (req, res, next) => {
    const studentId = req.params.id;
    const studentData = await Student.findById(studentId);
    if (studentData) {
      return res.status(200).json({
        status: "success",
        message: "Fetched a student data",
        data: studentData
      })
    }
    res.status(404).json({
      status: "failure",
      message: "student not found",
      error_message: "Field validation error:student not found"
    });
  },

  updateAStudent: async (req, res, next) => {

    const studentId = req.params.id;
    const student = await studentModel.findById(studentId)

    if (req.body.oldPass) {
      const comparePassword = await bcrypt.compare(req.body.oldPass, student.password)
      if (comparePassword) {
        const isPasswordSame = await bcrypt.compare(req.body.password, student.password)
        if (!isPasswordSame) req.body.password = await bcrypt.hash(req.body.password, 10)
        else return res.status(400).json({
          status: "failure",
          message: "New password and current password is same.",
          error_message: "Current password and new password is same",
        });

      }

      else return res.status(400).json({
        status: "failure",
        message: "Your current password is incorrect.",
        error_message: "Current password doesn't match",
      });
    }

    //Updating student array in batches if student batch is edited
    if (req.body.batch || req.body.oldBatch) {
      //if student change batch
      if (req.body.batch !== req.body.oldBatch && req.body.oldBatch !== '') {
        let batch = await batchModel.findOne({ name: req.body.oldBatch })
        batch.students = batch.students.filter(id => !id.equals(studentId))
        await batch.save()
      }
      //if student hasn't been added to any batch before
      let batch = await batchModel.findOne({ name: req.body.batch })
      if (batch) {
        if (!batch.students.includes(studentId)) batch.students.push(studentId)
        await batch.save()
      }
    }

    if (req.body.guardian) {
      req.body.guardian = JSON.parse(req.body.guardian)
      const guardian = req.body.guardian
      req.body.guardian.relationship = guardian.guardianRelationship
      req.body.guardian.name = guardian.guardianName
      req.body.guardian.phone = guardian.guardianPhone
    }

    if (req.files?.image) {
      // Single image upload
      const { filename } = req.files['image'][0];
      req.body.image = filename;
    }
    // multiple images upload
    if (Array.isArray(req.files['document']) && req.files['document'].length > 0) {

      const documentFiles = req.files['document'].map((file) => ({
        filename: file.filename,
      }));
      req.body.document = [...documentFiles, ...student.document]
    }

    const updateStudent = await Student.findByIdAndUpdate(studentId, req.body,
      { new: true }
    );

    if (updateStudent) {
      return res.status(200).json({
        status: "success",
        message: "Student data Succesfully updated",
        data: updateStudent
      })
    }
    res.status(404).json({
      status: "failure",
      message: "student not found",
      error_message: "Field validation error:student not found"
    });
  },

  deleteDocument: async (req, res) => {
    const studentId = req.params.id
    const fileToDelete = req.body.documentName

    fs.unlinkSync(`src/uploads/${fileToDelete}`)

    const student = await studentModel.findById(studentId)
    student.document = student.document.filter(document => document.filename !== fileToDelete)
    const response = await student.save()
    res.status(201).json({
      status: "success",
      message: "Document has deleted successfully",
      data: response,
    });
  },

  deleteAStudent: async (req, res, next) => {
    const studentId = req.params.id;

    //Deleting Student from the batch 
    const studentBatch = await Student.findById(studentId)
    if (studentBatch.batch) {
      const filteredBatch = await batchModel.findOne({ name: studentBatch.batch })
      filteredBatch.students = filteredBatch.students.filter(student => !student.equals(studentId))
      await filteredBatch.save()
    }

    const deleteStudent = await Student.findByIdAndUpdate(studentId, {
      batch: '',
      isDeleted: true,
    });
    if (!deleteStudent) {
      return res.status(404).json({
        status: "failure",
        message: "student not found",
        error_message: "Field validation error:student not found"
      });
    }
    res.status(201).json({
      status: "success",
      message: "Student deleted successfully",
      data: deleteStudent
    });
  }
};
