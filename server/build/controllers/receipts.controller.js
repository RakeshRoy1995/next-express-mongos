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
exports.getAllReceipts = exports.deleteReceipt = exports.singleReceipt = exports.updateReceipt = exports.createReceipt = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Receipt_model_1 = __importDefault(require("../models/Receipt.model"));
const error_util_1 = require("../utils/error.util");
const Receipt_model_2 = __importDefault(require("../models/Receipt.model"));
const NAMESPACE = "Receipts Controller";
// Create Receipt
const createReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categorie, v_number, date, check } = req.body;
        const user = req.body.api_user;
        const newReceipt = new Receipt_model_2.default({ categorie, v_number, date, check });
        newReceipt.date = new Date(date);
        // newReceipt.user = user._id;
        yield newReceipt.save();
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Create receipt error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.createReceipt = createReceipt;
// Update Receipt
const updateReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiptId, categorie, v_number, date, check } = req.body;
    try {
        const receiptFound = yield Receipt_model_2.default.findById(receiptId);
        if (!receiptFound) {
            return res.status(404).json((0, error_util_1.formatError)("Receipt not found"));
        }
        const to_update = {
            categorie,
            v_number,
            date,
            check,
        };
        yield Receipt_model_2.default.findByIdAndUpdate(receiptId, to_update);
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Update receipt error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.updateReceipt = updateReceipt;
// View Single Receipt
const singleReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const receiptFound = yield Receipt_model_2.default.findById(id);
        if (!receiptFound) {
            return res.status(404).json((0, error_util_1.formatError)("No receipts found"));
        }
        res.json(receiptFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "View single event error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.singleReceipt = singleReceipt;
// Delete Single Receipt
const deleteReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const receiptFound = yield Receipt_model_2.default.findById(id);
        if (!receiptFound) {
            return res.status(404).json((0, error_util_1.formatError)("No receipts found"));
        }
        yield Receipt_model_2.default.findByIdAndDelete(id);
        res.json({ msg: "success" });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Delete single event error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.deleteReceipt = deleteReceipt;
//Get All Receipt
const getAllReceipts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const published = req.query.published;
        if (published === "true") {
            const today = new Date().toISOString();
            const receipts = yield Receipt_model_2.default.find({ publish: true }).sort({
                date: "asc",
            });
            return res.json(receipts);
        }
        else {
            const receipts = yield Receipt_model_1.default.find({}).sort({ date: "asc" });
            return res.json(receipts);
        }
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "View all events error", err);
        res.status(500).json((0, error_util_1.formatError)("Server error"));
    }
});
exports.getAllReceipts = getAllReceipts;
