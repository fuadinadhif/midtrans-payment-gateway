import { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

const userService = new UserService();

export class UserController {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    return res.status(200).json(users);
  }
}
