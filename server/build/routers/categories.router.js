"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const access_control_middleware_1 = require("../middlewares/access-control.middleware");
const error_validation_1 = __importDefault(require("../middlewares/error.validation"));
const categorie_validator_1 = require("../validators/categorie.validator");
const router = (0, express_1.Router)();
router.patch('/update', categorie_validator_1.updateCategorieSchema, error_validation_1.default, access_control_middleware_1.verifyToken, categories_controller_1.updateCategorie);
router.post('/create', categorie_validator_1.createCategorieSchema, error_validation_1.default, access_control_middleware_1.verifyToken, categories_controller_1.createCategorie);
router.get('/', categories_controller_1.getAllCategories);
router.get('/:id', categories_controller_1.singleCategorie);
router.delete('/:id', access_control_middleware_1.verifyToken, categories_controller_1.deleteCategorie);
exports.default = router;
