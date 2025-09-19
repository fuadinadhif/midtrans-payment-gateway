import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error(`Failed to get all user data: ${error}`);
      return res.status(500).json({ message: "Failed to get all user data" });
    }
  }
}
