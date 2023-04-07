"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, ENV = _a.ENV;
var Client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: process.env.ENV.includes('test') ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports.default = Client;
