import express from "express";
import { verifyToken, admin } from "../middlewares/auth.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router.post("/", verifyToken, admin, createCategory);
router.get("/find/:id", getCategory);
router.get("/", getCategories);
router.put("/:id", verifyToken, admin, updateCategory);
router.delete("/:id", verifyToken, admin, deleteCategory);

export default router;
