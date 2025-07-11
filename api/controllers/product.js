import Product from "../models/Product.js";
import createError from "../utils/createError.js";

// @desc   create Product
// @route  post /api/products
// @access Private admin
export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({ user: req.user.id, ...req.body });

    const createdProduct = await newProduct.save();

    if (!createdProduct) {
      return next(createError(400, "error occured creating product."));
    }

    return res.status(200).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

// @desc   get Products
// @route  get /api/products
// @access Private admin
export const getProducts = async (req, res, next) => {
  try {
    let products;

    const { cat } = req.query;

    if (cat) {
      products = await Product.find({ category: cat })
        .sort({ createdAt: -1 })
        .populate("category");
    } else {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .populate("category");
    }

    if (products.length < 1) {
      return next(createError(400, "products not found."));
    }

    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// @desc   get Product
// @route  get /api/products/:id
// @access Private admin
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return next(createError(400, "product not found."));
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// @desc   update Product
// @route  put /api/products/:id
// @access Private admin
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return next(createError(400, "error updating product."));
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// @desc   delete Product
// @route  delete /api/products/:id
// @access Private admin
export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return next(createError(400, "error deleting product."));
    }

    return res.status(200).json("product deleted");
  } catch (err) {
    next(err);
  }
};

// @desc   delete all Product
// @route  delete /api/products/:id
// @access Private admin
export const clearProducts = async (req, res, next) => {
  try {
    const deletedProducts = await Product.deleteMany();

    if (!deletedProducts) {
      return next(createError(400, "error deleting products."));
    }

    return res.status(200).json("products deleted");
  } catch (err) {
    next(err);
  }
};
