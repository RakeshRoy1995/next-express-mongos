"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailSchema = exports.createEmailSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createEmailSchema = [
    (0, express_validator_1.body)('name', 'Email name is required').isString(),
    (0, express_validator_1.body)('subject', 'Subject is required').isString(),
    (0, express_validator_1.body)('description', 'Email description is required').isString(),
];
exports.updateEmailSchema = [
    // body('emailId', 'Email ID is required').isString(),
    (0, express_validator_1.body)('name', 'Email name is required').isString().optional(),
    (0, express_validator_1.body)('subject', 'Subject is required').isString().optional(),
    (0, express_validator_1.body)('description', 'Email description is required').isString().optional(),
];
