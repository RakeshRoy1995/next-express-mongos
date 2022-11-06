"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResourceSchema = exports.createResourceSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createResourceSchema = [
    (0, express_validator_1.body)('name', 'Resource name is required').isString(),
    (0, express_validator_1.body)('description', 'Resource description is required').isString(),
    (0, express_validator_1.body)('tag', 'Resource main tag is required').isString(),
    (0, express_validator_1.body)('additionalTags', 'Resource additional tag is required').isString().optional(),
    (0, express_validator_1.body)('permalink', 'Resource permalink is required').isString(),
    (0, express_validator_1.body)('publish', 'Resource publishing decision is required').isBoolean({ loose: true }),
];
exports.updateResourceSchema = [
    (0, express_validator_1.body)('name', 'Resource name is required').isString(),
    (0, express_validator_1.body)('description', 'Resource description is required').isString(),
    (0, express_validator_1.body)('tag', 'Resource main tag is required').isString(),
    (0, express_validator_1.body)('additionalTags', 'Resource additional tag is required').isString().optional(),
    (0, express_validator_1.body)('permalink', 'Resource permalink is required').isString(),
    (0, express_validator_1.body)('publish', 'Resource publishing decision is required').isBoolean({ loose: true }),
];
