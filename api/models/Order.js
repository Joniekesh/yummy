import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        image: {
          type: String,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    paymentIntent: {
      type: String,
      unique: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "delivered", "canceled"],
      default: "pending",
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
