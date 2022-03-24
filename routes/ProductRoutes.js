const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productCtrl = require("../controllers/product.controller")
const auth = require("../middlewares/authjwt.js")




router.post('/product',[auth.verifyToken, auth.isAdmin], productCtrl.createProduct)
router.get('/category/:id', productCtrl.getAllCategory)
router.delete('/product/:id',[auth.verifyToken, auth.isAdmin], productCtrl.deleteProductById)
router.put('/product/:id',[auth.verifyToken, auth.isAdmin], productCtrl.updateProductByID)
router.get("/product", productCtrl.getAllProduct)
router.get("/product/:id", productCtrl.getProductById)


module.exports = router;
