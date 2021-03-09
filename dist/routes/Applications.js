"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApplicationRouter = express_1.default.Router();
const Applications_1 = __importDefault(require("../controllers/Applications"));
ApplicationRouter.post("/applications", Applications_1.default);
exports.default = ApplicationRouter;
