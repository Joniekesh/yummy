import Category from "../models/Category.js";
import createError from "../utils/createError.js";

// @desc   create category
// @route  post /api/categories
// @access Private admin
export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ name: req.body.name });

    if (category) {
      return next(createError(400, "Category already exist."));
    }

    const catSlug = req.body.name.replace(/\s+/g, "").toLowerCase();

    const newCategory = new Category({
      user: req.user.id,
      slug: catSlug,
      ...req.body,
    });

    const createdCategory = await newCategory.save();

    if (!createdCategory) {
      return next(createError(400, "error occured creating category."));
    }

    return res.status(200).json(createdCategory);
  } catch (err) {
    next(err);
  }
};

// @desc   get categories
// @route  get /api/categories
// @access Private admin
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    if (categories.length < 1) {
      return next(createError(400, "categories not found."));
    }

    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// @desc   get category
// @route  get /api/categories/find/:id
// @access Private admin
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(createError(400, "category not found."));
    }

    return res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// @desc   update category
// @route  put /api/categories/:id
// @access Private admin
export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return next(createError(400, "error updating category."));
    }

    return res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

// @desc   delete category
// @route  delete /api/category/:id
// @access Private admin
export const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return next(createError(400, "error deleting category."));
    }

    return res.status(200).json("category deleted");
  } catch (err) {
    next(err);
  }
};
