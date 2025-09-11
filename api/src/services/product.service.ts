import prisma from "../configs/prisma.config.js";

export class ProductService {
  async getAll() {
    return prisma.product.findMany({ include: { Orders: true } });
  }
}

