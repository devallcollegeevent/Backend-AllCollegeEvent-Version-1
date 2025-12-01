"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = async (pwd) => {
    return await bcrypt.hash(pwd, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = async (pwd, hashed) => {
    return await bcrypt.compare(pwd, hashed);
};
exports.comparePassword = comparePassword;
