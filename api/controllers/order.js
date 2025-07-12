import createError from "../utils/createError.js";
import Order from "../models/Order.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc   create order
// @route  GET /api/orders
// @access Private
export const createOrder = async (req, res, next) => {
  try {
    const orderData = { user: req.user.id, ...req.body };

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(orderData.totalPrice) * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    orderData.paymentIntent = paymentIntent.id;

    const newOrder = new Order(orderData);
    const createdOrder = await newOrder.save();

    if (!createdOrder) {
      return next(createError(400, "Order not created. Please try again."));
    }

    return res.status(201).json({
      order: createdOrder,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   confirm order
// @route  put /api/orders/confirm/:paymentIntent
// @access Private
export const confirmOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentIntent: req.params.paymentIntent },
      { $set: { status: "preparing" } }
    );

    if (!updatedOrder) {
      return next(
        createError(400, "Error placing an order. Please try again.")
      );
    }

    return res.status(200).json("Order confirmed.Being prepared..");
  } catch (err) {
    next(err);
  }
};

// @desc   get all orders
// @route  GET /api/orders
// @access Private
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user").sort({ createdAt: -1 });

    if (orders.length < 1) {
      return next(createError(400, "Orders not found. Please try again."));
    }

    return res.status(201).json(orders);
  } catch (err) {
    next(err);
  }
};

// @desc   get my orders
// @route  GET /api/orders/me
// @access Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("user")
      .sort({ createdAt: -1 });

    if (orders.length < 1) {
      return next(createError(400, "Orders not found. Please try again."));
    }

    return res.status(201).json(orders);
  } catch (err) {
    next(err);
  }
};

// @desc   get single order
// @route  GET /api/orders/id
// @access Private
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");

    if (!order) {
      return next(createError(400, "Order not found. Please try again."));
    }

    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// @desc   update order
// @route  put /api/orders/:id
// @access Private
export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    if (!updatedOrder) {
      return next(
        createError(400, "Error updating an order. Please try again.")
      );
    }

    return res.status(200).json("Order updated.");
  } catch (err) {
    next(err);
  }
};

// @desc   delete order
// @route  delete /api/orders/:id
// @access Private
export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return next(
        createError(400, "Error deleting this order. Please try again.")
      );
    }

    return res.status(201).json("Order deleted.");
  } catch (err) {
    next(err);
  }
};
