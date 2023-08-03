const jwt = require("jsonwebtoken");
const staffModel = require("../models/staffs");
const studentModel = require("../models/students");
const bcrypt = require("bcrypt");
const fs = require('fs')

module.exports = {
    adminLogin: async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password)
        const EMAIL = process.env.BRIDGEON_EMAIL;
        const PASS = process.env.BRIDGEON_PASS;
        if (!email || !password) {
            return res.status(400).json({
                status: "failure",
                message: "Field is empty. Please provide a value.",
                error_message: "Field validation error: empty value",
            });
        }
        if (email === EMAIL && password === PASS) {
            const secret = process.env.SECRET_KEY;
            const token = jwt.sign({ email, role: 'Super Admin', isAdmin: true }, secret);
            return res.status(200).json({
                status: "success",
                message: "Admin successfully logined",
                data: token,
            });
        }

        const staff = await staffModel.findOne({ email: email });

        if (staff) {
            const comparePassword = await bcrypt.compare(
                password,
                staff.password
            );
            if (comparePassword) {
                const secret = process.env.SECRET_KEY;
                const token = jwt.sign({
                    name: staff.name,
                    userId: staff.id,
                    permissions: staff.permissions,
                    role: 'staffs'
                },
                    secret
                );
                return res.status(200).json({
                    status: "success",
                    message: "Staff successfully logined",
                    data: token,
                });
            }
        }

        const student = await studentModel.findOne({ email: email })

        if (student) {
            const comparePassword = await bcrypt.compare(
                password,
                student.password
            );
            if (comparePassword) {
                const secret = process.env.SECRET_KEY;
                const token = jwt.sign({
                    name: student.name,
                    userId: student.id,
                    role: 'students'
                },
                    secret
                );
                return res.status(200).json({
                    status: "success",
                    message: "Student successfully logined",
                    data: token,
                });
            }
        }
        throw new Error("Invalid Credentials");
    },

    registerAStaff: async (req, res) => {

        let hashedPassword = await bcrypt.hash(`${req.body.email}123`, 10);
        req.body.password = hashedPassword
        if (req.body.permissions) req.body.permissions = JSON.parse(req.body.permissions);
        if (req.body.guardian) {
            req.body.guardian = JSON.parse(req.body.guardian)
            const guardian = req.body.guardian
            req.body.guardian.relationship = guardian.guardianRelationship
            req.body.guardian.name = guardian.guardianName
            req.body.guardian.phone = guardian.guardianPhone
        }
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                status: "failure",
                message: "Field is empty. Please provide a value.",
                error_message: "Field validation error: empty value",
            });
        }
        // const hashPassword = await bcrypt.hash(password, 10)
        const register = new staffModel({ ...req.body });
        if (req.files?.image) {
            // Single image upload
            const { filename } = req.files['image'][0];
            register.image = filename;
        }
        // multiple images upload
        if (Array.isArray(req.files['document']) && req.files['document'].length > 0) {
            const documentFiles = req.files['document'].map((file) => ({
                filename: file.filename,
            }));
            register.document = documentFiles;
        }

        await register.save();
        res.status(201).json({
            status: "success",
            message: "Successfully New Staff Created",
            data: register,
        });
    },


    getAStaff: async (req, res) => {
        const staffId = req.params.id;
        if (!staffId) {
            return res.status(404).json({
                status: "failure",
                message: "Staff not found",
                error_message: "Field validation error:Id not found",
            });
        }
        const staff = await staffModel.findOne({ _id: staffId });
        res.status(200).json({
            status: "success",
            message: "Fetched a statff data",
            data: staff,
        });
    },

    getAllStaffs: async (req, res) => {
        const staffs = await staffModel.find({ isDeleted: false });
        res.status(200).json({
            status: "success",
            message: "All Staffs Fetched Successfully",
            data: staffs,
        });
    },

    updateAStaff: async (req, res) => {
        const staffId = req.params.id;
        const staff = await staffModel.findById(staffId)

        if (req.body.oldPass) {
            const comparePassword = await bcrypt.compare(req.body.oldPass, staff.password)
            if (comparePassword) {
                const isPasswordSame = await bcrypt.compare(req.body.password, staff.password)
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

        if (req.body.permissions) req.body.permissions = JSON.parse(req.body.permissions);
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
            req.body.document = [...documentFiles, ...staff.document]
        }
        if (!staffId) {
            return res.status(404).json({
                status: "failure",
                message: "Staff not found",
                error_message: "The staff Id is not found in the DB",
            });
        }

        const editStaff = await staffModel.updateOne(
            { _id: staffId },
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            message: "staff were updated",
            data: editStaff,
        });
    },

    deleteDocument: async (req, res) => {
        const staffId = req.params.id
        const fileToDelete = req.body.documentName

        fs.unlinkSync(`src/uploads/${fileToDelete}`)

        const staff = await staffModel.findById(staffId)
        staff.document = staff.document.filter(document => document.filename !== fileToDelete)
        const response = await staff.save()
        res.status(201).json({
            status: "success",
            message: "Document has deleted successfully",
            data: response,
        });
    },

    deleteAStaff: async (req, res) => {
        const staffId = req.params.id;

        if (!staffId) {
            return res.status(404).json({
                status: "failure",
                message: "Staff not found",
                error_message: "Staff Id not found",
            });
        }

        const staffDelete = await staffModel.findByIdAndUpdate(staffId, {
            $set: {
                isDeleted: true,
            },
        });

        res.status(201).json({
            status: "success",
            message: "Staff has deleted successfully",
            data: staffDelete,
        });
    }

};
