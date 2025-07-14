import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    options: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
