"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRateSchema = exports.createRateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createRateSchema = [
    (0, express_validator_1.body)('first_rate', 'Vehicle First Hour Rate is required').isString().optional(),
    (0, express_validator_1.body)('all_rate', 'Vehicle All Hours Rate is required').isString().optional(),
    (0, express_validator_1.body)('allday_rate', 'Vehicle 24 Hours Rate is required').isString().optional(),
    (0, express_validator_1.body)('categorie', 'Vehicle categorie is required').isString().optional(), ,
    // body('additionalCategories', 'Vehicle additional categories is required').isString().optional(),
];
exports.updateRateSchema = [
    (0, express_validator_1.body)('first_rate', 'Vehicle First Hour Rate is required').isString().optional(),
    (0, express_validator_1.body)('all_rate', 'Vehicle All Hours Rate is required').isString().optional(),
    (0, express_validator_1.body)('allday_rate', 'Vehicle 24 Hours Rate is required').isString().optional(),
    (0, express_validator_1.body)('categorie', 'Vehicle categorie is required').isString().optional(), ,
    // body('additionalCategories', 'Vehicle additional categories is required').isString().optional(),
];
