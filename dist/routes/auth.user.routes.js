"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.AuthController.signup);
router.post("/login", auth_controller_1.AuthController.login);
router.get("/org/verify", auth_controller_1.AuthController.verifyOrg);
// Forgot --> verify otp --> resend otp --> reset password
router.post("/forgot-password", auth_controller_1.AuthController.forgotPassword);
router.post("/verify-otp", auth_controller_1.AuthController.verifyOtp);
router.post("/resend-otp", auth_controller_1.AuthController.resendOtp);
router.post("/reset-password", auth_controller_1.AuthController.resetPassword);
// Google OAuth Login
router.post("/google-login", auth_controller_1.AuthController.googleLoginController);
module.exports = router;
