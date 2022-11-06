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
exports.getAllCategories = exports.deleteCategorie = exports.singleCategorie = exports.updateCategorie = exports.createCategorie = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const Categorie_model_1 = __importDefault(require("../models/Categorie.model"));
const error_util_1 = require("../utils/error.util");
const NAMESPACE = 'Categories Controller';
// Create Categories
const createCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const user = req.body.api_user;
        const newCategorie = new Categorie_model_1.default({ name, description });
        newCategorie.user = user._id;
        yield newCategorie.save();
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Create categorie error', err);
        res.status(500).json((0, error_util_1.formatError)(err));
    }
});
exports.createCategorie = createCategorie;
// Update Categories
const updateCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categorieId, name, description } = req.body;
    try {
        const categorieFound = yield Categorie_model_1.default.findById(categorieId);
        if (!categorieFound) {
            return res.status(404).json((0, error_util_1.formatError)('Categorie not found'));
        }
        const to_update = {
            name,
            description
        };
        yield Categorie_model_1.default.findByIdAndUpdate(categorieId, to_update);
        res.json({ success: true });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'Update categorie error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.updateCategorie = updateCategorie;
// View Single Categories
const singleCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categorieFound = yield Categorie_model_1.default.findById(id);
        if (!categorieFound) {
            return res.status(404).json((0, error_util_1.formatError)('No categories found'));
        }
        res.json(categorieFound);
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.singleCategorie = singleCategorie;
// View Single Categories
const deleteCategorie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categorieFound = yield Categorie_model_1.default.findById(id);
        if (!categorieFound) {
            return res.status(404).json((0, error_util_1.formatError)('No categories found'));
        }
        yield Categorie_model_1.default.findByIdAndDelete(id);
        res.json({ msg: 'success' });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View single categorie error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.deleteCategorie = deleteCategorie;
// Get All Categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const published = req.query.published;
        if (published === 'true') {
            const today = new Date().toISOString();
            const categories = yield Categorie_model_1.default.find({ publish: true }).sort({ date: 'asc' });
            return res.json(categories);
        }
        else {
            const categories = yield Categorie_model_1.default.find({}).sort({ date: 'asc' });
            return res.json(categories);
        }
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, 'View all categories error', err);
        res.status(500).json((0, error_util_1.formatError)('Server error'));
    }
});
exports.getAllCategories = getAllCategories;
