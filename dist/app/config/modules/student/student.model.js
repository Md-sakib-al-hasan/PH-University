"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastNmae: { type: String, required: true },
});
const guardianSchema = new mongoose_1.Schema({
    fathername: { type: String, require: true },
    fatherOccupation: { type: String, require: true },
    fatherContactNo: { type: String, require: true },
    mothername: { type: String, require: true },
    motherOccupation: { type: String, require: true },
    mothaerContactNo: { type: String, require: true },
});
const localGuardianSchema = new mongoose_1.Schema({
    name: String,
    occupation: String,
    contactNo: String,
    address: String,
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String },
    name: userNameSchema,
    gender: ['female', 'mael'],
    dateofBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergenceyContactNo: { type: String, required: true },
    bloogGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: { type: String, required: true },
    permanentAddres: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: { type: String },
    isActive: ['active', 'blocked'],
});
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
