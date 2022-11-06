"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorieSchema = exports.createCategorieSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createCategorieSchema = [
    (0, express_validator_1.body)('name', 'Categorie name is required').isString(),
    (0, express_validator_1.body)('description', 'Tag description is required').isString(),
];
exports.updateCategorieSchema = [
    (0, express_validator_1.body)('name', 'Categorie name is required').isString(),
    (0, express_validator_1.body)('description', 'Tag description is required').isString(),
];
