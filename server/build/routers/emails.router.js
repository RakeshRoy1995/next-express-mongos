"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controller_1 = require("../controllers/email.controller");
const access_control_middleware_1 = require("../middlewares/access-control.middleware");
const error_validation_1 = __importDefault(require("../middlewares/error.validation"));
const email_validator_1 = require("../validators/email.validator");
const router = (0, express_1.Router)();
router.patch('/update', email_validator_1.updateEmailSchema, error_validation_1.default, access_control_middleware_1.verifyToken, email_controller_1.updateEmail);
router.post('/create', email_validator_1.createEmailSchema, error_validation_1.default, access_control_middleware_1.verifyToken, email_controller_1.createEmail);
router.get('/', email_controller_1.getEmailList);
router.get('/:id', email_controller_1.getSingleEmail);
exports.default = router;
