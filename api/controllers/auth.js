import User from "../models/User.js";
import createError from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @desc   Get current logged in user
// @route  GET /api/auth/me
// @access Private
export const getProfile = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user.id);

    return res.status(200).json(currentUser);
  } catch (err) {
    next(err);
  }
};

// @desc   Register User
// @route  POST /api/auth
// @access Public
export const register = async (req, res, next) => {
  const { email, password, fullName } = req.body;

  // Create the new user object with encrypted OTP data
  const newUser = new User(req.body);

  if (!email || !password || !fullName) {
    return next(createError(400, "All marked fields are required!"));
  }

  if (req.body.password.length < 8) {
    return next(
      createError(400, "Password of 8 or more characters is required!")
    );
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (user) {
      return next(
        createError(
          400,
          "A user with the entered email address already exists."
        )
      );
    }

    const savedUser = await newUser.save();

    return res.status(201).json("Account succssfully created");
  } catch (err) {
    next(err);
  }
};

// @desc   Login User
// @route  POST /api/auth/login
// @access Public
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(400, "Invalid credentials."));
    }

    const isPasswordMatch = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return next(createError(400, "Invalid Credentials."));
    }

    const { password, ...userInfo } = user.toJSON();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_JWT
    );

    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 14 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return next(createError(400, "No refresh token found."));
  }

  try {
    // Verify the refresh token
    const payload = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_JWT
    );

    const user = await User.findById(payload.id);

    if (!user) {
      return next(createError(400, "User not found."));
    }

    // Generate new access token
    const accessToken = await jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_JWT,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

// @desc   Logout
// @route  POST /api/auth/logout
// @access Private
export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: false,
    });

    res.status(200).json("Logged out successfully");
  } catch (err) {
    next(err);
  }
};

// @desc   google sign in
// @route  POST /api/auth/google
// @access Public
export const signInGoogle = async (req, res, next) => {
  const { email, fullName, googleId } = req.body;

  try {
    const user = await User.findOne({ googleId });

    if (user) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.ACCESS_TOKEN_JWT
      );

      return res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 14 * 24 * 60 * 60 * 1000,
          expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json(user);
    } else {
      const newUser = new User({
        email,
        fullName,
        googleId,
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        const token = jwt.sign(
          { id: savedUser._id, role: savedUser.role },
          process.env.ACCESS_TOKEN_JWT
        );

        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 14 * 24 * 60 * 60 * 1000,
            expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          })
          .status(200)
          .json(savedUser);
      }
    }
  } catch (err) {
    next(err);
  }
};
