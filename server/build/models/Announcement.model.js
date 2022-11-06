"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AnnouncementSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    publication_date: {
        type: Date,
        required: true,
    },
    expiration_date: {
        type: Date,
        required: true,
    },
    permalink: {
        type: String,
        required: true,
        unique: true,
    },
    publish: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Announcement = (0, mongoose_1.model)('announcements', AnnouncementSchema);
exports.default = Announcement;
