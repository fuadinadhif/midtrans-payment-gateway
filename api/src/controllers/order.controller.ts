import { Request, Response } from "express";
import { OrderService } from "../services/order.service.js";

const orderService = new OrderService();

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { userId, productId, quantity } = req.body;

      console.log(req.body);

      const order = await orderService.create({
        userId: +userId,
        productId: +productId,
        quantity: +quantity,
      });

      return res.status(200).json(order);
    } catch (error) {
      console.error(`Failed to create order: ${error}`);
      return res.status(500).json({ message: "Failed to create order" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const orders = await orderService.getAll();
      return res.status(200).json(orders);
    } catch (error) {
      console.error(`Failed to get all order data: ${error}`);
      return res.status(500).json({ message: "Failed to get all order data" });
    }
  }

  async getNotification(req: Request, res: Response) {
    try {
      await orderService.getNotification(req.body);
      res.status(200);
    } catch (err) {
      console.error(`Failed to update payment status: ${err}`);
      res.status(500).json({ error: "Failed to process notification" });
    }
  }
}
