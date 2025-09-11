import prisma from "../configs/prisma.config.js";

export class UserService {
  async getAll() {
    return prisma.user.findMany({ include: { Orders: true } });
  }
}
