import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    authType: {
      type: String,
      enum: ["email", "google"],
      default: "email",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

export default mongoose.model("User", UserSchema);
