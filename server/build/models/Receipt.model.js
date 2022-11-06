"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReceiptSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
    },
    categorie: {
        type: String,
        required: false,
    },
    v_number: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    check: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Receipt = (0, mongoose_1.model)("receipts", ReceiptSchema);
exports.default = Receipt;
