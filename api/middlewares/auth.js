import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  let token = req.cookies.accessToken;

  try {
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.ACCESS_TOKEN_JWT, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid!"));

      const user = await User.findById(payload.id);

      if (!user) {
        return next(createError(404, "User not found."));
      }

      req.user = user;

      next();
    });
  } catch (err) {
    next(err);
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(createError(401, "Only an Admin is allowed to access this route."));
  }
};
