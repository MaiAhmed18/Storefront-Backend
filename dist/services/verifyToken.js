"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    var _a;
    try {
        var authorizationHeader = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
};
exports.default = verifyAuthToken;
