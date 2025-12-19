import { Request, Response } from "express";
import AdminService from "../../services/admin/admin.auth.service";
import { ADMIN_AUTH_MESSAGES } from "../../constants/admin.auth.message";

export default class AdminAuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await AdminService.login(email, password);

      return res.status(200).json({
        status: true,
        message: ADMIN_AUTH_MESSAGES.LOGIN_SUCCESS,
        data: result,
      });
    } catch (err: any) {

      // SAFE (business) errors
      const safeErrors = [
        ADMIN_AUTH_MESSAGES.ADMIN_NOT_FOUND,
        ADMIN_AUTH_MESSAGES.ACCOUNT_DELETED,
        ADMIN_AUTH_MESSAGES.ACCOUNT_INACTIVE,
        ADMIN_AUTH_MESSAGES.NOT_AN_ADMIN,
        ADMIN_AUTH_MESSAGES.INVALID_CREDENTIALS,
      ];

      // Business errors → controlled response
      if (safeErrors.includes(err.message)) {
        return res.status(200).json({
          status: false,
          message: err.message,
        });
      }

      // System / unknown errors → 500
      return res.status(500).json({
        status: false,
        message: ADMIN_AUTH_MESSAGES.INTERNAL_SERVER_ERROR,
        error: err.message,
      });
    }
  }
}
