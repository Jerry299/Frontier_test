"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
// import Routes
const Applications_1 = __importDefault(require("./routes/Applications"));
// adding express body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//cors
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
//endpoints
app.use("/users", Applications_1.default);
app.use("/forms/frontier", Applications_1.default);
// we would be exporting this component to make testing easier.
exports.default = app;
