"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const SECRET = "YOUR_SECRET_KEY"; // put env
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};
exports.verifyToken = verifyToken;
