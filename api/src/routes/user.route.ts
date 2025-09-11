import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const router = Router();
const controller = new UserController();

router.route("/").get(controller.getAll);

export default router;
