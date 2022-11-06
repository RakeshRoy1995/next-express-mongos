"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAnnouncements = exports.deleteAnnouncement = exports.singleAnnouncement = exports.updateAnnouncement = exports.createAnnouncement = exports.getpermalinkFromTitle = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Announcement_model_1 = __importDefault(require("../models/Announcement.model"));
const error_util_1 = require("../utils/error.util");
const NAMESPACE = 'Announcements Controller';
// Get Permalink
const getpermalinkFromTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    try {
        if (!req.body.title) {
            return res.status(400).json((0, error_util_1.formatError)('Invalid Title'));
        }
        let permalink = title.toLowerCase().trim().split(' ').join('-');
        const permalinks = yield Announcement_model_1.default.find({ permalink: new RegExp(permalink) }).select('permalink');
        if (permalinks.length > 0) {
            permalink = `${permalink}-${permalinks.length}`;
        }
        res.json({ permalink });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Permalink generation error', err);
        res.status(500).json((0, error_util_1.formatError)('Server Error'));
    }
});
exports.getpermalinkFromTitle = getpermalinkFromTitle;
// Create Announcement
const createAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, publication_date, expiration_date, permalink, publish } = req.body;
        const user = req.body.api_user;
        const newAnnouncement = new Announcement_model_1.default({ name, description, publication_date, expiration_date, permalink, publish });
        const permalinks = yield Announcement_model_1.default.find({ permalink: new RegExp(permalink) }).select('permalink');
        if (permalinks.length > 0) {
            newAnnouncement.permalink = `${newAnnouncement.permalink}-${permalinks.length}`;
        }
        newAnnouncement.user = user._id;
        yield newAnnouncement.save();
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create announcement error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.createAnnouncement = createAnnouncement;
// Update Announcement
const updateAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { announcementId, name, description, publication_date, expiration_date, permalink, publish } = req.body;
    try {
        const announcementFound = yield Announcement_model_1.default.findById(announcementId);
        if (!announcementFound) {
            return res.status(404).json((0, error_util_1.formatError)('Announcement not found'));
        }
        const to_update = {
            name,
            description,
            publication_date,
            expiration_date,
            permalink,
            publish,
        };
        yield Announcement_model_1.default.findByIdAndUpdate(announcementId, to_update);
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Update announcement error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.updateAnnouncement = updateAnnouncement;
// View Single Announcement
const singleAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const announcementFound = yield Announcement_model_1.default.findById(id);
        if (!announcementFound) {
            return res.status(404).json((0, error_util_1.formatError)('No announcements found'));
        }
        res.json(announcementFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single announcement error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.singleAnnouncement = singleAnnouncement;
// View Single Announcement
const deleteAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const announcementFound = yield Announcement_model_1.default.findById(id);
        if (!announcementFound) {
            return res.status(404).json((0, error_util_1.formatError)('No announcements found'));
        }
        yield Announcement_model_1.default.findByIdAndDelete(id);
        res.json({ msg: 'success' });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single announcement error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.deleteAnnouncement = deleteAnnouncement;
// Get All Announcements
const getAllAnnouncements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const published = req.query.published;
        if (published === 'true') {
            const announcements = (yield Announcement_model_1.default.find({ publish: true })).reverse();
            return res.json(announcements);
        }
        else {
            const announcements = (yield Announcement_model_1.default.find({})).reverse();
            return res.json(announcements);
        }
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View all announcements error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getAllAnnouncements = getAllAnnouncements;
