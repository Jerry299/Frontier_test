"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
// hard coded port
const PORT = 3000;
index_1.default.listen(PORT, () => {
    `server is running on port ${PORT}`;
});
