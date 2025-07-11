import express from "express";
import { verifyToken, admin } from "../middlewares/auth.js";
import {
  clearProducts,
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.post("/", verifyToken, admin, createProduct);
router.get("/find/:id", getProduct);
router.get("/", getProducts);
router.put("/:id", verifyToken, admin, updateProduct);
router.delete("/:id", verifyToken, admin, deleteProduct);
router.delete("/", verifyToken, admin, clearProducts);

export default router;
