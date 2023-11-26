import { Router } from "express";

import {
  createOrder,
  receiveWebhook,
  success,
} from "../controllers/payment_controller.js";

const router = Router();

router.post("/create-order", createOrder);

router.post("/webhook", receiveWebhook);

router.get("/success", success);

export default router;
