import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

/**
 * @route POST /api/v1/auth/signup
 * @desc  User signup (self registration)
 */
router.post("/signup", AuthController.signup);

/**
 * @route POST /api/v1/auth/login
 * @desc  User login
 */
router.post("/login", AuthController.login);

/* ----------------------- ORG VERIFICATION ----------------------- */

/**
 * @route GET /api/v1/auth/org/verify
 * @desc  Verify organization through email verification link
 */
router.get("/org/verify", AuthController.verifyOrg);

/* ----------------------- PASSWORD RESET FLOW ----------------------- */

/**
 * @route POST /api/v1/auth/forgot-password
 * @desc  Send OTP to email for password reset
 */
router.post("/forgot-password", AuthController.forgotPassword);

/**
 * @route POST /api/v1/auth/verify-otp
 * @desc  Verify OTP for password reset process
 */
router.post("/verify-otp", AuthController.verifyOtp);

/**
 * @route POST /api/v1/auth/resend-otp
 * @desc  Resend OTP to email
 */
router.post("/resend-otp", AuthController.resendOtp);

/**
 * @route POST /api/v1/auth/reset-password
 * @desc  Reset password using verified OTP
 */
router.post("/reset-password", AuthController.resetPassword);

/* ----------------------- GOOGLE OAUTH LOGIN ----------------------- */

/**
 * @route POST /api/v1/auth/google-login
 * @desc  Login with Google OAuth (ID token verification)
 */
router.post("/google-login", AuthController.googleLoginController);

export default router;
