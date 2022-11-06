"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RateSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
    },
    // name: {
    //   type: String,
    //   required: false,
    // },
    first_rate: {
        type: String,
        required: false,
    },
    all_rate: {
        type: String,
        required: false,
    },
    allday_rate: {
        type: String,
        required: false,
    },
    categorie: {
        type: String,
        required: false,
    },
}, { timestamps: true });
const Rate = (0, mongoose_1.model)("rates", RateSchema);
exports.default = Rate;
