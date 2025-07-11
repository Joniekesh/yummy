import express from "express";
import { verifyToken, admin } from "../middlewares/auth.js";
import {
  addUser,
  deleteUser,
  getDashboard,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", verifyToken, admin, getUsers);
router.get("/find/:id", verifyToken, admin, getUser);
router.get("/dashboard", verifyToken, admin, getDashboard);
router.post("/", verifyToken, admin, addUser);
router.put("/:id", verifyToken, admin, updateUser);
router.delete("/:id", verifyToken, admin, deleteUser);

export default router;
