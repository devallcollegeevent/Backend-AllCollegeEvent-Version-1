import { Request, Response } from "express";
import UserService from "../services/user.service";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json({ status: true, data: users, message:"All Users Fetched" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const identity = req.params.userId;
      const user = await UserService.getUserById(identity);

      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      res.json({ status: true, data: user, message:"User Data Fetched" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const identity = req.params.userId;
      const body = req.body;

      const updated = await UserService.updateUser(identity, body);

      res.json({ status: true, data: updated, message:"User Data Updated" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const identity = req.params.userId;

      const deletedUser = await UserService.deleteUser(identity);

      res.json({ status: true, data: deletedUser, message:"User deleted" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
}

