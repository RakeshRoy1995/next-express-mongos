"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resources_controller_1 = require("../controllers/resources.controller");
const access_control_middleware_1 = require("../middlewares/access-control.middleware");
const error_validation_1 = __importDefault(require("../middlewares/error.validation"));
const resource_validator_1 = require("../validators/resource.validator");
const router = (0, express_1.Router)();
router.patch('/update', resource_validator_1.updateResourceSchema, error_validation_1.default, access_control_middleware_1.verifyToken, resources_controller_1.updateResource);
router.post('/create', resource_validator_1.createResourceSchema, error_validation_1.default, access_control_middleware_1.verifyToken, resources_controller_1.createResource);
router.post('/get-permalink', resources_controller_1.getpermalinkFromTitle);
router.get('/', resources_controller_1.getAllResources);
router.get('/:id', resources_controller_1.singleResource);
router.delete('/:id', access_control_middleware_1.verifyToken, resources_controller_1.deleteResource);
exports.default = router;
