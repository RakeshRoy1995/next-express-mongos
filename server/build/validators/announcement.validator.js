"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnnouncementSchema = exports.createAnnouncementSchema = void 0;
const express_validator_1 = require("express-validator");
exports.createAnnouncementSchema = [
    (0, express_validator_1.body)('name', 'Announcement name is required').isString(),
    (0, express_validator_1.body)('description', 'Announcement description is required').isString(),
    (0, express_validator_1.body)('publication_date', 'Announcement publication date is required').isString(),
    (0, express_validator_1.body)('expiration_date', 'Announcement expiration date is required').isString(),
    (0, express_validator_1.body)('permalink', 'Announcement permalink is required').isString(),
    (0, express_validator_1.body)('publish', 'Announcement publishing decision is required').isBoolean({ loose: true }),
];
exports.updateAnnouncementSchema = [
    (0, express_validator_1.body)('announcementId', 'Announcement ID is required').isString(),
    (0, express_validator_1.body)('name', 'Announcement name is required').isString().optional(),
    (0, express_validator_1.body)('description', 'Announcement description is required').isString().optional(),
    (0, express_validator_1.body)('publication_date', 'Announcement publication date is required').isString().optional(),
    (0, express_validator_1.body)('expiration_date', 'Announcement expiration date is required').isString().optional(),
    (0, express_validator_1.body)('permalink', 'Announcement permalink is required').isString().optional(),
    (0, express_validator_1.body)('publish', 'Announcement publishing decision is required').isBoolean({ loose: true }).optional(),
];
