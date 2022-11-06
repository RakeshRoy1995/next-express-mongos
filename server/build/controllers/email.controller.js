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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmail = exports.getSingleEmail = exports.createEmail = exports.getEmailList = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Email_model_1 = __importDefault(require("../models/Email.model"));
const error_util_1 = require("../utils/error.util");
const NAMESPACE = 'Email Controller';
const getEmailList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = yield Email_model_1.default.find({}).select('_id name subject description');
        res.json(emails);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Error getting emails');
        return res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getEmailList = getEmailList;
// Create Event
const createEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, subject, description } = req.body;
        const user = req.body.api_user;
        const newEmail = new Email_model_1.default({ name, subject, description });
        yield newEmail.save();
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create email error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.createEmail = createEmail;
const getSingleEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const emailFound = yield Email_model_1.default.findById(id).select('_id name subject description');
        if (!emailFound) {
            return res.status(404).json((0, error_util_1.formatError)('Email not found'));
        }
        res.json(emailFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Error getting email');
        return res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getSingleEmail = getSingleEmail;
const updateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailId, name, subject, description } = req.body;
    try {
        const emailFound = yield Email_model_1.default.findById(emailId);
        if (!emailFound) {
            return res.status(404).json((0, error_util_1.formatError)('Email not found'));
        }
        const updated = yield Email_model_1.default.findByIdAndUpdate(emailId, { name, subject, description });
        res.status(200).json({ msg: 'Updated email' });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Error updating email');
        return res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.updateEmail = updateEmail;
