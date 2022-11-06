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
exports.getAllResources = exports.deleteResource = exports.singleResource = exports.updateResource = exports.createResource = exports.getpermalinkFromTitle = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Resource_model_1 = __importDefault(require("../models/Resource.model"));
const error_util_1 = require("../utils/error.util");
const upload_util_1 = require("../utils/upload.util");
const NAMESPACE = 'Resources Controller';
const ALLOWED_FILE_EXTENSIONS = /pdf|doc|docx/;
const ALLOWED_VIDEO_EXTENSIONS = /m4v|avi|mpg|mp4|webm/;
const ALLOWED_IMAGE_EXTENSIONS = /png|jpg|jpeg|webp/;
// Get Permalink
const getpermalinkFromTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    try {
        if (!req.body.title) {
            return res.status(400).json((0, error_util_1.formatError)('Invalid Title'));
        }
        let permalink = title.toLowerCase().trim().split(' ').join('-');
        const permalinks = yield Resource_model_1.default.find({ permalink: new RegExp(permalink) }).select('permalink');
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
// Create Event
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, tag, additionalTags, featured_image, videolink, permalink, publish } = req.body;
        const user = req.body.api_user;
        const newResource = new Resource_model_1.default({ name, description, tag, additionalTags: JSON.parse(additionalTags), featured_image, videolink, permalink, publish });
        const permalinks = yield Resource_model_1.default.find({ permalink: new RegExp(permalink) }).select('permalink');
        if (permalinks.length > 0) {
            newResource.permalink = `${newResource.permalink}-${permalinks.length}`;
        }
        newResource.user = user._id;
        if (req.files) {
            // Get Featured Image
            if (req.files.featured_image) {
                const featured_image = req.files.featured_image;
                const featureImageExtName = featured_image.name.split(".")[featured_image.name.split(".").length - 1];
                if (!ALLOWED_IMAGE_EXTENSIONS.test(featureImageExtName)) {
                    return res
                        .status(400)
                        .json((0, error_util_1.formatError)("Only Image files are acceptable for profile image"));
                }
                const featuredImageUrl = yield (0, upload_util_1.uploadFileToCDN)(featured_image, featured_image.name);
                newResource.featured_image = featuredImageUrl;
            }
            // Get Video File
            if (req.files.videofile) {
                const videofile = req.files.videofile;
                const videoFileExtName = videofile.name.split(".")[videofile.name.split(".").length - 1];
                if (!ALLOWED_VIDEO_EXTENSIONS.test(videoFileExtName.toLowerCase())) {
                    return res
                        .status(400)
                        .json((0, error_util_1.formatError)("Only m4v, avi, mpg, mp4 and webm files are acceptable for video file"));
                }
                const videoFileUrl = yield (0, upload_util_1.uploadFileToCDN)(videofile, videofile.name);
                newResource.videofile = videoFileUrl;
            }
            // Get Resources Files
            if (req.files.resource_files) {
                const resource_files = req.files.resource_files;
                const resourceUrls = [];
                if (Array.isArray(req.files.resource_files)) {
                    resource_files.forEach((resource_file) => __awaiter(void 0, void 0, void 0, function* () {
                        const resourceExtName = resource_file.name.split(".")[resource_file.name.split(".").length - 1];
                        if (!ALLOWED_FILE_EXTENSIONS.test(resourceExtName)) {
                            return res
                                .status(400)
                                .json((0, error_util_1.formatError)("Only pdf, doc and docx files are acceptable for resource files"));
                        }
                        const resourceUrl = yield (0, upload_util_1.uploadFileToCDN)(resource_file, resource_file.name);
                        resourceUrls.push(resourceUrl);
                    }));
                }
                else {
                    const resourceExtName = resource_files.name.split(".")[resource_files.name.split(".").length - 1];
                    if (!ALLOWED_FILE_EXTENSIONS.test(resourceExtName)) {
                        return res
                            .status(400)
                            .json((0, error_util_1.formatError)("Only pdf, doc and docx files are acceptable for resource files"));
                    }
                    const resourceUrl = yield (0, upload_util_1.uploadFileToCDN)(resource_files, resource_files.name);
                    resourceUrls.push(resourceUrl);
                }
                newResource.resource_files = resourceUrls;
            }
        }
        yield newResource.save();
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create resource error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.createResource = createResource;
// Update Event
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resourceId, name, description, tag, additionalTags, videolink, permalink, publish } = req.body;
    const user = req.body.api_user;
    try {
        const resourceFound = yield Resource_model_1.default.findById(resourceId);
        if (!resourceFound) {
            return res.status(404).json((0, error_util_1.formatError)('Resource not found'));
        }
        const to_update = {
            name,
            description,
            tag,
            additionalTags: JSON.parse(additionalTags),
            videolink,
            permalink,
            publish,
        };
        if (req.files) {
            // Get Featured Image
            if (req.files.featured_image) {
                const featured_image = req.files.featured_image;
                const featureImageExtName = featured_image.name.split(".")[featured_image.name.split(".").length - 1];
                if (!ALLOWED_IMAGE_EXTENSIONS.test(featureImageExtName)) {
                    return res
                        .status(400)
                        .json((0, error_util_1.formatError)("Only Image files are acceptable for profile image"));
                }
                const featuredImageUrl = yield (0, upload_util_1.uploadFileToCDN)(featured_image, featured_image.name);
                to_update.featured_image = featuredImageUrl;
            }
            // Get Video File
            if (req.files.videofile) {
                const videofile = req.files.videofile;
                const videoFileExtName = videofile.name.split(".")[videofile.name.split(".").length - 1];
                if (!ALLOWED_VIDEO_EXTENSIONS.test(videoFileExtName.toLowerCase())) {
                    return res
                        .status(400)
                        .json((0, error_util_1.formatError)("Only m4v, avi, mpg, mp4 and webm files are acceptable for video file"));
                }
                const videoFileUrl = yield (0, upload_util_1.uploadFileToCDN)(videofile, videofile.name);
                to_update.videofile = videoFileUrl;
            }
            // Get Resources Files
            if (req.files.resource_files) {
                const resource_files = req.files.resource_files;
                const resourceUrls = [];
                if (Array.isArray(req.files.resource_files)) {
                    resource_files.forEach((resource_file) => __awaiter(void 0, void 0, void 0, function* () {
                        const resourceExtName = resource_file.name.split(".")[resource_file.name.split(".").length - 1];
                        if (!ALLOWED_FILE_EXTENSIONS.test(resourceExtName)) {
                            return res
                                .status(400)
                                .json((0, error_util_1.formatError)("Only pdf, doc and docx files are acceptable for resource files"));
                        }
                        const resourceUrl = yield (0, upload_util_1.uploadFileToCDN)(resource_file, resource_file.name);
                        resourceUrls.push(resourceUrl);
                    }));
                }
                else {
                    const resourceExtName = resource_files.name.split(".")[resource_files.name.split(".").length - 1];
                    if (!ALLOWED_FILE_EXTENSIONS.test(resourceExtName)) {
                        return res
                            .status(400)
                            .json((0, error_util_1.formatError)("Only pdf, doc and docx files are acceptable for resource files"));
                    }
                    const resourceUrl = yield (0, upload_util_1.uploadFileToCDN)(resource_files, resource_files.name);
                    resourceUrls.push(resourceUrl);
                }
                to_update.resource_files = resourceUrls;
            }
        }
        yield Resource_model_1.default.findByIdAndUpdate(resourceId, to_update);
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Update resource error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.updateResource = updateResource;
// View Single Event
const singleResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resourceFound = yield Resource_model_1.default.findById(id);
        if (!resourceFound) {
            return res.status(404).json((0, error_util_1.formatError)('No resources found'));
        }
        res.json(resourceFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single resource error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.singleResource = singleResource;
// View Single Event
const deleteResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resourceFound = yield Resource_model_1.default.findById(id);
        if (!resourceFound) {
            return res.status(404).json((0, error_util_1.formatError)('No resources found'));
        }
        yield Resource_model_1.default.findByIdAndDelete(id);
        res.json({ msg: 'success' });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single resource error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.deleteResource = deleteResource;
// Get All Events
const getAllResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const published = req.query.published;
        if (published === 'true') {
            const today = new Date().toISOString();
            const resources = yield Resource_model_1.default.find({ publish: true }).sort({ date: 'asc' });
            return res.json(resources);
        }
        else {
            const resources = yield Resource_model_1.default.find({}).sort({ date: 'asc' });
            return res.json(resources);
        }
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View all resources error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getAllResources = getAllResources;
