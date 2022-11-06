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
exports.getAllTags = exports.deleteTag = exports.singleTag = exports.updateTag = exports.createTag = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Tag_model_1 = __importDefault(require("../models/Tag.model"));
const error_util_1 = require("../utils/error.util");
const NAMESPACE = 'Tags Controller';
// const ALLOWED_EXTENSIONS = /png|jpg|jpeg|webp/;
// Create Event
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, slug } = req.body;
        const user = req.body.api_user;
        const newTag = new Tag_model_1.default({ name, description, slug });
        newTag.user = user._id;
        yield newTag.save();
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create tag error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.createTag = createTag;
// Update Event
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagId, name, description, slug } = req.body;
    try {
        const tagFound = yield Tag_model_1.default.findById(tagId);
        if (!tagFound) {
            return res.status(404).json((0, error_util_1.formatError)('Tag not found'));
        }
        const to_update = {
            name,
            description,
            slug,
        };
        yield Tag_model_1.default.findByIdAndUpdate(tagId, to_update);
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Update tag error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.updateTag = updateTag;
// View Single Event
const singleTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tagFound = yield Tag_model_1.default.findById(id);
        if (!tagFound) {
            return res.status(404).json((0, error_util_1.formatError)('No tags found'));
        }
        res.json(tagFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single tag error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.singleTag = singleTag;
// View Single Event
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tagFound = yield Tag_model_1.default.findById(id);
        if (!tagFound) {
            return res.status(404).json((0, error_util_1.formatError)('No tags found'));
        }
        yield Tag_model_1.default.findByIdAndDelete(id);
        res.json({ msg: 'success' });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single tag error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.deleteTag = deleteTag;
// Get All Events
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const published = req.query.published;
        if (published === 'true') {
            const today = new Date().toISOString();
            const tags = yield Tag_model_1.default.find({ publish: true }).sort({ date: 'asc' });
            return res.json(tags);
        }
        else {
            const tags = yield Tag_model_1.default.find({}).sort({ date: 'asc' });
            return res.json(tags);
        }
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View all tags error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getAllTags = getAllTags;
