import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import mongoose from "mongoose";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.get("/api/orders/drop", async (req, res, next) => {
  try {
    await mongoose.connection.collection("orders").dropIndexes();
    res.send("Indexes dropped from orders collection");
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () =>
  console.log(`SERVER running in ${process.env.NODE_ENV} MODE on PORT ${PORT}`)
);
