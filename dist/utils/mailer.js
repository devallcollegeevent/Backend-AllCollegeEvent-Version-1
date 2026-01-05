"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
/**
 * Send an email using Gmail SMTP
 * - Uses Nodemailer
 * - Credentials are read from environment variables
 */
const sendEmail = async ({ to, subject, html, text, //  accept text
 }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    await transporter.verify();
    await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html,
        text, // ✅PASS TEXT
    });
};
exports.sendEmail = sendEmail;
