import prisma from "../configs/prisma.config.js";

export class OrderService {
  async create(data: { userId: string; productId: string; quantity: number }) {
    return prisma.order.create({
      data,
      include: { User: true, Product: true },
    });
  }

  async getAll() {
    return prisma.order.findMany({ include: { User: true, Product: true } });
  }
}
