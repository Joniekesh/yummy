import express from "express";
import {
  getProfile,
  login,
  logOut,
  refresh,
  register,
} from "../controllers/auth.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", verifyToken, getProfile);
router.post("/", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logOut);

export default router;
