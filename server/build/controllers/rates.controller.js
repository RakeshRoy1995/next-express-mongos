"use strict";
/** @format */
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
exports.getAllRates = exports.deleteRate = exports.singleRate = exports.updateRate = exports.createRate = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Rate_model_1 = __importDefault(require("../models/Rate.model"));
const error_util_1 = require("../utils/error.util");
const NAMESPACE = "Rates Controller";
// Create rate
const createRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_rate, all_rate, allday_rate, categorie } = req.body;
        const user = req.body.api_user;
        const newRate = new Rate_model_1.default({
            first_rate,
            all_rate,
            allday_rate,
            categorie,
        });
        // newRate.user = user._id;
        yield newRate.save();
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Create rate error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.createRate = createRate;
// Update Rate
const updateRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rateId, name, first_rate, all_rate, allday_rate, categorie } = req.body;
    const user = req.body.api_user;
    try {
        const rateFound = yield Rate_model_1.default.findById(rateId);
        if (!rateFound) {
            return res.status(404).json((0, error_util_1.formatError)("Rate not found"));
        }
        const to_update = {
            first_rate,
            all_rate,
            allday_rate,
            categorie,
        };
        // if (req.files) {
        //     // Get Featured Image
        // 	if (req.files.featured_image) {
        // 		const featured_image: any = req.files.featured_image;
        // 		const featureImageExtName = featured_image.name.split(".")[
        // 			featured_image.name.split(".").length - 1
        // 		];
        // 		if (!ALLOWED_IMAGE_EXTENSIONS.test(featureImageExtName)) {
        // 			return res
        // 				.status(400)
        // 				.json(
        // 					formatError(
        // 						"Only Image files are acceptable"
        // 					)
        // 				);
        // 		}
        // 		const featuredImageUrl = await uploadFileToCDN(featured_image, featured_image.name);
        // 		to_update.featured_image = featuredImageUrl;
        // 	}
        // }
        yield Rate_model_1.default.findByIdAndUpdate(rateId, to_update);
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Update rate error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.updateRate = updateRate;
// View Single Rates
const singleRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rateFound = yield Rate_model_1.default.findById(id);
        if (!rateFound) {
            return res.status(404).json((0, error_util_1.formatError)("No rate found"));
        }
        res.json(rateFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "View single rate error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.singleRate = singleRate;
// Delete Single Rates
const deleteRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rateFound = yield Rate_model_1.default.findById(id);
        if (!rateFound) {
            return res.status(404).json((0, error_util_1.formatError)("No rates found"));
        }
        yield Rate_model_1.default.findByIdAndDelete(id);
        res.json({ msg: "success" });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Delete single rate error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.deleteRate = deleteRate;
// Get All Rates
const getAllRates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const published = req.query.published;
        if (published === "true") {
            const today = new Date().toISOString();
            const rates = yield Rate_model_1.default.find({ publish: true }).sort({ date: "asc" });
            return res.json(rates);
        }
        else {
            const rates = yield Rate_model_1.default.find({}).sort({ date: "asc" });
            return res.json(rates);
        }
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "View all rates error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.getAllRates = getAllRates;
