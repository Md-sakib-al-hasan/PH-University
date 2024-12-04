"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const CreateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.body.student;
        const result = yield student_service_1.StudentServices.createStudentIntoDB(student);
        res.status(200).json({
            success: true,
            message: 'student is created succesfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getallStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudnetFromDB();
        res
            .status(200)
            .json({
            success: true,
            message: 'this all data frome this Bd',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getSingleStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield student_service_1.StudentServices.getSingleStudnentFromDB(id);
        res
            .status(200)
            .json({ success: true, message: 'single stuendet', data: result });
    }
    catch (err) {
        console.log(err);
    }
});
exports.StudentController = {
    CreateStudent,
    getallStudents,
    getSingleStudents,
};
