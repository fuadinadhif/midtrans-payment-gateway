import { snap } from "../configs/midtrans.config.js";
import prisma from "../configs/prisma.config.js";
import { PaymentStatus } from "../generated/prisma/index.js";

export class OrderService {
  async create(data: { userId: number; productId: number; quantity: number }) {
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const order = await prisma.order.create({
      data,
      include: { User: true, Product: true },
    });

    const transaction = {
      transaction_details: {
        order_id: String(order.id),
        gross_amount: Math.round(Number(product.price) * data.quantity),
      },
      customer_details: {
        user_id: String(data.userId),
      },
    };

    const snapResponse = await snap.createTransaction(transaction);

    return {
      order,
      snapToken: snapResponse.token,
      redirectUrl: snapResponse.redirect_url,
    };
  }

  async getAll() {
    return prisma.order.findMany({ include: { User: true, Product: true } });
  }

  async getNotification(notificationJson: any) {
    const statusResponse = await (snap as any).transaction.notification(
      notificationJson
    );

    const orderId = Number(statusResponse.order_id);
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(
      `Notification received. Order ID: ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`
    );

    let newStatus: PaymentStatus = "PENDING";

    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        newStatus = "PENDING"; // waiting for admin review
      } else if (fraudStatus === "accept") {
        newStatus = "PAID";
      }
    } else if (transactionStatus === "settlement") {
      newStatus = "PAID";
    } else if (transactionStatus === "deny") {
      newStatus = "FAILED";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      newStatus = "FAILED";
    } else if (transactionStatus === "pending") {
      newStatus = "PENDING";
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: newStatus },
    });

    return { orderId, transactionStatus, fraudStatus, newStatus };
  }
}
