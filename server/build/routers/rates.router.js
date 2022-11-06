"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rates_controller_1 = require("../controllers/rates.controller");
//import { verifyToken } from '../middlewares/access-control.middleware';
//import validateRequest from '../middlewares/error.validation';
//import { createRateSchema,updateRateSchema } from '../validators/rate.validator';
const router = (0, express_1.Router)();
router.post('/create', rates_controller_1.createRate);
router.patch('/update', rates_controller_1.updateRate);
router.get('/', rates_controller_1.getAllRates);
router.get('/:id', rates_controller_1.singleRate);
router.delete('/:id', rates_controller_1.deleteRate);
exports.default = router;
