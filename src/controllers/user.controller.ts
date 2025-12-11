import { Request, Response } from "express";
import UserService from "../services/user.service";
import { USER_MESSAGES } from "../constants/user.message";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();

      res.json({
        status: true,
        data: users,
        message: USER_MESSAGES.USERS_FETCHED,
      });
    } catch (err: any) {
      res.status(500).json({
        status: false,
        message: USER_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const identity = req.params.userId;

      const user = await UserService.getUserById(identity);

      if (!user) {
        return res.status(404).json({
          status: false,
          message: USER_MESSAGES.USER_NOT_FOUND,
        });
      }

      res.json({
        status: true,
        data: user,
        message: USER_MESSAGES.USER_FETCHED,
      });
    } catch (err: any) {
      res.status(500).json({
        status: false,
        message: USER_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const identity = req.params.userId;
      const body = req.body;

      const updated = await UserService.updateUser(identity, body);

      res.json({
        status: true,
        data: updated,
        message: USER_MESSAGES.USER_UPDATED,
      });
    } catch (err: any) {
      res.status(500).json({
        status: false,
        message: USER_MESSAGES.INTERNAL_ERROR,
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const identity = req.params.userId;

      const deletedUser = await UserService.deleteUser(identity);

      res.json({
        status: true,
        data: deletedUser,
        message: USER_MESSAGES.USER_DELETED,
      });
    } catch (err: any) {
      res.status(500).json({
        status: false,
        message: USER_MESSAGES.INTERNAL_ERROR,
      });
    }
  }
}
