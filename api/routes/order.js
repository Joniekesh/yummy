import express from "express";
import { verifyToken, admin } from "../middlewares/auth.js";

import {
  confirmOrder,
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, admin, getOrders);
router.get("/find/:id", verifyToken, getOrder);
router.put("/confirm/:paymentIntent", verifyToken, confirmOrder);
router.put("/:id", verifyToken, admin, updateOrder);
router.delete("/:id", verifyToken, admin, deleteOrder);

export default router;
