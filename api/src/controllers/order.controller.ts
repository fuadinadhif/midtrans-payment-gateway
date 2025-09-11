import { Request, Response } from "express";
import { OrderService } from "../services/order.service.js";

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;

    const order = await orderService.create({ userId, productId, quantity });

    return res.status(200).json(order);
  }

  async getAll(req: Request, res: Response) {
    const orders = await orderService.getAll();
    return res.status(200).json(orders);
  }
}
