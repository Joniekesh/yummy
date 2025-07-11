import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import createError from "../utils/createError.js";
import Order from "../models/Order.js";

// @desc   Get users
// @route  GET /api/users
// @access Private
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    if (users.length < 1) {
      return next(createError(400, "Users not found."));
    }

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// @desc   Get user
// @route  GET /api/users/:id
// @access Private
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(400, "User not found."));
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// @desc   create user
// @route  post /api/users
// @access Private
export const addUser = async (req, res, next) => {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return next(createError(400, "All marked fields are required!"));
    }

    if (password.length < 8) {
      return next(
        createError(400, "password of 8 or more characters is required!")
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return next(
        createError(400, "User with the provided email already exists.")
      );
    }

    const newUser = new User(req.body);

    const createdUser = await newUser.save();

    if (!createdUser) {
      return next(createError(400, "error creating user. please try again."));
    }

    return res.status(200).json(createdUser);
  } catch (err) {
    next(err);
  }
};

// @desc   update user
// @route  put /api/users/:id
// @access Private
export const updateUser = async (req, res, next) => {
  try {
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateduser) {
      return next(
        createError(400, "error updating this user. please try again.")
      );
    }

    return res.status(200).json(updateduser);
  } catch (err) {
    next(err);
  }
};

// @desc   delete user
// @route  delete /api/users/:id
// @access Private
export const deleteUser = async (req, res, next) => {
  try {
    const deleteduser = await User.findByIdAndDelete(req.params.id);

    if (!deleteduser) {
      return next(
        createError(400, "error deleting this user. please try again.")
      );
    }

    return res.status(200).json("user successfully deleted");
  } catch (err) {
    next(err);
  }
};

// @desc   get dashboard item counts
// @route  get /api/users/dashbord
// @access Private
export const getDashboard = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const categoriesCount = await Category.countDocuments();
    const ordersCount = await Order.countDocuments();

    const orders = await Order.find();
    const total = orders.reduce((acc, obj) => acc + obj.totalPrice, 0);

    return res.status(200).json({
      users: usersCount,
      products: productsCount,
      categories: categoriesCount,
      orders: ordersCount,
      sales: total,
    });
  } catch (err) {
    next(err);
  }
};
