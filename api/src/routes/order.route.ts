import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";

const router = Router();
const controller = new OrderController();

router.route("/").get(controller.getAll).post(controller.create);
router.route("/notification").post(controller.getNotification)

export default router;
