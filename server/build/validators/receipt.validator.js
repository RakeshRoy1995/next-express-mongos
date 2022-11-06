"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReceiptSchema = exports.createReceiptSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createReceiptSchema = [
    (0, express_validator_1.body)('rate', 'Vehicle categorie is required').isString().optional(),
    (0, express_validator_1.body)('v_number', 'Vehicle number is required').isString().optional(),
    (0, express_validator_1.body)('date', 'Vehicle date is required').isString().optional(),
    (0, express_validator_1.body)('check', 'Vehicle check is required').isString().optional(),
];
exports.updateReceiptSchema = [
    (0, express_validator_1.body)('rate', 'Vehicle categorie is required').isString().optional(),
    (0, express_validator_1.body)('v_number', 'Vehicle number is required').isString().optional(),
    (0, express_validator_1.body)('date', 'Vehicle date is required').isString().optional(),
    (0, express_validator_1.body)('check', 'Vehicle check is required').isString().optional(),
];
