"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const announcements_controller_1 = require("../controllers/announcements.controller");
const access_control_middleware_1 = require("../middlewares/access-control.middleware");
const error_validation_1 = __importDefault(require("../middlewares/error.validation"));
const announcement_validator_1 = require("../validators/announcement.validator");
const router = (0, express_1.Router)();
router.patch('/update', announcement_validator_1.updateAnnouncementSchema, error_validation_1.default, access_control_middleware_1.verifyToken, announcements_controller_1.updateAnnouncement);
router.post('/create', announcement_validator_1.createAnnouncementSchema, error_validation_1.default, access_control_middleware_1.verifyToken, announcements_controller_1.createAnnouncement);
router.post('/get-permalink', announcements_controller_1.getpermalinkFromTitle);
router.get('/', announcements_controller_1.getAllAnnouncements);
router.get('/:id', announcements_controller_1.singleAnnouncement);
router.delete('/:id', access_control_middleware_1.verifyToken, announcements_controller_1.deleteAnnouncement);
exports.default = router;
