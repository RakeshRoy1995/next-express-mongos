"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTagSchema = exports.createTagSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createTagSchema = [
    (0, express_validator_1.body)('name', 'Tag name is required').isString(),
    (0, express_validator_1.body)('description', 'Tag description is required').isString(),
    (0, express_validator_1.body)('slug', 'Slug is required').isString(),
];
exports.updateTagSchema = [
    (0, express_validator_1.body)('name', 'Tag name is required').isString(),
    (0, express_validator_1.body)('description', 'Tag description is required').isString(),
    (0, express_validator_1.body)('slug', 'Slug is required').isString(),
];
