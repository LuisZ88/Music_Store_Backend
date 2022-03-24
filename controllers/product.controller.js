const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const fs = require("fs");
cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const productCtrl = {
  createProduct: async (req, res) => {
    console.log(req.body)
    const {
      name,
      subCat,
      trademark,
      price,
      description,
      category,
      special,
      stock,
    } = req.body;

    if (!req.files.file || Object.keys(req.files.file).length === 0)
      return res.status(400).json({ msg: "No image selected" });
    const file = req.files.file;
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Image size is too big" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File is not a image" });
    }
    const image = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "Music Shop",
    });
    removeTmp(file.tempFilePath);
    async (err, result) => {
      if (err) throw err;
      removeTmp(file.tempFilePath);
    };

    if (!req.body) {
      return res.status(400).send({ success: false, msg: "Empty fields" });
    }
    if (!name || !subCat || !trademark || !price || !category || !description) {
      return res.status(400).send({ success: false, msg: "Empty fields2" });
    }
    if (isNaN(price)) {
      return res.status(500).send({ msg: "price is not a number" });
    }
    if (isNaN(stock)) {
      return res.status(500).send({ msg: "stock is not a number" });
    }
    let findCat = await Category.findOne({ title: category });
    if (!findCat) {
      return res
        .status(500)
        .send({ success: false, msg: "category don't exist" });
    } else {
      let newProduct = await Product.create({
        name,
        category,
        subCat,
        trademark,
        price,
        picture: {
          public_id: image.public_id,
          url: image.url,
        },
        description,
        special,
        stock,
      });
      console.log(newProduct)
      await Category.findByIdAndUpdate(
        { _id: findCat._id },
        { $push: { product_id: newProduct._id } }
      );
      res.json({ message: "Created", newProduct });
    } 
  },

  getAllCategory: async (req, res) => {
    const { id } = req.params;
    try {
      let category = await Category.findById(id).populate("product_id");
      return res.status(200).send({
        success: true,
        category,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: error.message,
      });
    }
  },
  deleteProductById: async (req, res) => {
    const { id } = req.params;
    const deleteImg = await Product.findById(id);

    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      const public_id = deletedProduct.picture.public_id;
      await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;
      });

      await Category.findOneAndUpdate(
        { title: deletedProduct.category },
        { $pull: { product_id: id } }
      );

      return res.status(200).send({
        success: true,
        msg: "Product deleted",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: error.message,
      });
    }
  },
  updateProductByID: async (req, res) => {
    const { id } = req.params;
    const { price, stock } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { price, stock },
        { new: true }
      );
      return res.status(200).send({
        succes: true,
        msg: "Product updated",
        updatedProduct,
      });
    } catch (error) {
      return res.status(500).send({
        succes: false,
        msg: error.message,
      });
    }
  },
  getAllProduct: async (req, res) => {
    try {
      let products = await Product.find();
      return res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: error.message,
      });
    }
  },
  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      let product = await Product.findById(id);
      if (product != null) {
        return res.status(200).send({
          success: true,
          product,
        });
      } else {
        return res.status(400).send({
          success: false,
          msg: "Product not found",
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: error.message,
      });
    }
  },
};

module.exports = productCtrl;
