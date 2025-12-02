import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

router.get("/org/verify", AuthController.verifyOrg);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/reset-password", AuthController.resetPassword);

router.post("/google-login",AuthController.googleLoginController)

module.exports = router;
