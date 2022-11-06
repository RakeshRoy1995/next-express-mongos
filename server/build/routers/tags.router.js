"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tags_controller_1 = require("../controllers/tags.controller");
const access_control_middleware_1 = require("../middlewares/access-control.middleware");
const error_validation_1 = __importDefault(require("../middlewares/error.validation"));
const tag_validator_1 = require("../validators/tag.validator");
const router = (0, express_1.Router)();
router.patch('/update', tag_validator_1.updateTagSchema, error_validation_1.default, access_control_middleware_1.verifyToken, tags_controller_1.updateTag);
router.post('/create', tag_validator_1.createTagSchema, error_validation_1.default, access_control_middleware_1.verifyToken, tags_controller_1.createTag);
router.get('/', tags_controller_1.getAllTags);
router.get('/:id', tags_controller_1.singleTag);
router.delete('/:id', access_control_middleware_1.verifyToken, tags_controller_1.deleteTag);
exports.default = router;
